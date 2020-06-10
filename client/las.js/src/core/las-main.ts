/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:39:26 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:40:09
 * 处理las.js协议及flv流
 */
import { EventEmitter } from 'events';
import work from 'webworkify-webpack';
import { abrGetUrl } from '../abr/abr-get-url';
import { AbrManifest } from '../abr/abr-manifest';
import Multirate from '../abr/multirate';
import FlvDemuxerInline from '../demux/flv/flv-demuxer-inline';
import FlvPreprocessor from '../demux/flv/flv-preprocessor';
import Loader from '../io/loader';
import { LasMainConfig, SmoothLevelSwitchInfo } from '../types/core';
import { FlvTag } from '../types/flv-object';
import { ILoader, ILoaderCallback, ILoaderConfig, ILoaderContext } from '../types/io';
import { MP4RemuxResult } from '../types/remux';
import { Log } from '../utils/log';
import { ErrorData, ErrorDetails, ErrorTypes } from './errors';
import LasEvents from './events';
import Media from './media';
import { REPORT_TYPES } from './report-types';
import { WorkerCmd } from './worker-cmd';

const URL_REG = new RegExp('^(http|https)://');

/**
 * flv视频流处理
 */
const tag = 'LasMain';
export default class LasMain extends EventEmitter {
    private _config: LasMainConfig;
    private _media: Media;
    private _w?: Worker;
    private _flv?: FlvDemuxerInline;
    private _eventEmitter: EventEmitter;

    private _loader?: Loader<ILoaderContext>;
    private _loaderConf: ILoaderConfig;
    private _loaderCallbacks: ILoaderCallback<ILoaderContext>;
    private _multirate?: Multirate;
    private _isContinuous: boolean;
    private _remuxId: number;
    private _baseTimeSec: number = 0;
    private _tagDump: FlvPreprocessor<SmoothLevelSwitchInfo>;
    private _currentUrl?: any;
    private _isAbr: boolean = false;
    private _progressTime: number = 0;
    private _src: any;
    private _audioCodec: string = '';

    /**
     * 传入配置并初始化
     * @param config 配置信息
     * @param media Media
     */
    constructor(config: LasMainConfig, media: Media) {
        super();
        this._config = config;
        this._media = media;

        this._loaderConf = {
            connectionTimeout: this._config.connectionTimeout,
            transmissionTimeout: this._config.transmissionTimeout,
            maxRetry: 0,
            retryDelay: 0,
            useFetch: true
        };
        this._loaderCallbacks = {
            onProgress: this._onLoaderProgress,
            onError: this._onLoaderError,
            onEnd: this._onLoaderEnd,
            onAbort: this._onLoaderAbort
        };
        this._isContinuous = false;
        this._remuxId = 1;

        const eventEmitter = (this._eventEmitter = new EventEmitter());
        eventEmitter.on(LasEvents.MEDIA_INFO, data => { this._onEvent(LasEvents.MEDIA_INFO, data) });
        eventEmitter.on(LasEvents.SCRIPT_PARSED, data => { this._onEvent(LasEvents.SCRIPT_PARSED, data) });
        eventEmitter.on(LasEvents.MANIFEST_PARSED, data => { this._onEvent(LasEvents.MANIFEST_PARSED, data) });
        eventEmitter.on(LasEvents.MP4_SEGMENT, data => { this._onEvent(LasEvents.MP4_SEGMENT, data) });
        eventEmitter.on(LasEvents.ERROR, data => { this._onEvent(LasEvents.ERROR, data) });
        eventEmitter.on(LasEvents.FLV_HEAD, data => { this._onEvent(LasEvents.FLV_HEAD, data) });

        this._tagDump = new FlvPreprocessor(this._eventEmitter, this._flvKeyframeCallback);
        if (this._config.webWorker) {
            Log.i(tag, 'webWorker');
            this._w = work(require.resolve('../demux/flv/flv-demuxer-worker'));
            if (this._w) {
                this._w.addEventListener('message', this._onWorkerEvent);
                this._w.postMessage({
                    cmd: WorkerCmd.INIT,
                    config: this._config,
                    data: { remuxId: this._remuxId }
                });
                return;
            }
        }
        this._flv = new FlvDemuxerInline(eventEmitter, this._config, { remuxId: this._remuxId });
        this._flv.init();
    }

    /**
     * 初始化
     * @param src manifest/播放url
     */
    public init(src: any, audioCodec: string = ''): void {
        this._src = src;
        this._audioCodec = audioCodec;
        if (typeof src === 'string' && !URL_REG.test(src)) {
            try {
                this._src = JSON.parse(src);
            } catch (e) {
                this.emit(LasEvents.ERROR, {
                    type: ErrorTypes.OTHER_ERROR,
                    details: ErrorDetails.MANIFEST_ERROR,
                    fatal: true,
                    info: {
                        reason: 'manifest parse error'
                    }
                });
                return;
            }
        }
        if (this._src) {
            if (AbrManifest.verify(this._src)) {
                this._isAbr = true;
            }
        } else {
            this.emit(LasEvents.ERROR, {
                type: ErrorTypes.OTHER_ERROR,
                details: ErrorDetails.MANIFEST_ERROR,
                fatal: true,
                info: {
                    reason: 'src empty'
                }
            });
            return;
        }
        if (this._isAbr && !this._multirate) {
            this._multirate = new Multirate(this._eventEmitter, this._config, this._media, this._src);
            this._multirate.init();
        }
    }

