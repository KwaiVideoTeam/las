/**
 * @file
 * LAS demuxer
 */

#include <errno.h>
#include <stdlib.h>
#ifdef __ANDROID__
#include <sys/prctl.h>
#endif
#ifdef __APPLE__
#include "TargetConditionals.h"
#endif
#include "libavutil/avstring.h"
#include "libavutil/avassert.h"
#include "libavutil/intreadwrite.h"
#include "libavutil/mathematics.h"
#include "libavutil/opt.h"
#include "libavutil/dict.h"
#include "libavutil/time.h"
#include "libavformat/avformat.h"
#include "libavformat/url.h"
#include "libavformat/avio_internal.h"
#include "libavformat/id3v2.h"
#include "libavformat/flv.h"

#include "ijksdl/ijksdl_thread.h"
#include "ijksdl/ijksdl_mutex.h"
#include "cJSON.h"

#include "ijklas.h"

#define LAS_ERROR_BASE                        (-30000)
#define LAS_ERROR_MUTEX_CREATE                (-1 + LAS_ERROR_BASE)
#define LAS_ERROR_THREAD_CREATE               (-2 + LAS_ERROR_BASE)
#define LAS_ERROR_MANIFEST_JSON               (-3 + LAS_ERROR_BASE)
#define LAS_ERROR_ADAPT_CONFIG_JSON           (-4 + LAS_ERROR_BASE)
#define LAS_ERROR_INVALID_REP_INDEX           (-6 + LAS_ERROR_BASE)
#define LAS_ERROR_SOCKET_CLOSED_BY_PEER       (-11 + LAS_ERROR_BASE)
#define LAS_ERROR_GET_WHOLE_TAG               (-12 + LAS_ERROR_BASE)
#define LAS_ERROR_ABORT_BY_USER               (-14 + LAS_ERROR_BASE)
#define LAS_ERROR_ABR_HISTORY_DATA_JSON       (-15 + LAS_ERROR_BASE)
#define LAS_ERROR_COND_CREATE                 (-16 + LAS_ERROR_BASE)
#define LAS_ERROR_CODEC_CHANGE                (-17 + LAS_ERROR_BASE)

#define INITIAL_BUFFER_SIZE             32768

#define FLV_HEADER_LEN 9
#define TAG_HEADER_LEN 11
#define PRE_TAG_SIZE_LEN 4

//las 2.0 Tag based
#define AV_TAG_HEADER_LEN 16 // 11+1+1+3, 1 bytes for av parameters, 1 bytes for AVCPacketType, 3 bytes for CompositionTime
#define TIME_ALGO_UPDATE_INTERVAL_MS (500)
#define INIT_BUFFER_THRESHOLD_MAX_MS (8*1000)
#define MAX_BUFFER_TIME 10000
#define MAX_STATE_CNT 30

typedef struct RateAdaptionState {
    int32_t bitrate; //kbps
    int32_t q_c;     //ms
    int32_t q_e;     //ms
    int32_t bw_c;    //kbps
    int32_t bw_frag; //kbps
} RateAdaptionState;

typedef struct RateAdaptConfig {
    int32_t buffer_init;
    int32_t switch_down_q;
    int32_t switch_down_bw_frag;
    int32_t switch_up_bw_frag;
    int32_t switch_up_q;
    int32_t switch_up_bw_frag1;
    int32_t frag_bw_window;
    int32_t stable_buffer_diff;
    int32_t stable_buffer_cnt;
    int32_t stable_buffer_switch_up_cnt;
    int32_t init_bitrate;
    int32_t init_index;
} RateAdaptConfig;

typedef struct HisState {
    int32_t net_type;
    int32_t short_term_throughput;
    int32_t long_term_throughput;
} HisState;

typedef struct MultiRateAdaption {
    int32_t n_bitrates;
    int32_t bitrate_table_origin_order[MAX_STREAM_NUM];
    int32_t bitrate_table[MAX_STREAM_NUM];
    int32_t disable_adaptive_table[MAX_STREAM_NUM];
    int32_t next_expected_rep_index;
    int32_t last_fragment_index;
    int32_t last_requested_bitrate;
    int32_t max_fragment_index;
    int64_t stable_buffer_cnt;
    RateAdaptionState state[MAX_STATE_CNT];
    bool is_first_gop;
    int64_t state_cycle;
    RateAdaptConfig rate_adaption_config;

    int32_t buffer_init;
    struct PlayList* playlist;
    unsigned session_id;
} MultiRateAdaption;

typedef struct FlvTag {
    uint8_t* buf;
    uint32_t tag_size;
    uint32_t buf_write_offset;
    uint32_t buf_read_offset;
    uint32_t av_tag_ts;
    enum FlvTagType type;
    int rep_index;
    int audio_only;
    int switch_index;
} FlvTag;

typedef struct Representation {
    char url[MAX_URL_SIZE];
    int id;
    int bitrate;
    int disabledFromAdaptive;
    int defaultSelected;
    int index;
    int retry_cnt;
} Representation;

typedef struct AdaptationSet {
    int duration;
    Representation* representations[MAX_STREAM_NUM];
    int n_representation;
} AdaptationSet;

typedef struct TagListNode {
    FlvTag tag;
    struct TagListNode* next;
} TagListNode;

typedef struct TagQueue {
    TagListNode* first_tag, *last_tag;
    int nb_tags;
    uint32_t last_video_ts;
    int64_t total_tag_bytes;
    int abort_request;
    SDL_mutex* mutex;
    SDL_cond* cond;
} TagQueue;

typedef struct GopReader {
    // real read context
    char realtimeUrl[MAX_URL_SIZE];
    URLContext* input;
    int abort_request;
    int64_t last_gop_start_ts;

    int rep_index;
    int is_audio_only;
    int switch_index;
    AVFormatContext* parent;
} GopReader;

typedef struct PlayList {
    struct AdaptationSet adaptationSet;
    AVFormatContext* outermost_ctx;

    // demuxer related
    AVFormatContext* parent;
    uint8_t* read_buffer;
    AVIOContext pb;
    AVFormatContext* ctx;
    AVPacket pkt;

    int cur_rep_index;
    int cur_switch_index;
    int stream_index_map[MAX_STREAM_NUM];
    int error_code;
    int read_abort_request;
    SDL_Thread _read_thread;
    SDL_Thread* read_thread;

    SDL_Thread _algo_thread;
    SDL_Thread* algo_thread;
    SDL_cond* algo_cond;

    SDL_mutex* rw_mutex;
    SDL_mutex* reading_tag_mutex;
    // las_mutex is privately used inside of #pragma PlayListLock's setters and getters
    SDL_mutex* las_mutex;

    MultiRateAdaption multi_rate_adaption;
    GopReader gop_reader;
    FlvTag reading_tag;
    TagQueue tag_queue;

    // cur playlist Qos
    LasStatistic* las_statistic;
    LasPlayerStatistic* las_player_statistic;
    bool is_stream_ever_opened;
    int64_t bytes_read;
    unsigned session_id;
    int64_t max_retry_cnt;
    bool codec_change_enabled;
} PlayList;

typedef struct LasContext {
    AVClass* class;
    // the outermost context
    AVFormatContext* ctx;

    AVIOInterruptCB* interrupt_callback;
    char* user_agent;                    ///< holds HTTP user agent set as an AVOption to the HTTP protocol context
    char* cookies;                       ///< holds HTTP cookie values set in either the initial response or as an AVOption to the HTTP protocol context
    char* headers;                       ///< holds HTTP headers set as an AVOption to the HTTP protocol context
    char* http_proxy;                    ///< holds the address of the HTTP proxy server
    char* server_ip;                     ///< holds the HTTP server ip
    char* manifest_string;
    int64_t network;
    char* abr_history_data;
    int64_t las_player_statistic;
    char* liveAdaptConfig;
    AVDictionary* avio_opts;

    // all info of las is in it
    PlayList playlist;
    unsigned session_id;
} LasContext;

#pragma mark common util
inline static int64_t get_current_time_ms() {
    return av_gettime_relative() / 1000;
}

#pragma mark log util
#define LOG_THREAD 1
// ------------------------------------ log util start------------------------------------
static inline void _log(unsigned session_id, const char* func_name, int av_log_level, ...) {
    va_list args;
    va_start(args, av_log_level);
    const char* fmt = va_arg(args, const char*);
    char tmp[1024] = {0};
    vsprintf(tmp, fmt, args);
    va_end(args);
#if LOG_THREAD
    av_log(NULL, av_log_level, "[%u][las][%s] %s\n", session_id, func_name, tmp);
#endif
}

#define log_debug_tag(session_id, av_log_level, ...) _log(session_id, __func__, av_log_level, __VA_ARGS__)
#define log_debug(...) log_debug_tag(playlist->session_id, AV_LOG_DEBUG, __VA_ARGS__)
#define log_info(...) log_debug_tag(playlist->session_id, AV_LOG_INFO, __VA_ARGS__)
#define log_error(...) log_debug_tag(playlist->session_id, AV_LOG_ERROR, __VA_ARGS__)
#define algo_debug(...) log_debug_tag(thiz->session_id, AV_LOG_DEBUG, __VA_ARGS__)
#define algo_info(...) log_debug_tag(thiz->session_id, AV_LOG_INFO, __VA_ARGS__)
#define algo_error(...) log_debug_tag(thiz->session_id, AV_LOG_ERROR, __VA_ARGS__)

#pragma mark PlayerControl
int las_stat_init(LasPlayerStatistic* stat) {
    memset(stat, 0, sizeof(LasPlayerStatistic));
    stat->las_switch_mode = LAS_AUTO_MODE;
    return pthread_mutex_init(&stat->control_mutex, NULL);
}

void las_stat_destroy(LasPlayerStatistic* stat) {
    pthread_mutex_destroy(&stat->control_mutex);
}

int las_get_switch_mode(LasPlayerStatistic* stat) {
    pthread_mutex_lock(&stat->control_mutex);
    int switch_mode = stat->las_switch_mode;
    pthread_mutex_unlock(&stat->control_mutex);
    return switch_mode;
}

void las_set_switch_mode(LasPlayerStatistic* stat, int switch_mode) {
    pthread_mutex_lock(&stat->control_mutex);
    stat->las_switch_mode = switch_mode;
    pthread_mutex_unlock(&stat->control_mutex);
}

