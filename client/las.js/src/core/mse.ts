/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:40:17 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:41:13
 * MSE控制器，MSE的buffer管理
 */
import { EventEmitter } from 'events';
import { LasConfig, TimeRange } from '../types/core';
import { MP4Segment } from '../types/remux';
import { Log } from '../utils/log';
import { ErrorDetails, ErrorTypes } from './errors';
import LasEvents from './events';

// append关闭时queue允许缓存的长度上限
const QUEUE_SIZE_LIMIT = 200 * 1024 * 1024;
const MAX_CLEANUP_DURATION = 10;
const MIN_CLEANUP_DURATION = 5;

const MAX_BUFFERED = 30;

/**
 * 处理MediaSource
 * https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource
 */
export default class MSE extends EventEmitter {
    private tag: string = 'MSE';
    private _config: LasConfig;

    public video?: HTMLVideoElement;
    public _sourceBuffer: { [index: string]: SourceBuffer };
    private _mediaSource: MediaSource | null = null;
    private _mimeCodec: { [index: string]: string };
    private _cleanUpTask: { [index: string]: TimeRange[] };
    private _appendQueue: { [index: string]: MP4Segment[] };
    private _hasVideo: boolean;
    private _hasAudio: boolean;
    private _endOfData: boolean = false;
    private _appendEnabled: boolean;
    private _duration: number | null = null;
    private _appendError: number = 0;
    private _appendBufferError: boolean = false;
    private _sbHandler: { [index: string]: { updateend: (e: Event) => any; error: (e: Event) => any } } = {};

    /**
     * 传入配置参数，初始化MSE
     * @param config LasConfig
     */
    constructor(config: LasConfig) {
        super();
        this._config = config;
        this._hasVideo = false;
        this._hasAudio = false;
        this._appendQueue = {
            video: [],
            audio: [],
            audiovideo: []
        };
        this._sourceBuffer = {};
        this._cleanUpTask = { video: [], audio: [], audiovideo: [] };
        this._mimeCodec = {};
        this._appendEnabled = true;
    }

    /**
     * 绑定HTMLVideoElement
     * @param video HTMLVideoElement
     */
    public attach(video: HTMLVideoElement): void {
        this.video = video;
        const MediaSourceDef = (window as any).MediaSource || (window as any).WebKitMediaSource;
        if (MediaSourceDef) {
            const ms = (this._mediaSource = new MediaSourceDef());
            this.video.src = URL.createObjectURL(ms);
            this.video.load();
            ms.addEventListener('sourceopen', this._onSourceOpen);
            ms.addEventListener('sourceended', this._onSourceEnded);
            ms.addEventListener('sourceclose', this._onSourceClose);
        } else {
            setTimeout(() => {
                this.emit(LasEvents.ERROR, {
                    type: ErrorTypes.MSE_ERROR,
                    details: ErrorDetails.MEDIASOURCE_ERROR,
                    fatal: true,
                    info: {
                        reason: 'MediaSource is not support'
                    }
                });
            }, 0);
        }
    }

    /**
     * 传入视频头信息
     * @param mediaInfo 
     */
    public mediaInit(mediaInfo: any): void {
        if ((this._hasAudio !== mediaInfo.hasAudio || this._hasVideo !== mediaInfo.hasVideo || !!mediaInfo.audiovideo !== !!this._mimeCodec.audiovideo) && this.video && this.hasSourceBuffer()) {
            // 音视频轨数量发生变化时需要重建mse
            Log.i(this.tag, 'trackInfo rebuild mse');
            for (const type in this._sourceBuffer) {
                if (this._sourceBuffer[type] && this._sbHandler[type]) {
                    this._sourceBuffer[type].removeEventListener('error', this._sbHandler[type].error);
                    this._sourceBuffer[type].removeEventListener('updateend', this._sbHandler[type].updateend);
                }
            }
            this._sourceBuffer = {};
            if (this._mediaSource) {
                this._mediaSource.removeEventListener('sourceopen', this._onSourceOpen);
                this._mediaSource.removeEventListener('sourceended', this._onSourceEnded);
                this._mediaSource.removeEventListener('sourceclose', this._onSourceClose);
            }
            this._mimeCodec = {};
            this.attach(this.video);
        }
        if (!mediaInfo.audiovideo) {
            if (mediaInfo.hasAudio && mediaInfo.audioCodec) {
                this._mimeCodec.audio = `audio/mp4; codecs="${mediaInfo.audioCodec}"`;
            }
            if (mediaInfo.hasVideo && mediaInfo.videoCodec) {
                this._mimeCodec.video = `video/mp4; codecs="${mediaInfo.videoCodec}"`;
            }
        } else {
            this._mimeCodec.audiovideo = `video/mp4; codecs="${mediaInfo.codec}"`;
        }
        this._hasAudio = this._hasAudio || mediaInfo.hasAudio;
        this._hasVideo = this._hasVideo || mediaInfo.hasVideo;

        this._checkSourceBuffer();
    }

