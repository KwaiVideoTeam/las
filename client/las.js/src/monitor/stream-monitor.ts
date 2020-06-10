/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:49:17 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:49:17 
 * 流下载相关信息处理
 */
import { MP4Segment } from "../types/remux";

const RECORD_NUM_LIMIT = 10;
const RECORD_DOWNLOAD_NUM_LIMIT = 200;
const RECORD_SEGMRNT_NUM_LIMIT = 100;

type StreamQOS = {
    index: number;
    startPos: number;
    url: string;
    bitrate: number;
    mediaInfo?: any;
    traffic: number;
    loadTimeCost: number;
    keyFrame: number;
    videoDataRate: number;
    audioDataRate: number;
    segments: Partial<Record<string, { duration: number; dts: number; len: number }[]>>;
};
type DownloadLog = {
    byteLength: number;
    timeCost: number;
    ts: number;
};
type QOS = {
    traffic: number;
    streams: StreamQOS[];
    download: DownloadLog[];
};

/**
 * 监测流下载、remux质量信息
 */
class StreamMonitor {
    private _qos!: QOS;
    constructor() {
        this.reset();
    }

    /**
     * 重置状态
     */
    public reset() {
        this._qos = {
            traffic: 0,
            streams: [],
            download: []
        };
    }

    /**
     * 收到关键帧
     */
    public onKeyFrame() {
        this._qos.streams[this._qos.streams.length - 1].keyFrame++;
    }

    /**
     * 开始加载新流，增加一调流记录
     * @param index 流id
     * @param startPos 流开始位置
     * @param url 流地址
     * @param bitrate 流码率
     */
    public onStreamOpen(index: number, startPos: number, url: string, bitrate: number): void {
        if (this._qos.streams.length > RECORD_NUM_LIMIT) {
            this._qos.streams.shift();
        }
        this._qos.streams.push({
            index,
            startPos,
            url,
            bitrate,
            traffic: 0,
            loadTimeCost: 0,
            keyFrame: 0,
            videoDataRate: 0,
            audioDataRate: 0,
            segments: {}
        });
    }

    /**
     * 收到媒体信息，解完音视频头之后
     * @param data 媒体信息
     */
    public onMediaInfo(data: any) {
        const info = this.loadingInfo;
        if (info) {
            info.mediaInfo = Object.assign({}, data);
        }
    }

    /**
     * 数据下载相关信息
     * @param data 下载信息
     */
    public onDataReceive(data: { byteLength: number; timeCost: number; ts: number }): void {
        this._qos.traffic += data.byteLength;
        const log = this._qos.download;
        if (log.length > RECORD_DOWNLOAD_NUM_LIMIT) {
            log.pop();
        }
        log.unshift(data);
        const info = this._qos.streams[this._qos.streams.length - 1];
        info.traffic += data.byteLength;
        info.loadTimeCost += data.timeCost;
    }

    public onMediaSegment(data: MP4Segment): void {
        const qos = this._qos;
        const stream = qos.streams[qos.streams.length - 1];
        const log = stream.segments[data.type] || [];
        stream.segments[data.type] = log;
        log.push({ duration: (data.endDTS - data.startDTS) * 1000, dts: data.startDTS * 1000, len: data.payload.byteLength });

        // datarate
        if (log.length > RECORD_SEGMRNT_NUM_LIMIT) {
            log.shift();
        }
        let duration = 0;
        let totalLen = 0;
        for (let i = 0; i < log.length; i++) {
            totalLen += log[i].len;
            duration += log[i].duration;
        }
        if (duration > 0) {
            if (data.type === 'video') {
                stream.videoDataRate = Math.round(totalLen * 8 / duration);
            } else if (data.type === 'audio') {
                stream.audioDataRate = Math.round(totalLen * 8 / duration);
            }
        }
    }

    /**
     * 获取指定位置的流质量信息
     * @param sec 视频时间轴时间（毫秒）
     */
    public getInfoByTime(sec: number): StreamQOS | null {
        for (let i = this._qos.streams.length - 1; i >= 0; i--) {
            if (this._qos.streams[i].startPos < sec) {
                return this._qos.streams[i];
            }
        }
        return null;
    }

    /**
     * 更新当前下载流的开始时间
     * @param sec 时间（毫秒）
     */
    public updateStartPos(sec: number): void {
        if (this._qos.streams.length) {
            this._qos.streams[this._qos.streams.length - 1].startPos = sec;
        }
    }

    /**
     * 获取当前正在加载的流质量信息
     */
    public get loadingInfo(): StreamQOS | null {
        if (this._qos.streams.length) {
            return this._qos.streams[this._qos.streams.length - 1];
        }
        return null;
    }

    /**
     * 当前下载速度
     */
    public get downloadSpeed() {
        const qos = this._qos;
        const tsEnd = performance.now();
        let len = 0,
            timeCost = 0;
        for (let i = 0; i < qos.download.length; i++) {
            if (qos.download[i].ts > tsEnd - 1000) {
                len += qos.download[i].byteLength;
                timeCost += qos.download[i].timeCost;
            } else {
                break;
            }
        }
        return Math.round(len / timeCost * 1000) || 0;
    }

    /**
     * 当前加载流信息
     */
    public get mediaInfo(): any {
        if (this._qos.streams.length) {
            return this._qos.streams[this._qos.streams.length - 1].mediaInfo;
        }
        return null;
    }

    /**
     * 当前加载流视频视频码率
     */
    public get videoDataRate(): number {
        if (this._qos.streams.length) {
            return this._qos.streams[this._qos.streams.length - 1].videoDataRate;
        }
        return 0;
    }

    /**
     * 当前加载流视频音频码率
     */
    public get audioDataRate(): number {
        if (this._qos.streams.length) {
            return this._qos.streams[this._qos.streams.length - 1].audioDataRate;
        }
        return 0;
    }

    /**
     * 当前加载流视频码率
     */
    public get bitrate(): number {
        if (this._qos.streams.length) {
            return this._qos.streams[this._qos.streams.length - 1].bitrate;
        }
        return 0;
    }
    /**
     * 下载数据量（字节）
     */
    public get traffic(): number {
        return this._qos.traffic;
    }
    /**
     * 下载，remux质量数据
     */
    public get data(): QOS {
        return this._qos;
    }
}

export { StreamMonitor };