int64_t las_get_first_audio_packet_pts(LasPlayerStatistic* stat) {
    pthread_mutex_lock(&stat->control_mutex);
    int64_t ret = stat->first_audio_packet_pts;
    pthread_mutex_unlock(&stat->control_mutex);
    return ret;
}

void las_set_first_audio_packet_pts(LasPlayerStatistic* stat, int64_t first_audio_packet_pts) {
    pthread_mutex_lock(&stat->control_mutex);
    stat->first_audio_packet_pts = first_audio_packet_pts;
    pthread_mutex_unlock(&stat->control_mutex);
}

int las_get_audio_only_request(LasPlayerStatistic* stat) {
    pthread_mutex_lock(&stat->control_mutex);
    int ret = stat->audio_only_request;
    pthread_mutex_unlock(&stat->control_mutex);
    return ret;
}

void las_set_audio_only_request(LasPlayerStatistic* stat, int audio_only) {
    pthread_mutex_lock(&stat->control_mutex);
    stat->audio_only_request = audio_only;
    pthread_mutex_unlock(&stat->control_mutex);
}

int las_get_audio_only_response(LasPlayerStatistic* stat) {
    pthread_mutex_lock(&stat->control_mutex);
    int ret = stat->audio_only_response;
    pthread_mutex_unlock(&stat->control_mutex);
    return ret;
}

void las_set_audio_only_response(LasPlayerStatistic* stat, int audio_only) {
    pthread_mutex_lock(&stat->control_mutex);
    stat->audio_only_response = audio_only;
    pthread_mutex_unlock(&stat->control_mutex);
}

int64_t las_get_audio_cached_duration_ms(LasPlayerStatistic* stat) {
    pthread_mutex_lock(&stat->control_mutex);
    int64_t ret = stat->audio_cached_duration_ms;
    pthread_mutex_unlock(&stat->control_mutex);
    return ret;
}

void las_set_audio_cached_duration_ms(LasPlayerStatistic* stat, int64_t audio_cached_duration_ms) {
    pthread_mutex_lock(&stat->control_mutex);
    stat->audio_cached_duration_ms = audio_cached_duration_ms;
    pthread_mutex_unlock(&stat->control_mutex);
}

int64_t las_get_video_cached_duration_ms(LasPlayerStatistic* stat) {
    pthread_mutex_lock(&stat->control_mutex);
    int64_t ret = stat->video_cached_duration_ms;
    pthread_mutex_unlock(&stat->control_mutex);
    return ret;
}

void las_set_video_cached_duration_ms(LasPlayerStatistic* stat, int64_t video_cached_duration_ms) {
    pthread_mutex_lock(&stat->control_mutex);
    stat->video_cached_duration_ms = video_cached_duration_ms;
    pthread_mutex_unlock(&stat->control_mutex);
}

bool las_get_stream_reopened(LasPlayerStatistic* stat) {
    pthread_mutex_lock(&stat->control_mutex);
    bool ret = stat->stream_reopened;
    pthread_mutex_unlock(&stat->control_mutex);
    return ret;
}

void las_set_stream_reopened(LasPlayerStatistic* stat, bool stream_reopened) {
    pthread_mutex_lock(&stat->control_mutex);
    stat->stream_reopened = stream_reopened;
    pthread_mutex_unlock(&stat->control_mutex);
}

#pragma mark PlayerStat
int32_t LasPlayerStatistic_get_downloading_bitrate(LasPlayerStatistic* stat) {
    if (stat->las_stat.bitrate_downloading > 0) {
        return stat->las_stat.bitrate_downloading;
    }
    return 0;
}

char* LasPlayerStatistic_get_downloading_url(LasPlayerStatistic* stat) {
    return stat->las_stat.cur_playing_url;
}

int LasPlayerStatistic_get_http_reading_error(LasPlayerStatistic* stat) {
    if (stat->las_stat.cur_rep_http_reading_error != 0) {
        return stat->las_stat.cur_rep_http_reading_error;
    } else {
        return 0;
    }
}


#pragma mark PlayListLock
static int64_t get_bytes_read(PlayList* p) {
    SDL_LockMutex(p->las_mutex);
    int64_t ret = p->bytes_read;
    SDL_UnlockMutex(p->las_mutex);
    return ret;
}

static void add_bytes_read(PlayList* p, int64_t bytes_read) {
    SDL_LockMutex(p->las_mutex);
    p->bytes_read += bytes_read;
    SDL_UnlockMutex(p->las_mutex);
}

static void algo_cond_wait(PlayList* p) {
    SDL_LockMutex(p->las_mutex);
    SDL_CondWaitTimeout(p->algo_cond, p->las_mutex, TIME_ALGO_UPDATE_INTERVAL_MS);
    SDL_UnlockMutex(p->las_mutex);
}

static void algo_cond_signal(PlayList* p) {
    SDL_LockMutex(p->las_mutex);
    SDL_CondSignal(p->algo_cond);
    SDL_UnlockMutex(p->las_mutex);
}

#pragma mark TagQueue
static int FlvTag_has_consume_all_data_l(struct FlvTag* tag) {
    if (tag->tag_size <= 0) {
        return 1;
    }

    // if reader->buf_size = 0 or reader->gop_size = 0, means that the reader is going to download data ,but not stared yet
    int ret = (tag->tag_size == tag->buf_read_offset);
    return ret;
}

int FlvTag_get_data_from_buffer(PlayList* playlist, struct FlvTag* tag, uint8_t* buf, uint32_t buf_size) {
    if (FlvTag_has_consume_all_data_l(tag)) {
        log_error("FlvTag_has_consume_all_data_l, illegal state");
        return -1;
    }

    int to_read = FFMIN(buf_size, tag->buf_write_offset - tag->buf_read_offset);

    memcpy(buf, tag->buf + tag->buf_read_offset, to_read);
    tag->buf_read_offset += to_read;

    return to_read;
}

int FlvTag_alloc_buffer(PlayList* playlist, struct FlvTag* tag, int32_t tag_size) {
    tag->buf = av_malloc(tag_size);
    if (!tag->buf) {
        log_error("alloc tag->buf fail");
        return AVERROR(ENOMEM);
    }

    tag->tag_size = tag_size;
    tag->buf_read_offset = tag->buf_write_offset = 0;
    return 0;
}

void FlvTag_dealloc(struct FlvTag* tag) {
    if (!tag) {
        return;
    }

    if (tag->buf) {
        av_freep(&tag->buf);
    }
    tag->tag_size = tag->buf_read_offset = tag->buf_write_offset = 0;
}

static int TagQueue_init(PlayList* playlist, TagQueue* q) {
    memset(q, 0, sizeof(TagQueue));
    q->mutex = SDL_CreateMutex();
    if (!q->mutex) {
        log_error("SDL_CreateMutex():fail");
        return AVERROR(ENOMEM);
    }
    q->cond = SDL_CreateCond();
    if (!q->cond) {
        log_error("SDL_CreateCond():fail");
        return AVERROR(ENOMEM);
    }
    q->abort_request = 1;
    return 0;
}

static void TagQueue_start(TagQueue* q) {
    SDL_LockMutex(q->mutex);
    q->abort_request = 0;
    SDL_UnlockMutex(q->mutex);
}

static int TagQueue_put_private(TagQueue* q, FlvTag* tag) {
    TagListNode* tag1;

    if (q->abort_request)
        return -1;

    tag1 = av_malloc(sizeof(TagListNode));
    if (!tag1)
        return -1;

    tag1->tag = *tag;
    tag1->next = NULL;

    if (!q->last_tag)
        q->first_tag = tag1;
    else
        q->last_tag->next = tag1;

    q->last_tag = tag1;
    q->nb_tags++;
    if (tag->type == FLV_TAG_TYPE_VIDEO)
        q->last_video_ts = tag->av_tag_ts;
    q->total_tag_bytes += tag->tag_size;
    SDL_CondSignal(q->cond);
    return 0;
}

static int TagQueue_put(TagQueue* q, FlvTag* tag) {
    int ret;

    SDL_LockMutex(q->mutex);
    ret = TagQueue_put_private(q, tag);
    SDL_UnlockMutex(q->mutex);

    if (ret < 0) {
        FlvTag_dealloc(tag);
    }

    return ret;
}

static int TagQueue_peek_first_video_ts(TagQueue* q) {
    TagListNode* tag_node, *tag_node1;
    int ret = -1;

    SDL_LockMutex(q->mutex);
    for (tag_node = q->first_tag; tag_node; tag_node = tag_node1) {
        tag_node1 = tag_node->next;
        if (tag_node->tag.type == FLV_TAG_TYPE_VIDEO) {
            ret = tag_node->tag.av_tag_ts;
            break;
        }
    }
    SDL_UnlockMutex(q->mutex);

    return ret;
}


/* return < 0 if aborted, 0 if no tag and > 0 if has tag.  */
static int TagQueue_get(TagQueue* q, FlvTag* tag, int block) {
    TagListNode* tag_node;
    int ret;

    SDL_LockMutex(q->mutex);

    for (;;) {
        if (q->abort_request) {
            ret = -1;
            break;
        }

        tag_node = q->first_tag;
        if (tag_node) {
            q->first_tag = tag_node->next;
            if (!q->first_tag)
                q->last_tag = NULL;
            q->nb_tags--;
            *tag = tag_node->tag;
            // q->total_tag_bytes -= tag->tag_size;
            av_free(tag_node);
            ret = 1;
            break;
        } else if (!block) {
            ret = 0;
            break;
        } else {
            SDL_CondWait(q->cond, q->mutex);
        }
    }

    SDL_UnlockMutex(q->mutex);
    return ret;
}


static void TagQueue_flush(TagQueue* q) {
    TagListNode* tag_node, *tag_node_next;

    SDL_LockMutex(q->mutex);
    for (tag_node = q->first_tag; tag_node; tag_node = tag_node_next) {
        tag_node_next = tag_node->next;
        FlvTag_dealloc(&tag_node->tag);
        av_freep(&tag_node);
    }
    q->last_tag = NULL;
    q->first_tag = NULL;
    q->nb_tags = 0;
    q->last_video_ts = 0;
    SDL_UnlockMutex(q->mutex);
}

static void TagQueue_destroy(TagQueue* q) {
    TagQueue_flush(q);
    SDL_DestroyMutex(q->mutex);
    SDL_DestroyCond(q->cond);
}

