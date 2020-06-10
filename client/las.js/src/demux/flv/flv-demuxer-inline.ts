/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:52:14 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:52:14 
 */
import { EventEmitter } from 'events';
import LasEvents from '../../core/events';
import MP4Remuxer from '../../remux/mp4-remuxer';
import { LasMainConfig } from '../../types/core';
import { FlvTag } from '../../types/flv-object';
import FlvDemuxer from './flv-demuxer';

class FlvDemuxerInline {
    private tag: string = 'Flv';
    private _eventEmitter: EventEmitter;
    private _config: LasMainConfig;
    private _extraData: any;

    private _demuxer!: FlvDemuxer;
    private _remuxer!: MP4Remuxer;

    constructor(eventEmitter: EventEmitter, config: LasMainConfig, extraData: any) {
        this._eventEmitter = eventEmitter;
        this._config = config;

        this._extraData = extraData;
    }

    public init(): void {
        const config = this._config,
            eventEmitter = this._eventEmitter;

        const remuxer = (this._remuxer = new MP4Remuxer(eventEmitter, config));
        this._demuxer = new FlvDemuxer(eventEmitter, remuxer, config);
        remuxer.setExtra(this._extraData);
    }

    public setCodecs(audioCodec: string = '', videoCodec: string = ''): void {
        this._demuxer.setCodecs(audioCodec, videoCodec);
    }

    public flvHead(hasAudio: boolean, hasVideo: boolean): void {
        this._demuxer.flvHead(hasAudio, hasVideo);
    }

    public append(tags: FlvTag[], timeOffset: number, isContinuous: boolean) {
        if (!isContinuous) {
            this._demuxer.reset();
            this._remuxer.resetMoov();
            this._remuxer.resetTimeStamp();
        }
        this._demuxer.append(tags, timeOffset, isContinuous);
    }

    public end(): void {
        this._demuxer.flush();
        this._remuxer.flush();
        this._eventEmitter.emit(LasEvents.LOAD_END);
    }

    public flush(): void {
        if (this._demuxer) {
            this._demuxer.flush();
        }
    }

    public setExtra(data: any): void {
        this._extraData = data;
        if (this._remuxer) {
            this._remuxer.setExtra(this._extraData);
        }
    }

    public destroy(): void { }

}

export default FlvDemuxerInline;