    /**
     * 开始加载
     */
    public load(): void {
        let mr = this._multirate;
        if (mr) {
            let data = mr.levels[mr.currentLevel];
            if (data) {
                this._load(abrGetUrl(data.url, this._config.defaultLiveDelay), mr.currentLevel);
            } else {
                this.emit(LasEvents.ERROR, {
                    type: ErrorTypes.OTHER_ERROR,
                    details: ErrorDetails.MANIFEST_ERROR,
                    fatal: true,
                    info: {
                        reason: 'manifest parse error'
                    }
                });
            }
        } else {
            this._load(this._src);
        }
    }

    /**
     * 销毁
     */
    public destroy(): void {
        this._destroyLoader();
        if (this._w) {
            this._w.postMessage({ cmd: WorkerCmd.DESTROY });
            this._w.removeEventListener('message', this._onWorkerEvent);
            this._w.terminate();
        }
        if (this._flv) {
            this._flv.destroy();
            this._flv = undefined;
        }

        if (this._multirate) {
            this._multirate.destory();
        }

        const eventEmitter = this._eventEmitter;
        if (eventEmitter) {
            eventEmitter.removeAllListeners();
        }
    }

    /**
     * 自动码率是否是开启状态
     */
    public get autoLevelEnabled(): boolean {
        if (this._multirate) {
            return this._multirate.autoLevelEnabled;
        }
        return false;
    }

    /**
     * 返回多路流列表
     */
    public get levels() {
        if (this._multirate) {
            return this._multirate.levels;
        }
        return [];
    }

    /**
     * 即将切换的level index
     */
    public get nextLevel(): number {
        if (this._multirate) {
            return this._multirate.nextLevel;
        }
        return 0;
    }

    /**
     * 平滑切换清晰度，在关键帧位置切换
     */
    public set nextLevel(value: number) {
        const mr = this._multirate;
        if (mr) {
            mr.nextLevel = value;
        }
    }

    /**
     * 当前正在加载的level index
     */
    public get currentLevel(): number {
        if (this._multirate) {
            return this._multirate.currentLevel;
        }
        return 0;
    }

    /**
     * 立即切换清晰度，丢弃现有数据，重新拉指定index的流
     */
    public set currentLevel(value: number) {
        const mr = this._multirate;
        if (mr) {
            let load = value >= 0 || value !== mr.currentLevel;
            mr.currentLevel = value;
            const data = mr.levels[mr.currentLevel];
            if (load && data) {
                this._currentUrl = abrGetUrl(data.url, this._config.defaultLiveDelay);
                this._refreshRemuxId();
                this._isContinuous = false;
                if (this._tagDump) {
                    this._tagDump.reset();
                }
                this._baseTimeSec = this._media.currentTime;
                this.emit(LasEvents.LEVEL_SWITCHING, { level: mr.currentLevel, startSec: this._baseTimeSec, smooth: false });
                this._load(this._currentUrl, mr.currentLevel);
            }
        }
    }

    /**
     * worker通信
     * @param ev worker返回数据
     */
    private _onWorkerEvent = (ev: any) => {
        const data = ev.data;
        this._onEvent(data.event, data.data);
    }

    /**
     * 关键帧位置处理
     * 自动码率需要在关键帧位置进行切换，返回算法判断结果
     */
    private _flvKeyframeCallback = (timestamp: number): SmoothLevelSwitchInfo | undefined => {
        if (!this._media.hasStreamTime) {
            this._media.updateStreamTime(timestamp / 1000, 0);
        }
        return this._multirate ? this._multirate.onKeyFrame(timestamp) : undefined;
    }

    /**
     * 处理message事件
     */
    private _onEvent = (ev: string, data: any): void => {
        switch (ev) {
            case LasEvents.FLV_HEAD:
                if (this._w) {
                    this._w.postMessage({ cmd: WorkerCmd.FLV_HEAD, hasAudio: data.hasAudio, hasVideo: data.hasVideo });
                } else if (this._flv) {
                    this._flv.flvHead(data.hasAudio, data.hasVideo);
                }
                break;
            case LasEvents.MEDIA_INFO:
                this.emit(LasEvents.MEDIA_INFO, data);
                break;
            case LasEvents.MP4_SEGMENT:
                {
                    let mp4Data = data as MP4RemuxResult;
                    if (mp4Data.extra && mp4Data.extra.remuxId !== this._remuxId) {
                        // 过期，丢弃
                        break;
                    }
                    mp4Data.segments.forEach(segment => {
                        if (segment.type === 'audio' && segment.startDTS > this._baseTimeSec) {
                            this._media.updateStreamTime(segment.streamDTS, segment.startDTS);
                        }
                    });
                    this.emit(LasEvents.MP4_SEGMENT, mp4Data);
                }
                break;
            default:
                // SCRIPT_PARSED ERROR END
                this.emit(ev, data);
                break;
        }
    }