static void TagQueue_abort(TagQueue* q) {
    SDL_LockMutex(q->mutex);
    q->abort_request = 1;
    SDL_CondSignal(q->cond);
    SDL_UnlockMutex(q->mutex);
}

static int32_t TagQueue_get_duration_ms(TagQueue* q) {
    int32_t ret = 0;

    int first_ts = TagQueue_peek_first_video_ts(q);

    if (first_ts >= 0) {
        SDL_LockMutex(q->mutex);
        ret = q->last_video_ts - first_ts;
        SDL_UnlockMutex(q->mutex);
    }

    return ret > 0 ? ret : 0;
}

static int64_t TagQueue_get_total_bytes(TagQueue* q) {
    int64_t ret = 0;

    SDL_LockMutex(q->mutex);
    ret = q->total_tag_bytes;
    SDL_UnlockMutex(q->mutex);

    return ret > 0 ? ret : 0;
}


#pragma mark LasStatistic
int32_t get_video_bitrate(MultiRateAdaption* thiz) {
    return thiz->bitrate_table[thiz->last_fragment_index];
}

int32_t get_buffer_current(MultiRateAdaption* thiz) {
    if (thiz->state_cycle > 0) {
        return thiz->state[(thiz->state_cycle - 1) % MAX_STATE_CNT].q_c;
    }
    return 0;
}

int32_t get_buffer_estimate(MultiRateAdaption* thiz) {
    if (thiz->state_cycle > 0) {
        return thiz->state[(thiz->state_cycle - 1) % MAX_STATE_CNT].q_e;
    }
    return 0;
}

int32_t get_bw_current(MultiRateAdaption* thiz) {
    if (thiz->state_cycle > 0) {
        return thiz->state[(thiz->state_cycle - 1) % MAX_STATE_CNT].bw_c;
    }
    return 0;
}

int32_t get_bw_fragment(MultiRateAdaption* thiz) {
    if (thiz->state_cycle > 0) {
        return thiz->state[(thiz->state_cycle - 1) % MAX_STATE_CNT].bw_frag;
    }
    return 0;
}

void LasStatistic_reset(LasStatistic* stat) {
    if (stat) {
        memset(stat, 0, sizeof(LasStatistic));
    }
}

void LasStatistic_init(LasStatistic* stat, PlayList* playlist) {
    LasStatistic_reset(stat);

    stat->flv_nb = playlist->adaptationSet.n_representation;
    for (int i = 0; i < playlist->adaptationSet.n_representation; i++) {
        stat->flvs[i].total_bandwidth_kbps = playlist->adaptationSet.representations[i]->bitrate;
        strncpy(stat->flvs[i].url, playlist->adaptationSet.representations[i]->url, MAX_URL_SIZE - 1);
    }
}

void LasStatistic_on_rep_http_url(LasStatistic* stat, char* request_url) {
    if (stat) {
        strncpy(stat->cur_playing_url, request_url, MAX_URL_SIZE - 1);
    }
}

void LasStatistic_on_rep_http_start(LasStatistic* stat, int64_t start_time) {
    if (stat) {
        stat->cur_rep_read_start_time = start_time;
    }
}

void LasStatistic_on_rep_http_open(LasStatistic* stat, int64_t open_time) {
    if (stat) {
        stat->cur_rep_http_open_time = open_time;
    }
}

void LasStatistic_on_rep_flv_header(LasStatistic* stat, int64_t header_time) {
    if (stat) {
        stat->cur_rep_read_header_time = header_time;
    }
}

void LasStatistic_on_rep_http_first_data(LasStatistic* stat, int64_t first_data_time) {
    if (stat) {
        stat->cur_rep_first_data_time = first_data_time;
    }
}

void LasStatistic_on_rep_start_timestamp(PlayList* playlist, int64_t start_time, int64_t request_time) {
    LasStatistic* stat = playlist->las_statistic;
    if (stat) {
        stat->cur_rep_start_time = start_time;
        stat->rep_switch_gap_time = request_time <= 0 ? 0 : start_time - request_time;
        log_info("rep_switch_gap_time=%lld", stat->rep_switch_gap_time);
    }
}

void LasStatistic_on_rep_read_error(LasStatistic* stat, int error) {
    if (stat) {
        stat->cur_rep_http_reading_error = error;
    }
}

void LasStatistic_on_read_packet(LasStatistic* stat, PlayList* playlist) {
    if (stat && playlist) {
        stat->cur_decoding_flv_index = playlist->cur_rep_index;
    }
}

void LasStatistic_on_buffer_time(LasStatistic* stat, PlayList* playlist) {
    if (stat && playlist) {
        stat->cached_a_dur_ms = las_get_audio_cached_duration_ms(playlist->las_player_statistic);
        stat->cached_v_dur_ms = las_get_video_cached_duration_ms(playlist->las_player_statistic);
        stat->cached_tag_dur_ms = TagQueue_get_duration_ms(&playlist->tag_queue);
        log_info("a_buffer_time_ms=%lld, v_buffer_time_ms=%lld, CachedTagQueue_ms=%lld",
                 stat->cached_a_dur_ms, stat->cached_v_dur_ms, stat->cached_tag_dur_ms);
    }
}

void LasStatistic_on_adaption_adapted(PlayList* playlist, MultiRateAdaption* adaption) {
    LasStatistic* stat = playlist->las_statistic;
    if (stat && adaption) {
        stat->bitrate_downloading = get_video_bitrate(adaption);
    }
}

void LasStatistic_on_bytes_downloaded(LasStatistic* stat, int64_t bytes) {
    if (stat) {
        stat->total_bytes_read += bytes;
    }
}

void LasStatistic_on_bandwidth_update(PlayList* playlist, MultiRateAdaption* adaption) {
    LasStatistic* stat = playlist->las_statistic;
    if (stat && adaption) {
        stat->bandwidth_current = get_bw_current(adaption);
        stat->bandwidth_fragment = get_bw_fragment(adaption);
        stat->current_buffer_ms = get_buffer_current(adaption);
        stat->estimate_buffer_ms = get_buffer_estimate(adaption);
    }
    log_info("current_buffer=%lld, bandwidth=%lld", stat->current_buffer_ms, stat->bandwidth_current);
}

void LasStatistic_on_rep_switch_count(LasStatistic* stat, PlayList* playlist) {
    if (stat) {
        stat->rep_switch_cnt++;
        stat->switch_point_a_buffer_ms = las_get_audio_cached_duration_ms(playlist->las_player_statistic);
        stat->switch_point_v_buffer_ms = las_get_video_cached_duration_ms(playlist->las_player_statistic);
    }
}

#pragma mark MultiRateAdaption
int32_t LocalIndex2RepIndex(MultiRateAdaption* thiz, int32_t local_index) {
    int32_t rep_index = 0;
    for (int i = 0; i < thiz->n_bitrates; i++) {
        if (thiz->bitrate_table[local_index] == thiz->bitrate_table_origin_order[i]) {
            rep_index = i;
            break;
        }
    }
    return rep_index;
}

int32_t RepIndex2LocalIndex(MultiRateAdaption* thiz, int32_t rep_index) {
    int32_t local_index = 0;
    for (int i = 0; i < thiz->n_bitrates; i++) {
        if (thiz->bitrate_table[i] == thiz->bitrate_table_origin_order[rep_index]) {
            local_index = i;
            break;
        }
    }
    return local_index;

}

int getLocalIndexFromBitrate(MultiRateAdaption* thiz, int64_t bitrate) {
    for (int32_t i = thiz->n_bitrates - 1; i > 0; --i) {
        if (thiz->bitrate_table[i] <= bitrate) {
            return i;
        }
    }
    return 0;
}

int Compare(const void* a, const void* b) {
    return (*(int32_t*)a - * (int32_t*)b);
}

void RateAdaptConfig_default_init(RateAdaptConfig* rate_config, PlayList* playlist) {
    playlist->max_retry_cnt = 0;

    rate_config->buffer_init = 2000;
    rate_config->switch_down_q = 800;
    rate_config->switch_down_bw_frag = 100;
    rate_config->switch_up_bw_frag = 100;
    rate_config->switch_up_q = 800;
    rate_config->switch_up_bw_frag1 = 250;
    rate_config->stable_buffer_diff = 250;
    rate_config->stable_buffer_cnt = 12;
    rate_config->stable_buffer_switch_up_cnt = 3;
    rate_config->init_bitrate = -1;
    rate_config->init_index = -1;
    rate_config->frag_bw_window = 10;
}

static bool isBitrateAllowedByHisState(HisState his_state, int32_t bitrate) {
    if (his_state.short_term_throughput > 0 && bitrate > his_state.short_term_throughput) {
        return false;
    }
    if (his_state.long_term_throughput > 0 && bitrate > his_state.long_term_throughput) {
        return false;
    }
    return true;
}