    /**
     * 刷新MSE，计算一次清理任务，尝试重启填充buffer任务
     */
    public refresh() {
        for (const type in this._sourceBuffer) {
            this._update(type);
        }
    }

    /**
     * 转封装后fmp4数据
     * @param segments segments
     */
    public mediaSegment(segments: MP4Segment[]): void {
        segments.forEach(segment => {
            let type = segment.type;
            this._appendQueue[type].push(segment);
            if (this._sourceBuffer[type]) {
                this._update(type);
            }
        })
    }

    /**
     * mse buffer范围，秒
     * @param type video|audio|audiovideo
     */
    public bufferedByType(type: string): { start: number; end: number } {
        const sb = this._sourceBuffer[type];
        if (sb && sb.buffered.length > 0) {
            return { start: sb.buffered.start(0), end: sb.buffered.end(sb.buffered.length - 1) };
        }
        return { start: 0, end: 0 };
    }

    /**
     * mse buffer结束时间点，秒
     * @param type video|audio|audiovideo
     */
    public bufferedEndByType(type: string): number {
        const sb = this._sourceBuffer[type];
        if (sb && sb.buffered.length > 0) {
            return sb.buffered.end(sb.buffered.length - 1);
        }
        return 0;
    }

    /**
     * mse buffer的分段数量，正常情况不大于1
     * @param type video|audio|audiovideo
     */
    public bufferSliceNumByType(type: string): number {
        const sb = this._sourceBuffer[type];
        if (sb) {
            return sb.buffered.length;
        }
        return 0;
    }

    /**
     * 待填充buffer长度
     * @param type video|audio|audiovideo
     */
    public pendingSecByType(type: string): number {
        const buffer = this._appendQueue[type];
        if (buffer) {
            return buffer.reduce((prev, current) => {
                return prev + current.endDTS - current.startDTS;
            }, 0);
        }
        return 0;
    }

    /**
     * 待填充buffer数量
     */
    public pendingNum(): number {
        let num = 0;
        for (let type in this._appendQueue) {
            num += this._appendQueue[type].length;
        }
        return num;
    }

    /**
     * 检查track是否已获取codec
     */
    private _checkSourceBuffer(): void {
        let expected = (this._hasAudio ? 1 : 0) + (this._hasVideo ? 1 : 0);
        let codecs = (this._mimeCodec.audio ? 1 : 0) + (this._mimeCodec.video ? 1 : 0);
        if (this._mimeCodec.audiovideo) {
            expected = 1;
            codecs = 1;
        }
        Log.v(this.tag, 'checkSourceBuffer', expected, codecs, this._mimeCodec);
        if (this._mediaSource && this._mediaSource.readyState === 'open' && expected > 0 && codecs >= expected) {
            for (const type in this._mimeCodec) {
                if (this._mimeCodec[type]) {
                    this._addSourceBuffer(type);
                }
            }
        }
    }

    /**
     * MediaSource的sourceopen事件处理
     */
    private _onSourceOpen = () => {
        Log.i(this.tag, 'MediaSource onSourceOpen');
        if (this._mediaSource) {
            this._mediaSource.removeEventListener('sourceopen', this._onSourceOpen);
            this._checkSourceBuffer();
            this.refresh();
            this.emit('source_open');
        }
    };

    /**
     * 向mediaSource添加sourceBuffer
     * @param type video|audio
     */
    private _addSourceBuffer(type: string): void {
        if (this._sourceBuffer[type]) {
            return;
        }
        try {
            if (this._mediaSource) {
                this._sourceBuffer[type] = this._mediaSource.addSourceBuffer(this._mimeCodec[type]);
            }
        } catch (e) {
            Log.e(this.tag, e);
            this.emit(LasEvents.ERROR, {
                type: ErrorTypes.MSE_ERROR,
                details: ErrorDetails.ADDSOURCEBUFFER_ERROR,
                fatal: true,
                info: {
                    reason: e.message
                }
            });
            return;
        }
        const sb = this._sourceBuffer[type];
        this._sbHandler[type] = {
            updateend: () => {
                this._onSourceBufferUpdateEnd(type);
            },
            error: (e: Event) => {
                this._onSourceBufferError(e);
            }
        };
        sb.addEventListener('error', this._sbHandler[type].error);
        sb.addEventListener('updateend', this._sbHandler[type].updateend);
        if (this._duration && this._mediaSource) {
            this._mediaSource.duration = this._duration;
        }
    }

