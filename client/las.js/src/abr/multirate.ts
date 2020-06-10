/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:53:31 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:53:31 
 * flv多码率处理
 */
import { EventEmitter } from 'events';
import LasEvents from '../core/events';
import Media from '../core/media';
import { IAbrAlgorithm, RealtimeStatus } from '../types/abr';
import { AbrConfig, SmoothLevelSwitchInfo } from '../types/core';
import AbrAlgorithmSimple from './abr-algorithm-simple';
import { abrGetUrl } from './abr-get-url';
import AbrLevel from './abr-level';
import { AbrManifest } from './abr-manifest';

/**
 * 多码率流处理
 * 自动+多清晰度切换
 */
class Multirate {
    private _eventEmitter: EventEmitter;
    private _config: AbrConfig;
    private _media: Media;
    private _next: number = 0;
    private _downloadSizeTotal: number = 0;
    private _downloadSize: number = 0;
    private _downloadStartTime: number = 0;
    private _keyCount: number = 0;
    private _index: number = 0;
    private _alg: IAbrAlgorithm;
    private _manifest: AbrManifest;
    private _autoLevelEnabled: boolean = false;

    /**
     * 构造函数
     * @param eventEmitter 事件抛出
     * @param config 配置
     * @param media media
     * @param src manifest/url
     */
    constructor(eventEmitter: EventEmitter, config: AbrConfig, media: Media, src: any) {
        this._eventEmitter = eventEmitter;
        this._config = config;
        this._media = media;
        this._manifest = new AbrManifest(src);
        let status: RealtimeStatus = {
            bufferedSec: () => { return this._media.bufferedSec(); },
            downloadSize: () => { return this._downloadSizeTotal; }
        }
        this._alg = new AbrAlgorithmSimple();
        this._alg.init(this._manifest, status);
        this._autoLevelEnabled = this._manifest.abrLevels.length > 0
    }

    /**
     * 初始化flv多码率
     */
    public init(): void {
        this._downloadSizeTotal = 0;
        this._downloadSize = 0;
        this._downloadStartTime = performance.now();

        // 当前流收到I帧计数
        this._keyCount = 0;
        this._index = this._next = 0;

        if (this.current) {
            if (this._autoLevelEnabled) {
                this._index = this._next = this._alg.nextLevel;
            }
            this._eventEmitter.emit(LasEvents.MANIFEST_PARSED, {
                levels: this._manifest.levels,
                currentLevel: this._index
            });
        }
    }

    /**
     * 回收
     */
    public destory(): void {
        if (this._alg) {
            this._alg.destroy();
            this._alg.removeAllListeners();
        }
    }

    /**
     * 有数据下载
     * @param size 数据大小
     */
    public onLoaderChunk(size: number): void {
        this._downloadSize += size;
        this._downloadSizeTotal += size;
    }

    /**
     * 有清晰度切换
     * @param index 清晰度index
     */
    public onLevelLoad(index: number) {
        if (this._manifest.levels.length && index >= 0 && index < this._manifest.levels.length) {
            this._keyCount = 0;
            this._index = index;
            this._downloadStartTime = performance.now();
            this._downloadSize = 0;
            this._alg.onLevelLoad(index);
        }
    }

    /**
     * 处理关键帧，是否切换码率
     * @param time flv tag timestamp
     */
    public onKeyFrame(time: number): SmoothLevelSwitchInfo | undefined {
        let levels = this._manifest.levels;
        this._keyCount++;

        if ((this._alg || this._next !== this._index) && this._keyCount > 1 && levels) {
            let next = this._index;
            if (this._next !== this._index) {
                // 平滑切换
                next = this._next;
            } else if (this._autoLevelEnabled) {
                // 自动
                let now = performance.now();
                this._alg.onGOP(this._media.bufferedSec(), this._downloadSize, (now - this._downloadStartTime) / 1000);
                this._downloadSize = 0;
                this._downloadStartTime = now;
                this._next = next = this._alg.nextLevel;
            } else {
                return;
            }
            // TEST:
            // next = (this._index + 1) % levels.length;
            if (next !== this._index) {
                return {
                    url: this._getRequestUrl(next, time),
                    level: next,
                    timestamp: time
                }
            }
        }
        return;
    }

    /**
     * 自动码率是否为开启状态
     */
    public get autoLevelEnabled(): boolean {
        return this._autoLevelEnabled;
    }

    /**
     * 清晰度列表
     */
    public get levels(): AbrLevel[] {
        return this._manifest.levels;
    }

    /**
     * 下一个下载的流index
     */
    public get nextLevel(): number {
        if (typeof this._next === 'number') {
            return this._next;
        } else {
            return this._index;
        }
    }

    /**
     * 在下一个关键帧位置切换流
     * 设置-1会启用自动码率
     */
    public set nextLevel(value: number) {
        if (value >= 0 && this._manifest.levels.length > value) {
            this._autoLevelEnabled = false;
            this._next = value;
        } else if (value === -1) {
            this._autoLevelEnabled = true;
        }
    }

    /**
     * get: 当前正在下载的流index
     */
    public get currentLevel(): number {
        return this._index;
    }

    /**
     * 立即切换码率，会清空buffer并从当前播放位置所在切片开始下载新的流
     * 设置-1会启用自动码率
     */
    public set currentLevel(value: number) {
        if (value >= 0 && this._manifest.levels.length > value) {
            this._autoLevelEnabled = false;
            this._index = this._next = value;
        } else if (value === -1) {
            this._autoLevelEnabled = true;
        }
    }

    /**
     * 当前level
     */
    private get current(): AbrLevel | undefined {
        return this._manifest.levels[this._index];
    }

    /**
     * 获取切换flv的请求地址
     * @param index 码率index
     * @param spts 切换时间戳，单位毫秒。大于0：关键帧pts；小于0：直播延迟
     */
    private _getRequestUrl(index: number, spts?: number): string {
        let url = '';
        let level = this._manifest.levels[index];
        if (level) {
            url = level.url;
        }
        return abrGetUrl(url, spts || this._config.defaultLiveDelay);
    }
}

export default Multirate;