// return index of optimized Representation
void MultiRateAdaption_init(MultiRateAdaption* thiz, RateAdaptConfig rate_config, HisState his_state,
                                struct PlayList* playlist) {
    if (!thiz || !playlist || playlist->adaptationSet.n_representation <= 0) {
        log_error("thiz:%p, p:%p", thiz, playlist);
        return;
    }
    thiz->rate_adaption_config = rate_config;
    thiz->n_bitrates = 0;
    thiz->playlist = playlist;
    thiz->session_id = playlist->session_id;
    int64_t default_select_bitrate = -1;
    for (int i = 0; i < playlist->adaptationSet.n_representation; i++) {
        Representation* rep = playlist->adaptationSet.representations[i];
        thiz->bitrate_table_origin_order[i] = rep->bitrate;
        thiz->bitrate_table[i] = rep->bitrate;
        if (rep->defaultSelected) {
            default_select_bitrate = rep->bitrate;
        }
        thiz->disable_adaptive_table[i] = rep->disabledFromAdaptive;
        thiz->n_bitrates++;
    }
    qsort(thiz->bitrate_table, thiz->n_bitrates, sizeof(int32_t), Compare);

    thiz->buffer_init = rate_config.buffer_init;
    if (thiz->buffer_init > INIT_BUFFER_THRESHOLD_MAX_MS) {
        thiz->buffer_init = INIT_BUFFER_THRESHOLD_MAX_MS;
    }

    if (default_select_bitrate >= 0) {
        thiz->last_fragment_index = getLocalIndexFromBitrate(thiz, default_select_bitrate);
    } else if (thiz->rate_adaption_config.init_bitrate >= 0) {
        thiz->last_fragment_index = getLocalIndexFromBitrate(thiz, thiz->rate_adaption_config.init_bitrate);
    } else if (thiz->rate_adaption_config.init_index >= 0) {
        thiz->last_fragment_index = thiz->rate_adaption_config.init_index;
    } else {
        thiz->last_fragment_index = (thiz->n_bitrates - 1) / 2;
    }
    while (thiz->last_fragment_index >= thiz->n_bitrates) {
        thiz->last_fragment_index -= 1;
    }

    // limited by his_state
    while (thiz->last_fragment_index > 0
           && !isBitrateAllowedByHisState(his_state, thiz->bitrate_table[thiz->last_fragment_index])) {
        thiz->last_fragment_index -= 1;
    }

    int switch_mode = las_get_switch_mode(playlist->las_player_statistic);
    if (switch_mode >= 0 && switch_mode < thiz->n_bitrates) {
        thiz->last_fragment_index = RepIndex2LocalIndex(thiz, switch_mode);
    }

    thiz->last_requested_bitrate = thiz->bitrate_table[thiz->last_fragment_index];
    LasStatistic_on_adaption_adapted(thiz->playlist, thiz);
    thiz->next_expected_rep_index = LocalIndex2RepIndex(thiz, thiz->last_fragment_index);
    thiz->max_fragment_index = 0;
    thiz->stable_buffer_cnt = 0;
    thiz->is_first_gop = true;
    thiz->state_cycle = 0;
}

void OnStatisticInfo(MultiRateAdaption* thiz,
                     int32_t v_buffer_time /*v_buf ms*/,
                     int32_t a_buffer_time /*ms*/,
                     int32_t time_duration /*ms*/,
                     int32_t bytes_read /*byte*/) {
    if (bytes_read <= 0 || time_duration <= 100) {
        return;
    }
    int32_t buffer_time = a_buffer_time;
    buffer_time = buffer_time >= MAX_BUFFER_TIME ? MAX_BUFFER_TIME : buffer_time;
    algo_info("buffer_time: %u, time_duration: %u, bytes_read: %u", buffer_time, time_duration, bytes_read);

    RateAdaptionState* state = &thiz->state[thiz->state_cycle % MAX_STATE_CNT];
    RateAdaptionState* last_state = state;
    if (thiz->state_cycle > 0) {
        last_state = &thiz->state[(thiz->state_cycle - 1) % MAX_STATE_CNT];
    }

    state->q_c = buffer_time;
    state->bw_c = bytes_read * 8 / time_duration; //kbps

    if (thiz->state_cycle > 0) {
        int64_t diff = FFABS(buffer_time - last_state->q_c);
        if (diff < thiz->rate_adaption_config.stable_buffer_diff) {
            thiz->stable_buffer_cnt += 1;
        } else {
            algo_info("buffer_diff: %lld, reset buffer_cnt: %lld", diff, thiz->stable_buffer_cnt);
            thiz->stable_buffer_cnt = 0;
        }
    }

    state->bitrate = thiz->last_requested_bitrate;
    int32_t sum_bw_c = 0;
    int i = 0;
    for (; i < thiz->rate_adaption_config.frag_bw_window && i <= thiz->state_cycle; i++) {
        sum_bw_c += thiz->state[(thiz->state_cycle - i) % MAX_STATE_CNT].bw_c;
    }
    state->bw_frag = sum_bw_c / i;
    state->q_e = (state->q_c + last_state->q_c) / 2;
    algo_info("video_rate: %u, q_c: %u, q_e: %u, bw_c: %u, bw_frag: %u",
              state->bitrate, state->q_c, state->q_e, state->bw_c, state->bw_frag);
    thiz->state_cycle++;
}

bool IsBufferStable(MultiRateAdaption* thiz) {
    if (thiz->last_fragment_index < thiz->max_fragment_index
        && thiz->rate_adaption_config.stable_buffer_switch_up_cnt > 0) {
        if (thiz->stable_buffer_cnt > thiz->rate_adaption_config.stable_buffer_cnt) {
            thiz->rate_adaption_config.stable_buffer_switch_up_cnt -= 1;
            algo_info("Buffer is stable for: %lld", thiz->stable_buffer_cnt);
            return true;
        }
    }
    return false;
}

bool CanSwitchUpForNormal(MultiRateAdaption* thiz) {
    int32_t switch_up_q = thiz->rate_adaption_config.switch_up_q;
    int32_t switch_up_bw_frag1 = thiz->rate_adaption_config.switch_up_bw_frag1;
    RateAdaptionState state = thiz->state[(thiz->state_cycle - 1) % MAX_STATE_CNT];

    if (state.q_c >= switch_up_q && state.q_e >= switch_up_q) {
        if (state.bw_frag >= state.bitrate * switch_up_bw_frag1 / 100) {
            algo_info("CanSwitchUpForNormal = True, Reason = switch_up_bw_frag1");
            return true;
        }
        if (IsBufferStable(thiz)) {
            return true;
        }
    }
    algo_info("CanSwitchUpForNormal = False");
    return false;
}

int64_t get_past_buffer(MultiRateAdaption* thiz) {
    int64_t max_buffer = 500;
    for (int i = 0; i < MAX_STATE_CNT && i < thiz->state_cycle; ++i) {
        int64_t q_c = thiz->state[(thiz->state_cycle - 1 - i) % MAX_STATE_CNT].q_c;
        if (q_c > max_buffer) {
            max_buffer = q_c;
        }
    }
    return max_buffer;
}

int32_t NextLocalRateIndex(MultiRateAdaption* thiz) {
    int32_t switch_down_q = thiz->rate_adaption_config.switch_down_q;
    RateAdaptionState state = thiz->state[(thiz->state_cycle - 1) % MAX_STATE_CNT];

    if (thiz->is_first_gop) {
        thiz->is_first_gop = false;
    } else {
        int64_t max_buffer = get_past_buffer(thiz);
        if (switch_down_q > max_buffer / 2) {
            switch_down_q = max_buffer / 2;
            algo_info("max_buffer = %lld", max_buffer);
        }
    }
    if (state.q_c < switch_down_q || state.q_e < switch_down_q) {
        int32_t target_bitrate = state.bw_frag * thiz->rate_adaption_config.switch_down_bw_frag / 100;
        algo_info("Down target_bitrate = %u", target_bitrate);
        int32_t target_index = getLocalIndexFromBitrate(thiz, target_bitrate);
        if (target_index < thiz->last_fragment_index) {
            thiz->last_fragment_index = target_index;
        }
    } else if (CanSwitchUpForNormal(thiz)) {
        if (thiz->last_fragment_index < thiz->n_bitrates - 1) {
            thiz->last_fragment_index += 1;
        }
    } else {
        algo_info("Maintain");
    }
    algo_info("target_index = %u", thiz->last_fragment_index);
    return thiz->last_fragment_index;
}

bool IsRepIgnored(PlayList* playlist, Representation* rep) {
    return rep->retry_cnt > playlist->max_retry_cnt;
}

bool IsLocalIgnored(PlayList* playlist, int32_t local_index) {
    int32_t rep_index = LocalIndex2RepIndex(&playlist->multi_rate_adaption, local_index);
    return IsRepIgnored(playlist, playlist->adaptationSet.representations[rep_index]);
}

void LasRetry(PlayList* playlist, Representation* rep) {
    MultiRateAdaption* thiz = &playlist->multi_rate_adaption;
    int32_t next_index = RepIndex2LocalIndex(thiz, rep->index);
    int32_t success_index = RepIndex2LocalIndex(thiz, playlist->cur_rep_index);
    if (IsLocalIgnored(playlist, next_index)) {
        for (int32_t i = 0; i < thiz->n_bitrates; i++) {
            if (!IsLocalIgnored(playlist, i)
                && (IsLocalIgnored(playlist, next_index)
                    || FFABS(i - success_index) < FFABS(next_index - success_index))) {
                next_index = i;
            }
        }
    }
    thiz->last_fragment_index = next_index;
    thiz->last_requested_bitrate = thiz->bitrate_table[next_index];
    thiz->next_expected_rep_index = LocalIndex2RepIndex(thiz, next_index);
}

void LasIgnoreCodec(PlayList* playlist, Representation* rep) {
    rep->retry_cnt = playlist->max_retry_cnt;
    playlist->error_code = LAS_ERROR_CODEC_CHANGE;
}

int32_t NextRepresentationId(MultiRateAdaption* thiz, int switch_mode) {
    if (switch_mode >= 0 && switch_mode < thiz->n_bitrates) {
        thiz->last_fragment_index = RepIndex2LocalIndex(thiz, switch_mode);
        thiz->last_requested_bitrate = thiz->bitrate_table[thiz->last_fragment_index];
        return switch_mode;
    }

    if (thiz->state_cycle == 0) {
        return LocalIndex2RepIndex(thiz, thiz->last_fragment_index);
    }

    int local_index = NextLocalRateIndex(thiz);
    int rep_index = LocalIndex2RepIndex(thiz, local_index);
    while (local_index > 0 && thiz->disable_adaptive_table[rep_index]) {
        local_index -= 1;
        rep_index = LocalIndex2RepIndex(thiz, local_index);
    }
    if (IsLocalIgnored(thiz->playlist, local_index)) {
        rep_index = thiz->next_expected_rep_index;
    } else {
        if (local_index > thiz->max_fragment_index) {
            thiz->max_fragment_index = local_index;
        }
        thiz->last_fragment_index = local_index;
        thiz->last_requested_bitrate = thiz->bitrate_table[local_index];
    }
    return rep_index;
}

#pragma mark Download
static void update_options(char** dest, const char* name, void* src) {
    av_freep(dest);
    av_opt_get(src, name, 0, (uint8_t**)dest);
    if (*dest && !strlen(*dest))
        av_freep(dest);
}

