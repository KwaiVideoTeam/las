/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:48:19 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 15:24:01
 * 整理音视频数据用于生成fragmented mp4
 */
import { EventEmitter } from 'events';
import { ErrorDetails, ErrorTypes } from '../core/errors';
import LasEvents from '../core/events';
import { LasMainConfig } from '../types/core';
import { AudioSample, AudioTrack, MP4AudioSample, MP4VideoSample, TrackType, VideoSample, VideoTrack, MP4Segment } from '../types/remux';
import { AAC_SAMPLE_DURATION, getAACFrameDuration, getAACSilentFrame } from '../utils/aac-helper';
import { Log } from '../utils/log';
import MP4 from './mp4-generator';

// 100 seconds
const MAX_FILL_FRAME_DURATION = 100 * 1000;

const DEFAULT_VIDEO_SAMPLE_DURATION = 40;

type VideoTimeReferenceInfo = { track: VideoTrack; sample?: VideoSample };

class MP4Remuxer {
    private tag = 'MP4Remuxer';
    private _eventEmitter: EventEmitter;
    private _forceFirstIDR: boolean;
    private _videoTimeReference: boolean;
    private _videoTimeReferenceInfo: VideoTimeReferenceInfo;
    private _extra: any;

    private _nextAudioPTS?: number;
    private _nextVideoDTS?: number;
    private _initPTS?: number;
    private _videoLastPTS: number = 0;
    private _audioLastPTS: number = 0;
    private _videoSampleDuration: number = DEFAULT_VIDEO_SAMPLE_DURATION;
    private _moovs?: Partial<Record<TrackType, Uint8Array>>;

    constructor(eventEmitter: EventEmitter, config: LasMainConfig) {
        this._eventEmitter = eventEmitter;
        this._videoTimeReference = !config.gopRemux;
        // 计算平均sampleDuration
        this._videoTimeReferenceInfo = <VideoTimeReferenceInfo>{};
        this._forceFirstIDR = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    }

    public resetMoov(): void {
        this._moovs = undefined;
        this._clearVideoTimeReference();
    }

    public setExtra(data: any) {
        this._extra = data;
    }

    public resetTimeStamp() {
        this._initPTS = undefined;
        this._audioLastPTS = this._videoLastPTS = 0;
    }

    public getLastPTS() {
        return { video: this._videoLastPTS, audio: this._audioLastPTS };
    }

    public flush() {
        let videoData;
        const info = this._videoTimeReferenceInfo;
        if (this._videoTimeReference && info.sample) {
            info.track.samples = [info.sample];
            info.track.sequenceNumber++;
            info.sample = undefined;
            videoData = this._remuxVideo(info.track, true, false);
        }
        this._clearVideoTimeReference();
        return videoData;
    }

    public remux(audioTrack: AudioTrack, videoTrack: VideoTrack, timeOffset: number, isContinuous: boolean, isFlush: boolean = false) {
        if (!this._moovs) {
            this._initMP4(audioTrack, videoTrack, timeOffset);
        }
        if (this._moovs) {
            let audioData: MP4Segment | undefined;
            let videoData: MP4Segment | undefined;
            if (audioTrack.samples.length && videoTrack.samples.length) {
                if (!isContinuous) {
                    // 起始位置音视频不对齐，音频开始时间小于视频开始时间，填帧
                    if (audioTrack.samples[0].pts < videoTrack.samples[0].pts) {
                        const sample = Object.assign({}, videoTrack.samples[0]);
                        sample.dts = sample.pts = audioTrack.samples[0].pts;
                        videoTrack.samples.unshift(sample);
                    }
                }
            }

            // 兼容safari
            if (!isContinuous && videoTrack.samples.length) {
                videoTrack.samples[0].pts = videoTrack.samples[0].dts;
            }

            audioData = this._remuxAudio(audioTrack, isContinuous);
            videoData = this._remuxVideo(videoTrack, isContinuous, !isFlush);
            if (!videoData && isFlush && this._videoTimeReferenceInfo.sample) {
                videoData = this.flush();
            }

            if (videoData && !audioData && audioTrack.codec) {
                audioData = this._fillEmptyAudio(audioTrack, isContinuous, videoData.startPTS, videoData.endPTS, videoData.streamDTS);
            }

            const segments = [];
            if (audioData) {
                segments.push(audioData);
            }
            if (videoData) {
                segments.push(videoData);
            }
            if (segments.length) {
                this._eventEmitter.emit(LasEvents.MP4_SEGMENT, { segments, extra: this._extra });
            }
        }
    }

