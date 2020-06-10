/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:49:38 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:49:38 
 * 播放信息监控
 */
import { EventEmitter } from 'events';
import LasEvents from '../core/events';
import Media from '../core/media';
import { REPORT_TYPES } from '../core/report-types';
import { getNewMonitorData, MonitorData } from '../types/monitor-data';
import { MP4RemuxResult } from '../types/remux';
import PlaybackQuality from './playback-quality';
import { StreamMonitor } from './stream-monitor';

const HEARTBEAT_INTERVAL = 1000;

/**
 * 播放信息监控。收集播放器事件，集中处理
 */
class Monitor extends EventEmitter {
    private _media: Media;
    private _playbackQuality?: PlaybackQuality;
    private _data!: MonitorData;
    private _playing: boolean = false;
    private _sm: StreamMonitor;
    private _hbTimer: any;

    /**
     * 初始化
     * @param media Media
     */
    constructor(media: Media) {
        super();
        this._sm = new StreamMonitor();
        this._media = media;
        this.reset();
    }

    /**
     * 重置状态
     */
    public reset(): void {
        this._data = getNewMonitorData();
        this._sm.reset();
        if (this._playbackQuality) {
            this._playbackQuality.reset();
        }
        this._refresh();
    }

    /**
     * report事件处理
     * @param event Report事件数据
     */
    public onReport(event: any): void {
        event.ts = event.ts || performance.now();
        const data = this._data;
        switch (event.type) {
            case REPORT_TYPES.LOADER_CHUNK_ARRIVAL:
                data.downloadedBytes += event.byteLength;
                this._sm.onDataReceive(event);
                break;
            case REPORT_TYPES.START_LOAD_STREAM:
                this._sm.onStreamOpen(event.index || 0, event.sync, event.url, event.bitrate);
                break;
            case REPORT_TYPES.KEY_FRAME:
                this._sm.onKeyFrame();
                break;
        }
    }

    /**
     * 销毁
     */
    public destroy(): void {
        if (this._playbackQuality) {
            this._playbackQuality.destory();
            this._playbackQuality = undefined;
        }
        this._stopHeartbeat();
    }

    public onLoad(): void {
        this._startHeartbeat();
        if (this._media.video) {
            this._playbackQuality = new PlaybackQuality();
            this._playbackQuality.attachMedia(this._media.video);
        }
    }

    public onSegmentInit(data: any): void {
        this._sm.onMediaInfo(data);
    }

    public onLoadeddata(): void {
        this._onFirstFrame();
        this._waitingEnd();
    }

    public onCanplay(): void {
        this._onFirstFrame();
        this._waitingEnd();
    }

    public onPlaying(): void {
        this._playing = true;
        this._waitingEnd();
    }

    public onEnd(): void {
        this._waitingEnd();
    }

    public onWaiting(block: boolean): void {
        if (this._playing && this._data.firstFrameTime && block) {
            this._waitingStart();
        }
    }

    public onStopLoad(): void {
        this._stopHeartbeat();
    }

    public onSegment(data: MP4RemuxResult) {
        data.segments.forEach(segment => {
            this._sm.onMediaSegment(segment);
        });
    }

    public get data() {
        return this._data;
    }

    private _refresh(): void {
        let playbackQualityInfo;
        if (this._playbackQuality) {
            playbackQualityInfo = this._playbackQuality.getInfo();
        }
        const data = this._data;
        if (playbackQualityInfo) {
            data.decodedFPS = playbackQualityInfo.decodedFPS;
            data.droppedFPS = playbackQualityInfo.droppedFPS;
            data.droppedFrames = playbackQualityInfo.dropped;
            data.decodedFrames = playbackQualityInfo.decoded;
        } else {
            data.decodedFPS = data.droppedFPS = data.droppedFrames = data.decodedFrames = 0;
        }
    }

    private _onFirstFrame(): void {
        if (!this._data.firstFrameTime) {
            this._data.firstFrameTime = performance.now();
        }
    }

    private _waitingStart() {
        if (!this._data.bufferingStartMS) {
            this._data.blockCount++;
            this._data.bufferingStartMS = this._data.bufferingStartMS || performance.now();
        }
    }

    private _waitingEnd() {
        if (this._data.bufferingStartMS) {
            this._data.blockDuration += performance.now() - this._data.bufferingStartMS;
        }
        this._data.bufferingStartMS = null;
    }

    private _heartbeat = () => {
        this._refresh();

        const data = this._data;
        const sm = this._sm;
        const hb = {
            totalReceive: sm.traffic,
            speed: sm.downloadSpeed,
            videoDataRate: sm.videoDataRate,
            audioDataRate: sm.audioDataRate,
            decodedFPS: data.decodedFPS,
            droppedFPS: data.droppedFPS,
            decodedFrames: data.decodedFrames,
            droppedFrames: data.droppedFrames
        };

        this.emit(LasEvents.HEARTBEAT, hb);
    }

    private _startHeartbeat(): void {
        if (!this._hbTimer) {
            this._hbTimer = setInterval(this._heartbeat, HEARTBEAT_INTERVAL)
        }
    }

    private _stopHeartbeat(): void {
        if (this._hbTimer) {
            clearInterval(this._hbTimer);
            this._hbTimer = undefined;
        }
    }
}

export default Monitor;