static int open_url(LasContext* c, URLContext** uc, const char* url,
                    AVDictionary* opts, AVDictionary* opts2, PlayList* playlist) {
    AVDictionary* tmp = NULL;
    const char* proto_name = NULL;
    int ret;

    av_dict_copy(&tmp, opts, 0);
    av_dict_copy(&tmp, opts2, 0);

    if (!proto_name) {
        proto_name = avio_find_protocol_name(url);
    }

    if (!proto_name)
        return AVERROR_INVALIDDATA;

    ret = ffurl_open_whitelist(uc, url,  AVIO_FLAG_READ, c->interrupt_callback, &tmp, c->ctx->protocol_whitelist, c->ctx->protocol_blacklist, c->ctx);
    if (ret >= 0) {
        log_info("ffurl_open_whitelist succeeds");
        // update cookies on http response with setcookies.
        char* new_cookies = NULL;
        if (!(c->ctx->flags & AVFMT_FLAG_CUSTOM_IO))
            av_opt_get(*uc, "cookies", AV_OPT_SEARCH_CHILDREN, (uint8_t**)&new_cookies);
        if (new_cookies) {
            if (c->cookies) {
                av_free(c->cookies);
            }
            c->cookies = new_cookies;
        }

        // update cookies on http response with setcookies.
        URLContext* u = *uc;
        update_options(&c->cookies, "cookies", u->priv_data);
        av_dict_set(&opts, "cookies", c->cookies, 0);
    } else {
        log_error("ffurl_open_whitelist fails: %s(0x%x)", av_err2str(ret), ret);
    }

    av_dict_copy(&c->ctx->metadata, tmp, 0);
    av_dict_free(&tmp);
    return ret;
}

enum ReadFromURLMode {
    READ_NORMAL,
    READ_COMPLETE,
};

// 这个是实际从网络读的，没有缓存,最多也就是4096字节的tcp包里有12个字节冗余，其他非4096字节的包是没有冗余的
static int read_from_url(URLContext* url_ctx,
                         uint8_t* buf, int buf_size,
                         enum ReadFromURLMode mode,
                         PlayList* playlist) {
    int ret;

    if (mode == READ_COMPLETE)
        ret = ffurl_read_complete(url_ctx, buf, buf_size);
    else
        ret = ffurl_read(url_ctx, buf, buf_size);

    if (ret > 0) {
        add_bytes_read(playlist, ret);
        LasStatistic_on_bytes_downloaded(playlist->las_statistic, ret);
    }

    return ret;
}

static int url_block_read(URLContext* url_ctx, uint8_t* buf, int want_len, PlayList* playlist) {
    int offset = 0;
    int ret;

    int remain = want_len;
    while (remain > 0) {
        ret = read_from_url(url_ctx, buf + offset, remain, READ_NORMAL, playlist);
        if (ret <= 0) {
            if (ret < 0) {
                log_error("read_from_url fails: %s(0x%x)", av_err2str(ret), ret);
            } else {
                //ffurl_read means socket was closed by peer
                ret = LAS_ERROR_SOCKET_CLOSED_BY_PEER;
                log_error("read_from_url socket closed by peer");
            }
            return ret;
        }
        offset += ret;
        remain -= ret;
    }

    if (remain != 0) {
        log_error("block_read fail, remain:%d", remain);
        return -1;
    } else {
        return want_len;
    }
}

#pragma mark Gop
void GopReader_init(GopReader* reader, Representation* rep, AVFormatContext* s, PlayList* playlist) {
    memset(reader->realtimeUrl, 0, sizeof(reader->realtimeUrl));
    strcat(reader->realtimeUrl, rep->url);

    if (strstr(reader->realtimeUrl, "?") != NULL) {
        strcat(reader->realtimeUrl, "&");
    } else {
        strcat(reader->realtimeUrl, "?");
    }
    // Tag based
    char str_starttime[256] = "\0";
    sprintf(str_starttime, "startPts=%" PRId64, reader->last_gop_start_ts);
    strcat(reader->realtimeUrl, str_starttime);

    if (reader->is_audio_only) {
        strcat(reader->realtimeUrl, "&audioOnly=true");
    }
    reader->rep_index = rep->index;
    reader->parent = s;
    log_error("rep->index:%d, realtimeUrl:%s", rep->index, reader->realtimeUrl);
}

int GopReader_open_input(GopReader* reader, LasContext* c, PlayList* playlist) {
    AVDictionary* opts = NULL;
    int ret = 0;

    // broker prior HTTP options that should be consistent across requests
    av_dict_set(&opts, "user_agent", c->user_agent, 0);
    av_dict_set(&opts, "cookies", c->cookies, 0);
    av_dict_set(&opts, "headers", c->headers, 0);
    av_dict_set(&opts, "http_proxy", c->http_proxy, 0);
    av_dict_set(&opts, "seekable", "0", 0);

    LasStatistic_on_rep_http_url(c->playlist.las_statistic, reader->realtimeUrl);
    ret = open_url(c, &reader->input, reader->realtimeUrl, c->avio_opts, opts, playlist);

    av_dict_free(&opts);
    return ret;
}

void GopReader_close(GopReader* reader, PlayList* playlist) {
    if (reader->rep_index < 0) {
        return;
    }
    ffurl_closep(&reader->input);
    log_info("ffurl_closep(rep_index: %d)", reader->rep_index);
    reader->switch_index += 1;
}

static int PlayList_algo_statistic_thread(void* data);
int64_t GopReader_download_gop(GopReader* reader, MultiRateAdaption* adaption, PlayList* playlist) {
    LasContext* c = reader->parent->priv_data;

    uint8_t flv_header[FLV_HEADER_LEN + PRE_TAG_SIZE_LEN];

    int ret = -1;
    bool rep_changed = true;
    bool first_video_tag = true;
    int to_read;

    int64_t start_time = 0;
    int64_t http_open_time = 0;
    int64_t first_data_time = 0;  // got first tag time

    start_time = get_current_time_ms();
    LasStatistic_on_rep_http_start(playlist->las_statistic, start_time);
    LasStatistic_on_rep_http_first_data(playlist->las_statistic, 0);

    if (!reader->input) {
        ret = GopReader_open_input(reader, c, playlist);
        if (ret < 0) {
            return ret;
        }

        http_open_time = get_current_time_ms();
        LasStatistic_on_rep_http_open(playlist->las_statistic, http_open_time - start_time);

        memset(flv_header, 0, FLV_HEADER_LEN + PRE_TAG_SIZE_LEN);
        ret = url_block_read(reader->input, flv_header, FLV_HEADER_LEN + PRE_TAG_SIZE_LEN, playlist);
        LasStatistic_on_rep_flv_header(playlist->las_statistic, get_current_time_ms() - http_open_time);
        if (ret < 0) {
            return ret;
        }
    }

    // start algo update thread
    if (!playlist->algo_thread) {
        playlist->algo_thread = SDL_CreateThreadEx(&playlist->_algo_thread, PlayList_algo_statistic_thread, playlist, "playlist-algo-statistic-thread");
    }

    //las 2.0 Tag based reading
    uint8_t av_tag_header[AV_TAG_HEADER_LEN];
    int gop_duration = playlist->adaptationSet.duration;

    while (1) {
        if (playlist->read_abort_request || playlist->tag_queue.abort_request) {
            return LAS_ERROR_ABORT_BY_USER;
        }
        ret = playlist->error_code;
        if (ret < 0) {
            playlist->error_code = 0;
            return ret;
        }

        int request = las_get_audio_only_request(playlist->las_player_statistic);
        if (reader->is_audio_only != request) {
            reader->is_audio_only = request;
            int64_t current_playing_audio_ts = las_get_first_audio_packet_pts(playlist->las_player_statistic);
            log_info("current_playing_audio_ts: %lld", current_playing_audio_ts);
            int64_t request_ts = current_playing_audio_ts - playlist->adaptationSet.duration / 2;
            reader->last_gop_start_ts = request_ts > 0 ? request_ts : 0;
            return 0;
        }

        memset(av_tag_header, 0, AV_TAG_HEADER_LEN);
        to_read = AV_TAG_HEADER_LEN;
        ret = url_block_read(reader->input, av_tag_header, to_read, playlist);
        if (ret < 0) {
            return ret;
        }

        if (av_tag_header[0] == FLV_TAG_TYPE_VIDEO && ((av_tag_header[AV_TAG_HEADER_LEN - 5] >> 4) & 0x0F) == 1
            && av_tag_header[AV_TAG_HEADER_LEN - 4] == 1) {
            //IDR, switch edge
            uint32_t new_rep_start_pts = AV_RB24(av_tag_header + 4);
            new_rep_start_pts |= (unsigned)AV_RB8(av_tag_header + 7) << 24;
            uint32_t cts = (AV_RB24(av_tag_header + 13) + 0xff800000) ^ 0xff800000;
            new_rep_start_pts += cts;
            log_info("video key Frame, pts=%lld, parameters=0x%x, video packet_type=0x%x",
                     new_rep_start_pts, av_tag_header[AV_TAG_HEADER_LEN - 5], av_tag_header[AV_TAG_HEADER_LEN - 4]);
            if (!first_video_tag) {
                reader->last_gop_start_ts = new_rep_start_pts;
                adaption->next_expected_rep_index = NextRepresentationId(
                        adaption, las_get_switch_mode(playlist->las_player_statistic));
                if (reader->rep_index != adaption->next_expected_rep_index) {
                    LasStatistic_on_adaption_adapted(playlist, adaption);
                    LasStatistic_on_rep_switch_count(playlist->las_statistic, playlist);
                    return 0; // switch url
                }
            } else {
                first_video_tag = false;
                LasStatistic_on_rep_start_timestamp(playlist, new_rep_start_pts, reader->last_gop_start_ts);
            }
        }

        //av_malloc tag size, -1(av parameter bytes) + -1(video packet_type) + -3(CompositionTime) + 4(pre tag size)
        to_read = AV_RB24(av_tag_header + 1) - 1;

        FlvTag tag;
        memset(&tag, 0, sizeof(FlvTag));

        if (av_tag_header[0] == FLV_TAG_TYPE_VIDEO || av_tag_header[0] == FLV_TAG_TYPE_AUDIO) {
            tag.av_tag_ts = AV_RB24(av_tag_header + 4);
            tag.av_tag_ts |= (unsigned)AV_RB8(av_tag_header + 7) << 24;
            tag.type = av_tag_header[0];
        }

        int tag_size = 0;
        if (rep_changed)
            tag_size = to_read + AV_TAG_HEADER_LEN + FLV_HEADER_LEN + PRE_TAG_SIZE_LEN;
        else
            tag_size = to_read + AV_TAG_HEADER_LEN;

        ret = FlvTag_alloc_buffer(playlist, &tag, tag_size);
        if (ret) {
            return ret;
        }

        if (rep_changed) {
            memcpy(tag.buf + tag.buf_write_offset, flv_header, FLV_HEADER_LEN + PRE_TAG_SIZE_LEN);
            tag.buf_write_offset += FLV_HEADER_LEN + PRE_TAG_SIZE_LEN;
        }

        memcpy(tag.buf + tag.buf_write_offset, av_tag_header, AV_TAG_HEADER_LEN);
        tag.buf_write_offset += AV_TAG_HEADER_LEN;

        if (playlist->read_abort_request || playlist->tag_queue.abort_request) {
            FlvTag_dealloc(&tag);
            return LAS_ERROR_ABORT_BY_USER;
        }
        ret = url_block_read(reader->input, tag.buf + tag.buf_write_offset, to_read, playlist);
        if (ret < 0) {
            FlvTag_dealloc(&tag);
            return ret;
        } else {
            tag.buf_write_offset += to_read;
        }

        if (tag.buf_write_offset != tag.tag_size) {
            log_error("ERROR! tag.buf_write_offset(%d) != tag.tag_size(%d)", tag.buf_write_offset, tag.tag_size);
            FlvTag_dealloc(&tag);
            return LAS_ERROR_GET_WHOLE_TAG;
        }

        if (first_data_time == 0) {
            first_data_time = get_current_time_ms();
            LasStatistic_on_rep_http_first_data(playlist->las_statistic, first_data_time);
        }

        tag.rep_index = playlist->gop_reader.rep_index;
        tag.audio_only = playlist->gop_reader.is_audio_only;
        tag.switch_index = playlist->gop_reader.switch_index;

        TagQueue_put(&playlist->tag_queue, &tag);

        if (rep_changed) {
            rep_changed = false;
        }
    }
}