    /**
     * 初始化mp4，生成moov，获取mediainfo
     * @param audioTrack 音频track
     * @param videoTrack 视频track
     * @param timeOffset 时间偏移量
     */
    private _initMP4(audioTrack: AudioTrack, videoTrack: VideoTrack, timeOffset: number): void {
        const eventEmitter = this._eventEmitter,
            audioSamples = audioTrack.samples,
            videoSamples = videoTrack.samples,
            mediaInfo: any = {},
            moovs: Partial<Record<TrackType, Uint8Array>> = {};
        let initPTS;

        if (audioTrack.config && audioSamples.length) {
            audioTrack.timescale = audioTrack.samplerate;
            moovs.audio = MP4.moov([audioTrack]);
            mediaInfo.audioCodec = audioTrack.codec;
            mediaInfo.channelCount = audioTrack.channelCount;
            mediaInfo.audioSampleRate = audioTrack.samplerate;
            mediaInfo.hasAudio = true;
            mediaInfo.defaultAudioCodec = audioTrack.defaultCodec

            initPTS = audioSamples[0].pts - audioTrack.inputTimescale * timeOffset;
        }

        if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
            const inputTimeScale = videoTrack.inputTimescale;
            videoTrack.timescale = inputTimeScale;
            moovs.video = MP4.moov([videoTrack]);
            mediaInfo.videoCodec = videoTrack.codec;
            mediaInfo.width = videoTrack.width;
            mediaInfo.height = videoTrack.height;
            mediaInfo.fps = videoTrack.fps;
            mediaInfo.profile = videoTrack.profile;
            mediaInfo.level = videoTrack.level;
            mediaInfo.chromaFormat = videoTrack.chromaFormat;
            mediaInfo.hasVideo = true;

            let videoInitPTS = videoSamples[0].pts - inputTimeScale * timeOffset;
            let videoInitDTS = videoSamples[0].dts - inputTimeScale * timeOffset;

            initPTS = initPTS ? Math.min(initPTS, videoInitDTS) : videoInitPTS;
        }