    /**
     * 是否有待处理的数据
     */
    private _hasPendingData(): boolean {
        return !!(
            this._appendQueue &&
            ((this._appendQueue.video && this._appendQueue.video.length) ||
                (this._appendQueue.audio && this._appendQueue.audio.length))
        );
    }

    /**
     * 向sourcebuffer中填入数据
     * @param type video|audio
     */
    private _doAppend(type: string): void {
        if (this._hasPendingData()) {
            if (!this._appendEnabled) {
                const size = this._getBufferQueueSize();
                if (size > QUEUE_SIZE_LIMIT && !this._appendBufferError) {
                    this._appendBufferError = true;
                    this.emit(LasEvents.ERROR, {
                        type: ErrorTypes.MSE_ERROR,
                        details: ErrorDetails.APPENDBUFFER_ERROR,
                        fatal: true,
                        info: {
                            reason: 'bufferfull'
                        }
                    });
                }
                return;
            }
            if (
                this._appendQueue[type].length > 0 &&
                this._sourceBuffer[type] &&
                !this._sourceBuffer[type].updating &&
                !this._appendBufferError
            ) {
                const data = this._appendQueue[type].shift();
                this._appendBuffer(data);
            }
        }
    }

    /**
     * 根据填充策略计算需要缓存清理的范围
     * @param type video|audio|audiovideo
     */
    private _calculateRemoveRange(type: string): void {
        const video = this.video;
        if (!video || video.seeking) {
            return;
        }
        const time = video.currentTime;
        if (this._sourceBuffer[type]) {
            const task = this._cleanUpTask[type];
            const buffered = this._sourceBuffer[type].buffered;
            if (buffered.length >= 1 && time - buffered.start(0) >= MAX_CLEANUP_DURATION) {
                const end = time - MIN_CLEANUP_DURATION;
                if (task.length) {
                    if (task[task.length - 1].start === 0 && task[task.length - 1].end === end) {
                        return;
                    }
                }
                task.push({ start: 0, end });
            }
        }
    }

    /**
     * 尝试清理sourcebufer缓存
     * @param sb 需要清理的sourceBuffer
     * @param range 需要清理的范围
     */
    private _cleanUpRange(type: string, range: TimeRange): boolean {
        const sb = this._sourceBuffer[type];
        if (sb) {
            if (!sb.updating) {
                try {
                    for (let i = 0; i < sb.buffered.length; i++) {
                        const bufStart = 0;
                        const bufEnd = sb.buffered.end(i);
                        const removeStart = Math.max(bufStart, range.start);
                        const removeEnd = Math.min(bufEnd, range.end);
                        /**
                         * remove不一定准确按照指定值进行，remove长度小于500ms，可能无效
                         */
                        if (removeEnd > removeStart) {
                            sb.remove(removeStart, removeEnd);
                            this.emit('remove');
                            // 多段buffer时可能需要多次清理
                            if (i < sb.buffered.length - 1) {
                                return false;
                            }
                        }
                    }
                } catch (error) { }
            } else {
                return false;
            }
        }
        return true;
    }