#pragma mark PlayList
static int PlayList_prepare_reading_tag(PlayList* playlist) {
    SDL_LockMutex(playlist->reading_tag_mutex);
    int ret = 0;
    if (FlvTag_has_consume_all_data_l(&playlist->reading_tag)) {
        FlvTag_dealloc(&playlist->reading_tag);
        SDL_UnlockMutex(playlist->reading_tag_mutex);

        FlvTag tag;
        ret = TagQueue_get(&playlist->tag_queue, &tag, 1);
        if (ret < 0) {
            log_error("TagQueue_get fail");
        } else {
            SDL_LockMutex(playlist->reading_tag_mutex);
            playlist->reading_tag = tag;
            SDL_UnlockMutex(playlist->reading_tag_mutex);
        }
        return ret;
    } else {
        SDL_UnlockMutex(playlist->reading_tag_mutex);
        return 0;
    }
}

static int PlayList_read_from_reading_tag(PlayList* playlist, uint8_t* buf, uint32_t buf_size) {
    SDL_LockMutex(playlist->reading_tag_mutex);
    int ret = FlvTag_get_data_from_buffer(playlist, &playlist->reading_tag, buf, buf_size);
    SDL_UnlockMutex(playlist->reading_tag_mutex);
    return ret;
}

static int PlayList_read_data(void* opaque, uint8_t* buf, int buf_size) {
    PlayList* playlist = opaque;
    int ret;

    ret = PlayList_prepare_reading_tag(playlist);
    if (ret < 0) {
        return ret;
    }

    if (playlist->reading_tag.switch_index != playlist->cur_switch_index) {
        return AVERROR_EOF;
    }

    ret = PlayList_read_from_reading_tag(playlist, buf, buf_size);
    if (ret < 0) {
        return ret;
    }

    return ret;
}

static void PlayList_reset_state(PlayList* p) {
    p->parent = NULL;
    p->read_buffer = NULL;
    p->cur_switch_index = 0;
    p->cur_rep_index = p->multi_rate_adaption.next_expected_rep_index;
}

static int PlayList_algo_statistic_thread(void* data) {
    PlayList* playlist = (PlayList*)data;
    TagQueue* tag_queue = &playlist->tag_queue;
    int64_t time_last = 0;
    int64_t time_now = 0;
    int64_t bytes_last = 0;
    int64_t bytes_now = 0;

    time_last = get_current_time_ms();
    bytes_last = get_bytes_read(playlist);

    while (!tag_queue->abort_request) {
        algo_cond_wait(playlist);
        if (tag_queue->abort_request || playlist->read_abort_request) {
            break;
        }
        time_now = get_current_time_ms();

        LasStatistic_on_buffer_time(playlist->las_statistic, playlist);
        bytes_now = get_bytes_read(playlist);

        log_debug("time_dur=%lld, bytes_read=%lld", time_now - time_last, bytes_now - bytes_last);

        OnStatisticInfo(&playlist->multi_rate_adaption,
                        playlist->las_statistic->cached_v_dur_ms,
                        playlist->las_statistic->cached_a_dur_ms,
                        (time_now - time_last > 0 ? time_now - time_last : 0),
                        (bytes_now - bytes_last > 0 ? bytes_now - bytes_last : 0));

        time_last = time_now;
        bytes_last = bytes_now;
        LasStatistic_on_bandwidth_update(playlist, &playlist->multi_rate_adaption);
    }

    return 0;
}

int PlayList_is_valid_index_l(PlayList* playlist, int index) {
    if (!playlist)
        return 0;
    return index >= 0 && index < playlist->adaptationSet.n_representation;
}

static int PlayList_read_thread(void* data) {
    PlayList* playlist = (PlayList*)data;
    log_info("Start las reading");

    AVFormatContext* s = playlist->outermost_ctx;
    GopReader* gop_reader = &playlist->gop_reader;
    TagQueue* tag_queue = &playlist->tag_queue;

    int64_t ret = 0;

    while (!tag_queue->abort_request) {
        // change GopReader if needed
        int new_index = playlist->multi_rate_adaption.next_expected_rep_index;
        if (!PlayList_is_valid_index_l(playlist, new_index)) {
            log_error("invalid rep index:%d, IGNORE!!!", new_index);
            break;
        }
        GopReader_close(gop_reader, playlist);
        Representation* rep = playlist->adaptationSet.representations[new_index];
        if (IsRepIgnored(playlist, rep)
            || ff_check_interrupt(&s->interrupt_callback)) {
            TagQueue_abort(&playlist->tag_queue);
            break;
        }
        GopReader_init(gop_reader, rep, s, playlist);
        ret = GopReader_download_gop(gop_reader, &playlist->multi_rate_adaption, playlist);
        if (ret < 0) {
            LasStatistic_on_rep_read_error(playlist->las_statistic, ret);
            rep->retry_cnt += 1;
            LasRetry(playlist, rep);
        }
    }

    if (playlist->algo_thread) {
        log_info("Signals algo_thread");
        algo_cond_signal(playlist);
    }

    if (gop_reader->input) {
        log_info("Calls GopReader_close");
        GopReader_close(gop_reader, playlist);
    }

    log_error("Thread is over, playlist->read_abort_request=%d, ret:%s(0x%x)", playlist->read_abort_request, av_err2str(ret), ret);
    return playlist->read_abort_request ? 0 : ret;
}

int PlayList_open_rep(PlayList* playlist, FlvTag* tag, AVFormatContext* s) {
    int ret = 0;
    Representation* rep = NULL;

    if (!PlayList_is_valid_index_l(playlist, tag->rep_index)) {
        ret = LAS_ERROR_INVALID_REP_INDEX;
        goto fail;
    }

    rep = playlist->adaptationSet.representations[tag->rep_index];
    if (!(playlist->ctx = avformat_alloc_context())) {
        ret = AVERROR(ENOMEM);
        goto fail;
    }

    playlist->read_buffer = av_malloc(INITIAL_BUFFER_SIZE);
    if (!playlist->read_buffer) {
        ret = AVERROR(ENOMEM);
        avformat_free_context(playlist->ctx);
        playlist->ctx = NULL;
        goto fail;
    }

    ffio_init_context(&playlist->pb, playlist->read_buffer, INITIAL_BUFFER_SIZE, 0, playlist,
                      PlayList_read_data, NULL, NULL);

    playlist->ctx->pb = &playlist->pb;
    playlist->ctx->flags |= s->flags & ~AVFMT_FLAG_CUSTOM_IO;

    SDL_LockMutex(playlist->rw_mutex);
    playlist->cur_switch_index = tag->switch_index;
    SDL_UnlockMutex(playlist->rw_mutex);

    playlist->ctx->fps_probe_size = 0;

    // fix me ,url should be read reading_gop 's url
    ret = avformat_open_input(&playlist->ctx, playlist->gop_reader.realtimeUrl, NULL, NULL);
    if (ret < 0) {
        if (playlist->read_thread && playlist->read_thread->retval) {
            log_error("PlayList_read_thread() already Fails!");
            ret = playlist->read_thread->retval;
        }
        log_error("avformat_open_input() ret:%s(0x%x)", av_err2str(ret), ret);
        goto fail;
    }

    ret = avformat_find_stream_info(playlist->ctx, NULL);
    if (ret < 0) {
        goto fail;
    }

    // transcoder_group used in current flv stream
    AVDictionaryEntry* tsc_group = av_dict_get(playlist->ctx->metadata, "tsc_group", NULL, 0);
    if (tsc_group && tsc_group->value) {
        av_dict_set(&playlist->outermost_ctx->metadata, "tsc_group", tsc_group->value, 0);
    }

    if (!playlist->is_stream_ever_opened) {
        // first inited, add streams to outermost AVFormatContext
        /* Create new AVStreams for each stream in this playlist */
        for (int j = 0; j < playlist->ctx->nb_streams; j++) {
            AVStream* st = avformat_new_stream(s, NULL);
            AVStream* ist = playlist->ctx->streams[j];
            if (!st) {
                ret = AVERROR(ENOMEM);
                goto fail;
            }

            st->id = 0;

            avcodec_parameters_copy(st->codecpar, playlist->ctx->streams[j]->codecpar);
            avpriv_set_pts_info(st, ist->pts_wrap_bits, ist->time_base.num, ist->time_base.den);
        }
        playlist->is_stream_ever_opened = true;
    } else {
        las_set_stream_reopened(playlist->las_player_statistic, true);
    }

    for (int j = 0; j < playlist->ctx->nb_streams && j < MAX_STREAM_NUM; j++) {
        AVCodecParameters* new_codec = playlist->ctx->streams[j]->codecpar;
        for (int k = 0; k < s->nb_streams; k++) {
            AVCodecParameters* old_codec = s->streams[k]->codecpar;
            if (new_codec->codec_type == old_codec->codec_type) {
                if (new_codec->codec_type == AVMEDIA_TYPE_VIDEO
                    && new_codec->codec_id != old_codec->codec_id
                    && !playlist->codec_change_enabled) {
                    log_error("codec changes from %d to %d", old_codec->codec_id, new_codec->codec_id);
                    LasIgnoreCodec(playlist, rep);
                    return 0;
                }
                playlist->stream_index_map[j] = k;
                break;
            }
        }
    }

    playlist->cur_rep_index = tag->rep_index;
    las_set_audio_only_response(playlist->las_player_statistic, tag->audio_only);
    log_info("open_index:%d, audio_only:%d finished", tag->rep_index, tag->audio_only);
    return 0;

fail:
    return ret;
}