        if (mediaInfo.hasAudio || mediaInfo.hasVideo) {
            if (typeof this._initPTS === 'undefined') {
                this._initPTS = initPTS;
            }
            this._moovs = moovs;
            eventEmitter.emit(LasEvents.MEDIA_INFO, mediaInfo);
        } else {
            eventEmitter.emit(LasEvents.ERROR, {
                type: ErrorTypes.MUX_ERROR,
                details: ErrorDetails.DEMUX_ERROR,
                fatal: false,
                info: {
                    reason: 'no audio/video samples found'
                }
            });
        }
    }

    /**
     * remux视频数据
     * 输出fmp4数据
     * @param track VideoTrack
     * @param isContinuous 数据是否连续
     * @param activeTimeReference 是否开启视频帧时间参考功能
     */
    private _remuxVideo(track: VideoTrack, isContinuous: boolean, activeTimeReference: boolean = true): MP4Segment | undefined {
        if (!track.samples.length) {
            return;
        }
        const initPTS = this._initPTS;
        let timescale = track.timescale,
            samples = track.samples as VideoSample[],
            sampleDuration = 0,
            samplesCount = samples.length,
            mp4Samples: MP4VideoSample[] = [],
            nextVideoDTS = this._nextVideoDTS;
        if (typeof initPTS === 'undefined' || samplesCount === 0 || timescale === 0) {
            return;
        }

        if (!isContinuous || typeof nextVideoDTS === 'undefined') {
            nextVideoDTS = samples[0].dts;
        }
        // 处理offset
        samples.forEach((sample) => {
            sample.pts = sample.pts - initPTS;
            sample.dts = sample.dts - initPTS;
        });

        // dts递增
        samples.sort((a, b) => {
            return a.dts - b.dts || a.pts - b.pts;
        });

        // 删除最后一个sample并缓存，用于计算remux最后一个sampleDuration
        if (this._videoTimeReference) {
            this._videoTimeReferenceInfo.track = track;
            if (this._videoTimeReferenceInfo.sample) {
                samplesCount++;
                samples.unshift(this._videoTimeReferenceInfo.sample);
                this._videoTimeReferenceInfo.sample = undefined;
            }
            if (samples.length > 1 && activeTimeReference) {
                this._videoTimeReferenceInfo.sample = samples.pop();
                samplesCount--;
            }
        }

        // 计算调整首个sample时间戳
        let sample = samples[0];
        let firstDTS = Math.max(sample.dts, 0);
        let firstPTS = Math.max(sample.pts, 0);

        if (isContinuous) {
            const delta = Math.round(firstDTS - nextVideoDTS);
            if (delta) {
                firstPTS = samples[0].pts = firstPTS - (firstDTS - nextVideoDTS);
                firstDTS = samples[0].dts = firstDTS = nextVideoDTS;
            }
        }

        for (let i = 0; i < samplesCount; i++) {
            const videoSample = samples[i];
            let mp4SampleLength = 0,
                cts;

            // 计算帧长度
            if (i < samplesCount - 1) {
                // 非末尾
                let nextSample = samples[i + 1];
                if (nextSample.dts <= videoSample.dts) {
                    let nextSampleCts = nextSample.pts - nextSample.dts;
                    nextSample.dts = videoSample.dts + 1;
                    nextSample.pts = nextSample.dts + nextSampleCts;
                }
                sampleDuration = nextSample.dts - videoSample.dts;
            } else {
                // 末尾
                let duration = track.sampleDuration || this._videoSampleDuration;
                // 参考暂存帧计算长度
                if (this._videoTimeReferenceInfo.sample) {
                    duration = this._videoTimeReferenceInfo.sample.dts - videoSample.dts;
                }
                sampleDuration = Math.floor(duration);
            }
            cts = Math.round(videoSample.pts - videoSample.dts);

            mp4SampleLength = videoSample.units.reduce((prev: number, unit: Uint8Array) => {
                return unit.byteLength + 4 + prev;
            }, 0);

            mp4Samples.push({
                len: mp4SampleLength,
                units: videoSample.units,
                duration: sampleDuration,
                cts,
                streamDTS: videoSample.streamDTS,
                flags: {
                    isLeading: 0,
                    isDependedOn: 0,
                    hasRedundancy: 0,
                    degradPrio: 0,
                    dependsOn: videoSample.key ? 2 : 1,
                    isNonSync: videoSample.key ? 0 : 1
                }
            });
        }

        let lastSample = samples[samples.length - 1];
        this._nextVideoDTS = lastSample.dts + sampleDuration;
        let nextVideoPTS = lastSample.pts + sampleDuration;

        if (mp4Samples.length && this._forceFirstIDR) {
            const flags = mp4Samples[0].flags;
            flags.dependsOn = 2;
            flags.isNonSync = 0;
        }
        track.mp4Samples = mp4Samples;

        let payload = MP4.videoMediaSegment(track.sequenceNumber++, firstDTS, track, this._getMoovByType(TrackType.video));

        const data: MP4Segment = {
            payload: payload,
            startPTS: firstPTS / timescale,
            endPTS: nextVideoPTS / timescale,
            startDTS: firstDTS / timescale,
            endDTS: this._nextVideoDTS / timescale,
            type: TrackType.video,
            streamDTS: sample.streamDTS / timescale
        };
        this._videoLastPTS = data.endPTS;
        this._videoSampleDuration = Math.max(sampleDuration, 1);
        track.samples = [];
        track.mp4Samples = [];

        return data;
    }

    /**
     * remux音频数据
     * 输出fmp4数据
     * @param track AudioTrack
     * @param isContinuous 是否是连续数据
     */
    private _remuxAudio(track: AudioTrack, isContinuous: boolean): MP4Segment | undefined {
        if (!track.samples.length) {
            return;
        }
        const initPTS = this._initPTS;
        let inputAudioTimeScale = track.inputTimescale,
            scaleFactor = inputAudioTimeScale / track.timescale,
            inputSampleDuration = AAC_SAMPLE_DURATION * scaleFactor,
            mp4Samples: MP4AudioSample[] = [],
            firstAudioPTS = 0,
            lastPTS,
            inputSamples = track.samples as AudioSample[],
            nextAudioPTS = this._nextAudioPTS,
            frameDuration = getAACFrameDuration(track.samplerate);

        if (typeof initPTS === 'undefined') {
            return;
        }

        inputSamples.forEach(function (sample) {
            sample.pts = sample.dts = sample.pts - initPTS;
        });

        if (!isContinuous || typeof nextAudioPTS === 'undefined') {
            nextAudioPTS = inputSamples[0].pts;
        }
        if (typeof nextAudioPTS === 'undefined') {
            return;
        }
        for (let i = 0, nextPTS = nextAudioPTS; i < inputSamples.length; i++) {
            const audioSample = inputSamples[i],
                unit = audioSample.unit,
                pts = audioSample.pts,
                delta = Math.round(pts - nextPTS),
                duration = Math.abs((1000 * delta) / inputAudioTimeScale);

            if (delta <= -inputSampleDuration) {
                // 丢帧
                Log.v(this.tag, `drop audio frame. pts: ${pts}`);
                continue;
            } else if (delta >= inputSampleDuration && duration < MAX_FILL_FRAME_DURATION && nextPTS) {
                // 填空帧
                let fillCount = Math.round(delta / inputSampleDuration);
                Log.v(this.tag, `fill audio frame. count: ${fillCount} pts: ${pts}`);
                for (let j = 0; j < fillCount; j++) {
                    let fillFrame = getAACSilentFrame(track.defaultCodec || track.codec, track.channelCount);
                    if (!fillFrame) {
                        Log.v(this.tag, 'fill copy audio frame');
                        fillFrame = unit.subarray();
                    }
                    mp4Samples.push({
                        len: fillFrame.byteLength,
                        unit: fillFrame,
                        cts: 0,
                        duration: AAC_SAMPLE_DURATION,
                        streamDTS: Math.round(audioSample.streamDTS - fillCount * frameDuration),
                        flags: {
                            isLeading: 0,
                            isDependedOn: 0,
                            hasRedundancy: 0,
                            degradPrio: 0,
                            dependsOn: 1,
                            isNonSync: 0
                        }
                    });
                    firstAudioPTS = firstAudioPTS || Math.max(nextPTS, 0);
                    nextPTS += inputSampleDuration;
                }
            } else {
                firstAudioPTS = firstAudioPTS || pts;
                nextPTS += inputSampleDuration;
            }

            mp4Samples.push({
                len: unit.byteLength,
                cts: 0,
                duration: AAC_SAMPLE_DURATION,
                unit: unit,
                streamDTS: audioSample.streamDTS,
                flags: {
                    isLeading: 0,
                    isDependedOn: 0,
                    hasRedundancy: 0,
                    degradPrio: 0,
                    dependsOn: 1,
                    isNonSync: 0
                }
            });
            lastPTS = pts;
        }

        if (mp4Samples.length && typeof lastPTS === 'number') {
            this._nextAudioPTS = nextAudioPTS = lastPTS + scaleFactor * AAC_SAMPLE_DURATION;
            track.mp4Samples = mp4Samples;

            let payload = MP4.audioMediaSegment(track.sequenceNumber++, firstAudioPTS / scaleFactor, track, this._getMoovByType(TrackType.audio));

            track.samples = [];
            track.mp4Samples = [];
            const start = firstAudioPTS / inputAudioTimeScale;
            const end = nextAudioPTS / inputAudioTimeScale;
            const audioData: MP4Segment = {
                payload: payload,
                startPTS: start,
                endPTS: end,
                startDTS: start,
                endDTS: end,
                type: TrackType.audio,
                streamDTS: mp4Samples[0].streamDTS/ inputAudioTimeScale
            };
            this._audioLastPTS = audioData.endPTS;
            return audioData;
        }
        track.samples = [];
        track.mp4Samples = [];
        return;
    }

    /**
     * 填空audio
     * @param track audiotrack
     * @param isContinuous 是否是连续数据
     * @param startPTS 开始填充时间
     * @param endPTS 结束填充时间
     * @param streamDTS start对应的流时间戳
     */
    private _fillEmptyAudio(track: AudioTrack, isContinuous: boolean, startPTS: number, endPTS: number, streamDTS: number) {
        Log.v(this.tag, 'fill empty Audio');
        const fillFrame = getAACSilentFrame(track.defaultCodec || track.codec, track.channelCount);
        if (typeof this._initPTS === 'undefined' || !fillFrame) {
            return;
        }
        const timescale = track.inputTimescale,
            start = (typeof this._nextAudioPTS !== 'undefined' ? this._nextAudioPTS : startPTS * timescale) + this._initPTS,
            end = endPTS * timescale + this._initPTS,
            frameDuration = getAACFrameDuration(track.samplerate),
            fillCount = Math.ceil((end - start) / frameDuration);

        const samples: AudioSample[] = [];
        for (let i = 0; i < fillCount; i++) {
            const time = start + i * frameDuration;
            samples.push({ unit: fillFrame, pts: time, dts: time, streamDTS: Math.round(streamDTS * timescale + i * frameDuration) });
        }
        track.samples = samples;
        return this._remuxAudio(track, isContinuous);
    }

    /**
     * 获取音/视频moov头
     * @param type track type
     */
    private _getMoovByType(type: TrackType): Uint8Array | undefined {
        let result: Uint8Array | undefined;
        if (this._moovs && this._moovs[type]) {
            result = this._moovs[type];
            delete this._moovs[type];
        }
        return result;
    }

    /**
     * 清理暂存数据
     */
    private _clearVideoTimeReference() {
        this._videoTimeReferenceInfo = <VideoTimeReferenceInfo>{};
    }
}

export default MP4Remuxer;