    /**
     * 向sourcebuffer中填充数据
     * @param data data
     * @param type type
     */
    private _appendBuffer(data?: MP4Segment): void {
        if (!data || !this._sourceBuffer[data.type] || !this.video || this.video.error) {
            return;
        }
        try {
            this._sourceBuffer[data.type].appendBuffer(data.payload.buffer);
        } catch (e) {
            Log.w(this.tag, e.code, e);
            if (e.code !== 22) {
                if (this._appendError) {
                    this._appendError++;
                } else {
                    this._appendError = 1;
                }
                if (this._appendError > this._config.appendErrorMaxRetry) {
                    this._appendBufferError = true;
                    this.emit(LasEvents.ERROR, {
                        type: ErrorTypes.MSE_ERROR,
                        details: ErrorDetails.APPENDBUFFER_ERROR,
                        fatal: true,
                        info: {
                            reason: e.message
                        }
                    });
                } else {
                    this._appendQueue[data.type].unshift(data);
                }
            } else {
                // buffer满无法填充
                let v = this.video, conf = this._config;
                this._appendEnabled = false;
                this._appendQueue[data.type].unshift(data);
                let buffered = v.buffered.end(v.buffered.length - 1) - v.currentTime;
                let useless = v.currentTime - v.buffered.start(0);
                // 未使用buffer小于阈值，尝试清理已使用buffer
                if (buffered < MAX_BUFFERED) {
                    this._calculateRemoveRange(data.type);
                    if (this.hasCleanUpTask(data.type)) {
                        this._cleanUp(data.type);
                    }
                    // 已使用buffer小于清理阈值时，抛错
                } else if (useless < MAX_CLEANUP_DURATION) {
                    this.emit(LasEvents.ERROR, {
                        type: ErrorTypes.MSE_ERROR,
                        details: ErrorDetails.APPENDBUFFER_ERROR,
                        fatal: true,
                        info: {
                            reason: 'buffer full, append error'
                        }
                    });
                }
                Log.i(this.tag, 'mse bufferfull')
                this.emit('bufferFull');
            }
        }
    }

    /**
     * sourcebuffer end
     */
    private _onSourceEnded = () => {
        Log.i(this.tag, 'MediaSource onSourceEnded');
    };

    /**
     * sourcebuffer close
     */
    private _onSourceClose = () => {
        Log.i(this.tag, 'MediaSource onSourceClose');
        if (this._mediaSource) {
            this._mediaSource.removeEventListener('sourceopen', this._onSourceOpen);
            this._mediaSource.removeEventListener('sourceended', this._onSourceEnded);
            this._mediaSource.removeEventListener('sourceclose', this._onSourceClose);
        }
    };

    private _onSourceBufferUpdateEnd = (type: string) => {
        this._update(type);
        if (this._endOfData) {
            this._endOfStream();
        }
        this.emit('updateend');
    };

    /**
     * sourcebuffer error
     * @param {Object} e 事件
     */
    private _onSourceBufferError = (e: Event) => {
        Log.e(this.tag, `SourceBuffer Error: ${e}`);
        this.emit(LasEvents.ERROR, {
            type: ErrorTypes.MSE_ERROR,
            details: ErrorDetails.SOURCEBUFFER_ERROR,
            fatal: true,
            info: {
                reason: 'source buffer error'
            }
        });
    };

    /**
     * 清理mse sourcebuffer缓存
     * @param startSec 开始时间点，未指从0点开始
     * @param endSec 结束时间点，未指定时结束点为正无穷大
     * @param flushType 类型，未指定时清理所有sourcebuffe
     */
    public flush(startSec?: number, endSec?: number, flushType?: string): void {
        let start = 0,
            end = Number.POSITIVE_INFINITY;
        this._endOfData = false;
        // 计算清理范围
        for (const type in this._sourceBuffer) {
            if (flushType && flushType !== type) {
                continue;
            }
            const sb = this._sourceBuffer[type];
            if (!sb) {
                continue;
            }
            // 清理未填充数据
            if (startSec) {
                start = Math.max(start, startSec);
                for (let i = this._appendQueue[type].length - 1; i >= 0; i--) {
                    if (!this._appendQueue[type][i].startPTS || this._appendQueue[type][i].startPTS >= startSec) {
                        this._appendQueue[type].pop();
                    } else {
                        break;
                    }
                }
            } else {
                this._appendQueue[type] = [];
            }
            if (endSec) {
                end = Math.min(end, endSec);
            }
            this._cleanUpTask[type].push({ start, end });
            this._cleanUp(type);
        }
        this._appendEnabled = true;
    }

    /**
     * 是否开启buffer填充
     * @param value 开关
     */
    public setAppendEnabled(value: boolean): void {
        if (!this._appendEnabled && value) {
            this._appendEnabled = value;
            this.refresh();
        } else {
            this._appendEnabled = value;
        }
    }

    public getAppendEnabled(): boolean {
        return this._appendEnabled;
    }

    /**
     * 数据结束
     */
    public endOfData(): void {
        this._endOfData = true;
        if (!this._hasPendingData()) {
            this._endOfStream();
        }
    }

    public ended(): boolean {
        return this._endOfData;
    }