int PlayList_open_read_thread(PlayList* playlist) {
    int ret;
    AVFormatContext* s = playlist->outermost_ctx;
    playlist->read_abort_request = 0;

    playlist->rw_mutex = SDL_CreateMutex();
    if (!playlist->rw_mutex) {
        log_error("SDL_CreateMutex playlist->rw_mutex fail");
        return LAS_ERROR_MUTEX_CREATE;
    }

    playlist->reading_tag_mutex = SDL_CreateMutex();
    if (!playlist->reading_tag_mutex) {
        log_error("SDL_CreateMutex playlist->reading_tag_mutex fail");
        return LAS_ERROR_MUTEX_CREATE;
    }

    playlist->las_mutex = SDL_CreateMutex();
    if (!playlist->las_mutex) {
        log_error("SDL_CreateMutex playlist->las_mutex fail");
        return LAS_ERROR_MUTEX_CREATE;
    }

    playlist->algo_cond = SDL_CreateCond();
    if (!playlist->algo_cond) {
        log_error("SDL_CreateCond playlist->algo_cond fail");
        return LAS_ERROR_COND_CREATE;
    }

    // init and start TagQueue
    TagQueue_init(playlist, &playlist->tag_queue);
    TagQueue_start(&playlist->tag_queue);

    // init GopReader
    playlist->gop_reader.switch_index = 0;
    playlist->gop_reader.rep_index = -1;
    playlist->gop_reader.last_gop_start_ts = (int)(playlist->multi_rate_adaption.buffer_init) * (-1);

    // start downloading thread
    playlist->read_thread = SDL_CreateThreadEx(&playlist->_read_thread, PlayList_read_thread, playlist, "playlist-read-thread");
    if (!playlist->read_thread) {
        log_error("SDL_CreateThreadEx fail");
        return LAS_ERROR_THREAD_CREATE;
    }

    if (playlist->read_thread->retval) {
        log_error("PlayList_read_thread() fails: %s(0x%x)", av_err2str(playlist->read_thread->retval), playlist->read_thread->retval);
        return playlist->read_thread->retval;
    }

    ret = PlayList_prepare_reading_tag(playlist);
    if (ret < 0) {
        return ret;
    }
    ret = PlayList_open_rep(playlist, &playlist->reading_tag, s);
    if (ret) {
        log_error("PlayList_open_rep() fails: %s(0x%x)", av_err2str(ret), ret);
        return ret;
    }


    return 0;
}
static void PlayList_abort(PlayList* playlist) {
    TagQueue_abort(&playlist->tag_queue);

    SDL_LockMutex(playlist->rw_mutex);
    playlist->read_abort_request = 1;
    SDL_UnlockMutex(playlist->rw_mutex);
}

void PlayList_close_rep(PlayList* playlist) {
    SDL_LockMutex(playlist->rw_mutex);
    avformat_close_input(&playlist->ctx);
    av_freep(&playlist->pb.buffer);
    log_info("close_index:%d finished", playlist->cur_rep_index);
    SDL_UnlockMutex(playlist->rw_mutex);
}

void PlayList_close_read_thread(PlayList* playlist) {
    // abort request
    if (playlist->rw_mutex) {
        PlayList_abort(playlist);
        PlayList_close_rep(playlist);
    }

    SDL_WaitThread(playlist->read_thread, NULL);
    playlist->read_thread = NULL;

    SDL_WaitThread(playlist->algo_thread, NULL);
    playlist->algo_thread = NULL;

    SDL_DestroyMutexP(&playlist->rw_mutex);
    SDL_DestroyMutexP(&playlist->reading_tag_mutex);
    SDL_DestroyMutexP(&playlist->las_mutex);
    TagQueue_destroy(&playlist->tag_queue);
    SDL_DestroyCondP(&playlist->algo_cond);
}


#pragma mark parser
void free_multi_rate_flv_context(PlayList* c) {
    if (!c)
        return;
    AdaptationSet* adaptationSetItem = &c->adaptationSet;
    for (int j = 0; j < adaptationSetItem->n_representation; j++) {
        if (adaptationSetItem->representations[j]) {
            av_freep(&adaptationSetItem->representations[j]);
        }
    }
}

static void dump_multi_rate_flv_context(PlayList* c) {
    if (!c)
        return;
    AdaptationSet* adaptationSetItem = &c->adaptationSet;
    for (int j = 0; j < adaptationSetItem->n_representation; j++) {
        Representation* representationItem = adaptationSetItem->representations[j];
        av_log(NULL, AV_LOG_DEBUG, "{\n");
        av_log(NULL, AV_LOG_DEBUG, "    id: %d \n", representationItem->id);
        av_log(NULL, AV_LOG_DEBUG, "    bitrate: %d \n", representationItem->bitrate);
        av_log(NULL, AV_LOG_DEBUG, "    url: \"%s\" \n", representationItem->url);
        av_log(NULL, AV_LOG_DEBUG, "}\n");
    }
}

static int parse_representation_set(Representation* c, cJSON* root) {
    int len = cJSON_GetArraySize(root);
    for (int i = 0; i < len; i++) {
        cJSON* child_json = cJSON_GetArrayItem(root, i);
        switch (child_json->type) {
            case cJSON_Number:
                if (!strcmp(child_json->string, "id")) {
                    c->id = (int)child_json->valuedouble;
                } else if (!strcmp(child_json->string, "maxBitrate")) {
                    c->bitrate = (int)child_json->valuedouble;
                }
                break;
            case cJSON_String:
                if (!strcmp(child_json->string, "url")) {
                    strcpy(c->url, child_json->valuestring);
                }
                break;
            case cJSON_NULL:
            case cJSON_True:
                if (!strcmp(child_json->string, "defaultSelected")) {
                    c->defaultSelected = 1;
                } else if (!strcmp(child_json->string, "disabledFromAdaptive")) {
                    c->disabledFromAdaptive = 1;
                }
                break;
            case cJSON_Array:
            case cJSON_Object:
            case cJSON_False:
                break;
        }
    }
    return 0;
}

static int parse_adaptation_set(AdaptationSet* c, cJSON* root) {
    int len = cJSON_GetArraySize(root);
    for (int i = 0; i < len; i++) {
        cJSON* child_json = cJSON_GetArrayItem(root, i);
        switch (child_json->type) {
            case cJSON_Number:
                if (!strcmp(child_json->string, "duration")) {
                    c->duration = (int)child_json->valuedouble;
                }
                break;
            case cJSON_Array:
                if (child_json->string && !strcmp(child_json->string, "representation")) {
                    int len = cJSON_GetArraySize(child_json);
                    for (int i = 0; i < len; i++) {
                        Representation* representationItem = NULL;
                        representationItem = av_mallocz(sizeof(Representation));
                        if (!representationItem) {
                            return -1;
                        }
                        c->representations[c->n_representation] = representationItem;
                        representationItem->index = c->n_representation;
                        representationItem->disabledFromAdaptive = 0;
                        representationItem->defaultSelected = 0;
                        representationItem->retry_cnt = 0;
                        c->n_representation++;

                        cJSON* root_json = cJSON_GetArrayItem(child_json, i);
                        parse_representation_set(representationItem, root_json);
                    }
                }
                break;
            case cJSON_False:
            case cJSON_True:
            case cJSON_String:
            case cJSON_NULL:
            case cJSON_Object:
                break;
        }
    }
    return 0;
}

int parse_root(char* file_name, PlayList* c) {
    cJSON* root = cJSON_Parse(file_name);
    if (!root)
        return LAS_ERROR_MANIFEST_JSON;
    if (cJSON_Object == root->type) {
        int len = cJSON_GetArraySize(root);
        for (int i = 0; i < len; i++) {
            cJSON* child_json = cJSON_GetArrayItem(root, i);
            switch (child_json->type) {
                case cJSON_Array:
                    if (child_json->string && !strcmp(child_json->string, "adaptationSet")) {
                        cJSON* adaptationSet = cJSON_GetArrayItem(child_json, 0);
                        if (adaptationSet) {
                            parse_adaptation_set(&c->adaptationSet, adaptationSet);
                        }
                    }
                    break;
                case cJSON_Number:
                case cJSON_String:
                case cJSON_NULL:
                case cJSON_False:
                case cJSON_True:
                case cJSON_Object:
                    break;
            }
            printf("\n");
        }
    }
    cJSON_Delete(root);
    dump_multi_rate_flv_context(c);
    return 0;
}

