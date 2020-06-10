/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:41:45 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:42:08
 * video及MSE工具类，封装video和MSE的部分接口，并用于计算处理视频的缓冲相关信息
 */
import { TimeRange } from '../types/core';
import MSE from './mse';

class Media {
    private _video?: HTMLVideoElement;
    private _mse?: MSE;

    private _streamTime: number = 0;
    private _localTime: number = 0;

    constructor() { }

    public reset(): void {
        this._streamTime = 0;
        this._localTime = 0;
    }

    public attachVideo(video: HTMLVideoElement): void {
        this._video = video;
    }
    public attachMSE(mse: MSE): void {
        this._mse = mse;
    }

    /**
     * 指定时间是否在video缓冲区内
     * @param sec time
     * @returns isTimeinBuffered
     */
    public isTimeinBuffered(sec: number): boolean {
        if (this._video) {
            const buffered = this._video.buffered;
            for (let i = 0; i < buffered.length; i++) {
                if (sec >= buffered.start(i) && sec < buffered.end(i)) {
                    return true;
                }
            }
        }
        return false;
    }

    /*
     * 计算video buffer量
     */
    public bufferedSec(): number {
        if (this._video && this._video.buffered.length > 0) {
            return Math.max(0, this._video.buffered.end(this._video.buffered.length - 1) - this._video.currentTime);
        }
        return 0;
    }

    /**
     * 音频、视频的buffer长度
     * @param type video|audio
     */
    public bufferedSecByType(type: string): number {
        if (this._mse && this._video) {
            let end = this._mse.bufferedEndByType(type);
            if (end > 0) {
                return this._mse.bufferedEndByType(type) - this._video.currentTime;
            }
        }
        return 0;
    }

    /**
     * 音频、视频的buffer长度
     * @param type video|audio
     */
    public mseBufferedSecByType(type: string): TimeRange {
        if (this._mse) {
            return this._mse.bufferedByType(type);
        }
        return { start: 0, end: 0 };
    }

    /**
     * 音频、视频buffer的段数
     * @param type video|audio
     */
    public bufferSliceNumByType(type: string): number {
        if (this._mse) {
            return this._mse.bufferSliceNumByType(type);
        }
        return 0;
    }

    public pendingNum(): number {
        if (this._mse) {
            return this._mse.pendingNum();
        }
        return 0;
    }

    /**
     * 待填充的buffer数据长度
     * @param type video|audio
     */
    public pendingSecByType(type: string): number {
        if (this._mse) {
            return this._mse.pendingSecByType(type);
        }
        return 0;
    }

    /**
     * 指定时间所在的buffer区域结束时间，不在任何buffer区域时返回空
     * @param time 时间
     */
    public currentBuffer(time: number): TimeRange | undefined {
        if (this._video) {
            let buffered = this._video.buffered;
            for (let i = 0; i < buffered.length; i++) {
                const start = buffered.start(i);
                const end = buffered.end(i);
                if (start <= time && time < end) {
                    return { start, end };
                }
            }
        }
        return undefined;
    }

    /**
     * 指定时间所在的buffer区域结束时间，不在任何buffer区域时返回空
     * @param time 时间
     */
    public nextBuffer(time: number): TimeRange | undefined {
        if (this._video) {
            let buffered = this._video.buffered;
            for (let i = 0; i < buffered.length; i++) {
                const start = buffered.start(i);
                const end = buffered.end(i);
                if (start > time) {
                    return { start, end };
                }
            }
        }
        return undefined;
    }

    /**
     * 更新转封装后的时间对应关系
     * @param streamTime 流中的时间戳，秒
     * @param localTime 本地时间，秒
     */
    public updateStreamTime(streamTime: number, localTime: number): void {
        this._streamTime = streamTime;
        this._localTime = localTime;
    }

    /**
     * 根据流时间推算对应的本地时间戳
     * @param streamTime 流时间
     */
    public getLocalTime(streamTime: number): number | undefined {
        if (this._streamTime) {
            return (streamTime - this._streamTime) + this._localTime;
        }
        return;
    }

    /**
    * 当前是否有流时间
    */
    public get hasStreamTime(): boolean {
        return !!this._streamTime;
    }

    public get video(): HTMLVideoElement | undefined {
        return this._video;
    }

    public get mse(): MSE | undefined {
        return this._mse;
    }

    /**
     * 获取MSE当前状态，mse.readyState
     */
    public get mseReadyState(): ReadyState {
        if (this._mse) {
            return this._mse.readyState;
        }
        return 'closed';
    }

    /**
     * 获取MSE当前状态，mse.readyState
     */
    public get videoReadyState(): number {
        if (this._video) {
            return this._video.readyState;
        }
        return 0;
    }


    /**
     * video当前播放时间
     */
    public get currentTime(): number {
        if (this._video) {
            return this._video.currentTime;
        }
        return 0;
    }
}

export default Media;