    private _endOfStream(): void {
        const ms = this._mediaSource;
        if (!ms || ms.readyState !== 'open') {
            return;
        }
        for (const type in this._sourceBuffer) {
            const sb = this._sourceBuffer[type];
            if (sb && sb.updating) {
                return;
            }
        }
        try {
            ms.endOfStream();
        } catch (error) {
            Log.e(this.tag, error);
            this.emit(LasEvents.ERROR, {
                type: ErrorTypes.MSE_ERROR,
                details: ErrorDetails.ENDOFSTREAM_ERROR,
                fatal: true,
                info: {
                    reason: error.message
                }
            });
        }
    }

    /**
     * 销毁
     */
    public destroy(): void {
        if (this._mediaSource) {
            const ms = this._mediaSource;
            // pending segments should be discard

            // remove all sourcebuffers
            this._endOfStream();
            if (ms.readyState !== 'closed') {
                for (const type in this._sourceBuffer) {
                    if (this._sourceBuffer[type] && this._sbHandler[type]) {
                        this._sourceBuffer[type].removeEventListener('error', this._sbHandler[type].error);
                        this._sourceBuffer[type].removeEventListener('updateend', this._sbHandler[type].updateend);
                        ms.removeSourceBuffer(this._sourceBuffer[type]);
                    }
                }
            }
            ms.removeEventListener('sourceopen', this._onSourceOpen);
            ms.removeEventListener('sourceended', this._onSourceEnded);
            ms.removeEventListener('sourceclose', this._onSourceClose);
            this._mediaSource = null;
        }
        this.removeAllListeners();
        this._appendQueue = {};
        this._mimeCodec = {};
        this._cleanUpTask = {};
        this._sourceBuffer = {};
        this._sbHandler = {};
    }

    /**
     * 是否有未完成的清理任务
     * @param type video|audio|audiovideo
     */
    public hasCleanUpTask(type?: string): boolean {
        let num = 0;
        if (typeof type === 'undefined') {
            for (let type in this._cleanUpTask) {
                num += this._cleanUpTask[type].length;
            }
        } else {
            if (this._cleanUpTask[type]) {
                num = this._cleanUpTask[type].length;
            }
        }
        return num > 0;
    }

    /**
     * 是否已添加了sourceBuffer
     */
    public hasSourceBuffer(): boolean {
        return !!Object.keys(this._sourceBuffer).length;
    }

    /**
     * 计算待填充数据队列中数据总大小
     */
    private _getBufferQueueSize(): number {
        let num = 0;
        for (const type in this._appendQueue) {
            num += this._appendQueue[type].reduce((prev, current) => {
                if (current.payload && current.payload.byteLength) {
                    return prev + current.payload.byteLength;
                }
                return prev;
            }, 0);
        }
        return num;
    }

    /**
     * 待填充队列中的数据时长
     * @param type video|audio|audiovideo，为空时返回video|audio最大值
     * @returns 时长（秒）
     */
    public getBufferQueueSec(type?: string): number {
        if (!this._appendQueue) {
            return 0;
        }
        let keys;
        if (type) {
            keys = [type];
        } else {
            keys = Object.keys(this._appendQueue);
        }
        return keys.reduce((prev, current) => {
            if (this._appendQueue[current] && this._appendQueue[current].length > 0 && (Object.keys(this._sourceBuffer).length === 0 || this._sourceBuffer[current])) {
                return Math.max(
                    prev,
                    this._appendQueue[current].reduce((prevDuration, currentSegment) => {
                        let duration = currentSegment.endDTS - currentSegment.startDTS;
                        if (duration) {
                            return prevDuration + duration;
                        }
                        return prevDuration;
                    }, 0)
                );
            }
            return prev;
        }, 0);
    }

    /**
     * 获取MSE当前状态，mse.readyState
     */
    public get readyState(): ReadyState {
        if (this._mediaSource) {
            return this._mediaSource.readyState;
        }
        return 'closed';
    }

    /**
     * 更新souceBuffer，清理或填充
     */
    private _update(type: string): void {
        if (this.hasCleanUpTask(type)) {
            this._cleanUp(type);
        }
        this._doAppend(type);
    }

    /**
     * 执行清理任务
     * @param type video|audio|audiovideo
     */
    private _cleanUp(type: string): void {
        let range = this._cleanUpTask[type];
        while (range && range.length) {
            const item = range[0];
            if (this._cleanUpRange(type, item)) {
                range.shift();
            } else {
                return;
            }
        }
        this.refresh();
    }
}