int parse_adapt_config(char* config_string, RateAdaptConfig* rate_config, PlayList* playlist) {
    LasPlayerStatistic* player_stat = playlist->las_player_statistic;
    cJSON* root = cJSON_Parse(config_string);
    if (!root)
        return LAS_ERROR_ADAPT_CONFIG_JSON;
    if (cJSON_Object == root->type) {
        int len = cJSON_GetArraySize(root);
        for (int i = 0; i < len; i++) {
            cJSON* child_json = cJSON_GetArrayItem(root, i);
            switch (child_json->type) {
                case cJSON_Number:
                    if (!strcmp(child_json->string, "buffer_init")) {
                        rate_config->buffer_init = child_json->valueint;
                    } else if (!strcmp(child_json->string, "switch_down_q")) {
                        rate_config->switch_down_q = child_json->valueint;
                    } else if (!strcmp(child_json->string, "switch_down_bw_frag")) {
                        rate_config->switch_down_bw_frag = child_json->valueint;
                    } else if (!strcmp(child_json->string, "switch_up_bw_frag")) {
                        rate_config->switch_up_bw_frag = child_json->valueint;
                    } else if (!strcmp(child_json->string, "switch_up_q")) {
                        rate_config->switch_up_q = child_json->valueint;
                    } else if (!strcmp(child_json->string, "switch_up_bw_frag1")) {
                        rate_config->switch_up_bw_frag1 = child_json->valueint;
                    } else if (!strcmp(child_json->string, "stable_buffer_diff")) {
                        rate_config->stable_buffer_diff = child_json->valueint;
                    } else if (!strcmp(child_json->string, "stable_buffer_cnt")) {
                        rate_config->stable_buffer_cnt = child_json->valueint;
                    } else if (!strcmp(child_json->string, "stable_buffer_switch_up_cnt")) {
                        rate_config->stable_buffer_switch_up_cnt = child_json->valueint;
                    } else if (!strcmp(child_json->string, "init_bitrate")) {
                        rate_config->init_bitrate = child_json->valueint;
                    } else if (!strcmp(child_json->string, "init_index")) {
                        rate_config->init_index = child_json->valueint;
                    } else if (!strcmp(child_json->string, "max_retry_cnt")) {
                        playlist->max_retry_cnt = child_json->valueint;
                    } else if (!strcmp(child_json->string, "frag_bw_window")) {
                        rate_config->frag_bw_window = child_json->valueint;
                    }
                    break;
                case cJSON_Object:
                case cJSON_False:
                case cJSON_NULL:
                case cJSON_Array:
                    break;
                case cJSON_True:
                    if (!strcmp(child_json->string, "codec_change_enabled")) {
                        playlist->codec_change_enabled = true;
                    }
                    break;
            }
        }
    }
    cJSON_Delete(root);
    return 0;
}

static int parse_int_from(cJSON* json, const char* key) {
    cJSON* entry = cJSON_GetObjectItemCaseSensitive(json, key);
    if (cJSON_IsNumber(entry)) {
        return entry->valueint;
    }
    return 0;
}

int parse_abr_history_data(char* state_string, HisState* state) {
    cJSON* root = cJSON_Parse(state_string);
    if (!root)
        return LAS_ERROR_ADAPT_CONFIG_JSON;
    cJSON* data_list = cJSON_GetObjectItemCaseSensitive(root, "data_list");
    if (!data_list)
        return LAS_ERROR_ABR_HISTORY_DATA_JSON;
    int len = cJSON_GetArraySize(data_list);
    for (int i = 0; i < len; i++) {
        cJSON* child_json = cJSON_GetArrayItem(data_list, i);
        cJSON* net_state = cJSON_GetObjectItemCaseSensitive(child_json, "net_type");
        if (cJSON_IsNumber(net_state) && net_state->valueint == state->net_type) {
            state->short_term_throughput = parse_int_from(child_json, "short_bw");
            state->long_term_throughput = parse_int_from(child_json, "long_bw");
            break;
        }
    }
    cJSON_Delete(root);
    return 0;
}

#pragma mark las
static int las_close(AVFormatContext* s) {
    LasContext* c = s->priv_data;
    PlayList* playlist = &c->playlist;
    PlayList_close_read_thread(playlist);
    free_multi_rate_flv_context(playlist);
    av_freep(&c->user_agent);
    av_freep(&c->cookies);
    av_freep(&c->headers);
    av_freep(&c->server_ip);
    av_freep(&c->manifest_string);
    av_freep(&c->liveAdaptConfig);
    av_dict_free(&c->avio_opts);
    return 0;
}

static int las_probe(AVProbeData* p) {
    if (p->filename && strstr(p->filename, ".las"))
        return AVPROBE_SCORE_MAX;

    return 0;
}

static int las_read_header(AVFormatContext* s) {
    // for debug
#ifdef __ANDROID__
    pthread_setname_np(pthread_self(), "ffplay_read_thread");
#elif defined(__APPLE__)
    pthread_setname_np("ffplay_read_thread");
#endif

    LasContext* c = s->priv_data;
    PlayList* playlist = &c->playlist;
    RateAdaptConfig rate_adapt_config;
    HisState his_state;
    AVDictionaryEntry* entry;
    int ret = 0;

    c->ctx = s;
    c->interrupt_callback = &s->interrupt_callback;
    c->server_ip = NULL;
    playlist->session_id = c->session_id;

    av_dict_set(&c->avio_opts, "timeout", "10000000", 0);

    if ((ret = parse_root(c->manifest_string, playlist)) < 0) {
        log_error("Illegal manifest Json String");
        goto fail;
    }
    log_info("Finish parsing las manifest (player)");

    memset(&his_state, 0, sizeof(HisState));
    his_state.net_type = c->network;
    if (parse_abr_history_data(c->abr_history_data, &his_state) < 0) {
        log_error("Illegal abr_history_data Json String");
    }

    playlist->las_player_statistic = (LasPlayerStatistic*)c->las_player_statistic;
    if (playlist->las_player_statistic) {
        playlist->las_statistic = &playlist->las_player_statistic->las_stat;
        log_info("playlist->stat: %p, las_statistic: %p", playlist->las_player_statistic, playlist->las_statistic);
    } else {
        log_error("las_player_statistic is null");
        goto fail;
    }
    LasStatistic_init(playlist->las_statistic, playlist);

    RateAdaptConfig_default_init(&rate_adapt_config, playlist);
    if (parse_adapt_config(c->liveAdaptConfig, &rate_adapt_config, playlist) < 0) {
        log_error("Illegal adaptation Configure Json String");
    }
    playlist->outermost_ctx = s;
    MultiRateAdaption_init(&playlist->multi_rate_adaption, rate_adapt_config, his_state, playlist);
    PlayList_reset_state(playlist);
    ret = PlayList_open_read_thread(playlist);
    if (ret  != 0) {
        goto fail;
    }
    return ret;

fail:
    las_close(s);
    return ret == 0 ? 0 : AVERROR_EOF;
}

/*
 * Used to reset a statically allocated AVPacket to a clean slate,
 * containing no data.
 */
static void reset_packet(AVPacket* pkt) {
    if (pkt) {
        av_init_packet(pkt);
        pkt->data = NULL;
    }
}

static int las_read_packet(AVFormatContext* s, AVPacket* pkt) {
    LasContext* c = s->priv_data;
    PlayList* playlist = &c->playlist;
    int ret = 0;

    while (1) {
        if (!playlist->ctx) {
            log_error("playlist->ctx is null");
            ret = AVERROR_EOF;
            goto fail;
        }
        ret = av_read_frame(playlist->ctx, &playlist->pkt);
        if (ret < 0) {
            reset_packet(&playlist->pkt);
            if (avio_feof(&playlist->pb) || ret == AVERROR_EOF) {
                // change rep if needed
                if (playlist->cur_switch_index != playlist->reading_tag.switch_index) {
                    PlayList_close_rep(playlist);
                    PlayList_open_rep(playlist, &playlist->reading_tag, s);
                    continue;
                }
            }
            break;
        } else if (!playlist->pkt.data) {
            // success, but no packet data yet
            continue;
        } else {
            // go packet
            *pkt = playlist->pkt;
            break;
        }
    }
    reset_packet(&playlist->pkt);

    if (pkt->stream_index >= 0 && pkt->stream_index < MAX_STREAM_NUM) {
        pkt->stream_index = playlist->stream_index_map[pkt->stream_index];
    }

    LasStatistic_on_read_packet(playlist->las_statistic, playlist);

fail:
    if (ret != 0) {
        log_error("ret:%s(0x%x), will return AVERROR_EOF", av_err2str(ret), ret);
    }
    return ret == 0 ? 0 : AVERROR_EOF;
}

static int las_read_seek(AVFormatContext* s, int stream_index,
                          int64_t timestamp, int flags) {
//    LasContext *c = s->priv_data;
    return 0;
}

#define OFFSET(x) offsetof(LasContext, x)
#define FLAGS AV_OPT_FLAG_DECODING_PARAM
static const AVOption las_options[] = {
    {
        "user-agent", "user agent",
        OFFSET(user_agent), AV_OPT_TYPE_STRING, { .str = NULL }, CHAR_MIN, CHAR_MAX, FLAGS
    },
    {
        "headers", "headers",
        OFFSET(headers), AV_OPT_TYPE_STRING, { .str = NULL }, CHAR_MIN, CHAR_MAX, FLAGS
    },
    {
        "manifest_string", "manifest_string",
        OFFSET(manifest_string), AV_OPT_TYPE_STRING, { .str = NULL }, CHAR_MIN, CHAR_MAX, FLAGS
    },
    {
        "abr_history_data", "abr_history_data",
        OFFSET(abr_history_data), AV_OPT_TYPE_STRING, { .str = NULL }, CHAR_MIN, CHAR_MAX, FLAGS
    },
    {
        "device-network-type", "device-network-type",
        OFFSET(network), AV_OPT_TYPE_INT64, {.i64 = 0}, 0, INT64_MAX, FLAGS
    },
    {
        "las_player_statistic", "las_player_statistic",
        OFFSET(las_player_statistic), AV_OPT_TYPE_INT64, {.i64 = 0}, INT64_MIN, INT64_MAX, FLAGS
    },
    {
        "liveAdaptConfig", "liveAdaptConfig",
        OFFSET(liveAdaptConfig), AV_OPT_TYPE_STRING, { .str = NULL }, CHAR_MIN, CHAR_MAX, FLAGS
    },
    {
        "session_id", "session_id",
        OFFSET(session_id), AV_OPT_TYPE_INT, {.i64 = 0}, INT32_MIN, INT32_MAX, FLAGS
    },
    {NULL}
};

static const AVClass las_class = {
    .class_name = "las",
    .item_name  = av_default_item_name,
    .option     = las_options,
    .version    = LIBAVUTIL_VERSION_INT,
};

AVInputFormat ijkff_las_demuxer = {
    .name           = "las",
    .long_name      = "Live Adaptive Streaming",
    .priv_class     = &las_class,
    .priv_data_size = sizeof(LasContext),
    .read_probe     = las_probe,
    .read_header    = las_read_header,
    .read_packet    = las_read_packet,
    .read_close     = las_close,
    .read_seek      = las_read_seek,
    .extensions     = "las",
    .flags          = AVFMT_NOFILE
};


