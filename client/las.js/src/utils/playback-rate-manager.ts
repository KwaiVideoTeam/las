/*
 * @Author: gengxing
 * @Date: 2020-06-30 16:22:55
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-30 18:29:35
 */
import Media from '../core/media';
import { AutoPlaybackRateConfig } from '../types/core';
import { Log } from './log';

/**
 * 播放速度控制
 */
class PlaybackRateManager {
    private tag: string = 'PlaybackRateManager';
    private _media: Media;
    private _config: AutoPlaybackRateConfig;
    private _interval: number = 0;
    private _timer: any;

    constructor(media: Media, config: AutoPlaybackRateConfig) {
        this._media = media;
        this._config = config;
    }

    /**
     * 启动自动倍速控制
     */
    public start(): void {
        this._interval = this._interval || this._config.startDelay || this._config.interval || 5;
        this._tick();
        this._interval = this._config.interval || 1;
    }

    /**
     * 停止自动倍速控制
     */
    public stop(): void {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = 0;
        }
    }

    public destroy(): void {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = 0;
        }
    }

    private _tick(): void {
        if (!this._timer) {
            this._timer = setTimeout(() => {
                if (this._media.video) {
                    this._nextPlayBackRate(this._media.bufferedSec(), this._media.video);
                }
                this._timer = 0;
                this._tick();
            }, this._interval * 1000);
        }
    }

    /**
     * 处理一次播放倍速计算
     * @param buffered 当前待播放的buffer长度，秒
     * @param video video
     */
    private _nextPlayBackRate(buffered: number, video: HTMLVideoElement): void {
        let playbackRate = 1;
        const rule = this._config.rule;

        let i = 0;
        for (i = 0; i < rule.length; i++) {
            if (video.playbackRate >= rule[i].rate) {
                break;
            }
        }

        const downRule = i < rule.length - 1 ? rule[i + 1] : null;
        const upRule = i > 0 ? rule[i - 1] : null;

        playbackRate = rule[i].rate;

        if (upRule && buffered > upRule.lower) {
            playbackRate = upRule.rate;
        }

        if (downRule && buffered < downRule.upper) {
            playbackRate = downRule.rate;
        }
        if (video.playbackRate !== playbackRate) {
            Log.i(this.tag, `auto change playback rate from ${video.playbackRate} to ${playbackRate}`);
            video.playbackRate = playbackRate;
        }
    }
}

export default PlaybackRateManager;