    private _destroyLoader() {
        if (this._loader) {
            this._loader.destroy();
            this._loader = undefined;
        }
    }

    /**
     * 开始下载流
     * @param url flv地址
     * @param index level index
     */
    private _load(url: string, index: number = 0): void {
        this._destroyLoader();
        if (this._multirate) {
            this._multirate.onLevelLoad(index);
        }
        this._currentUrl = url;
        let level = this.levels[index];
        if (level) {
            this._updateCodecs(this._audioCodec || level.audioCodec, level.videoCodec);
        }

        this.emit(LasEvents.REPORT, {
            type: REPORT_TYPES.START_LOAD_STREAM,
            url,
            sync: this._baseTimeSec,
            index: index,
            bitrate: level ? level.bitrate : 0
        });
        if (!this._loader) {
            this._loader = new Loader();
        }
        const context = {
            url,
            progress: true,
            responseType: 'arraybuffer',
            credentials: this._config.credentials
        };
        if (this._loader instanceof Loader) {
            this._loader.load(context, this._loaderCallbacks, this._loaderConf);
        }
    }

    /**
     * 读取的flv tag数据传入worker进行解封装、封装操作
     * @param tags 读取的flv tag数据
     * @param timeOffset 时间偏移
     * @param isContinuous 继续remux的时间戳进行处理
     */
    private _append(
        tags: FlvTag[],
        timeOffset: number,
        isContinuous: boolean,
    ): void {
        if (this._w) {
            this._w.postMessage({
                cmd: WorkerCmd.APPEND_DATA,
                tags,
                timeOffset: timeOffset || 0,
                isContinuous
            });
        } else if (this._flv) {
            this._flv.append(tags, timeOffset || 0, isContinuous);
        }
    }

    private _updateCodecs(audioCodec: string = '', videoCodec: string = ''): void {
        if (this._w) {
            this._w.postMessage({
                cmd: WorkerCmd.SET_CODECS,
                audioCodec, videoCodec
            });
        } else if (this._flv) {
            this._flv.setCodecs(audioCodec, videoCodec);
        }
    }

    /**
     * 下载数据progress处理
     * @param context 下载器上下文
     * @param data 下载数据
     * @param stats 下载器状态数据
     */
    private _onLoaderProgress = (target: ILoader<ILoaderContext>, data: string | ArrayBuffer): void => {
        if (!(data instanceof ArrayBuffer)) {
            return;
        }
        if (this._multirate) {
            this._multirate.onLoaderChunk(data.byteLength);
        }
        this.emit(LasEvents.REPORT, {
            type: REPORT_TYPES.LOADER_CHUNK_ARRIVAL,
            byteLength: data.byteLength,
            timeCost: performance.now() - this._progressTime || target.stats.requestStartTime,
            header: target.context.responseHeader
        });
        this._progressTime = performance.now();
        const result = this._tagDump.processing(data);
        this._append(result.list, this._baseTimeSec, this._isContinuous);
        this._isContinuous = true;

        // 是否需要切换
        if (result.callbackResult) {
            if (this._tagDump) {
                this._tagDump.reset();
            }
            this._baseTimeSec = result.callbackResult.timestamp ? this._media.getLocalTime(result.callbackResult.timestamp / 1000) || 0 : 0;
            // 平滑切换
            this.emit(LasEvents.LEVEL_SWITCHING, { level: result.callbackResult.level, startSec: this._baseTimeSec, smooth: true });
            this._load(result.callbackResult.url, result.callbackResult.level);
        }
    }

    private _onLoaderAbort = (): void => { }

    /**
     * 下载器错误处理
     * @param context 下载器上下文
     * @param status 下载器状态
     */
    private _onLoaderError = (target: ILoader<ILoaderContext>): void => {
        if (!target.stats.fatalError) {
            return;
        }
        const errInfo: ErrorData = {
            type: ErrorTypes.NETWORK_ERROR,
            details: target.stats.errorMessage === 'timeout' ? ErrorDetails.LOAD_ERROR_TIMEOUT : ErrorDetails.LOAD_ERROR,
            fatal: true,
            info: {
                url: target.context.url,
                httpStatusCode: target.stats.httpStatusCode,
                reason: target.stats.errorMessage
            }
        };
        this.emit(LasEvents.ERROR, errInfo);
    }

    /**
     * 下载完成处理
     */
    private _onLoaderEnd = (): void => {
        if (this._w) {
            this._w.postMessage({ cmd: WorkerCmd.LOAD_END });
        } else if (this._flv) {
            this._flv.end();
        }
    }

    /**
     * 处理worker中的过期数据
     */
    private _refreshRemuxId(): void {
        this._remuxId++;
        const data = { remuxId: this._remuxId };
        if (this._w) {
            this._w.postMessage({ cmd: WorkerCmd.SET_EXTRA, data: data });
        } else if (this._flv) {
            this._flv.setExtra(data);
        }
    }
}
