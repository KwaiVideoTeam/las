/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:42:49 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-08-04 12:18:49
 */
import { EventEmitter } from 'events';
import AbrLevel from './abr/abr-level';
import { ConfigHelper } from './config';
import { ErrorData, ErrorDetails, ErrorTypes } from './core/errors';
import LasEvents from './core/events';
import LasMain from './core/las-main';
import Media from './core/media';
import MSE from './core/mse';
import Monitor from './monitor/monitor';
import { LasConfig } from './types/core';
import { MP4RemuxResult } from './types/remux';
import BrowserHelper from './utils/browser-helper';
import { isSupported } from './utils/is-supported';
import { Log } from './utils/log';
import PlaybackRateManager from './utils/playback-rate-manager';

// 循环计时器间隔，毫秒
const MAIN_TIMER_INTERVAL = 200;

enum STAT {
    NONE,
    WAITING,
    SEEK,
    SELECT_BITRATE,
    INIT
}
/**
 * Las controller
 * @export
 * @class Las
 */
export default class Las extends EventEmitter {
    private tag: string = 'las';
    private _config: LasConfig;
    private _src: any;
    private _video?: HTMLVideoElement;
    private _mse!: MSE;
    private _lasMain?: LasMain;

    private _stat: STAT = STAT.INIT;
    private _audioCodecSwap: boolean = false;
    private _error?: ErrorDetails;
    private _audioCodec: string = '';
    private _recoverMediaErrorTime: number = 0;
    private _mainTimer: any;
    private _media: Media;

    private _nextLevel: any[] = [];
    private _mediaInfo: any;
    private _loadStopped: boolean = false;
    private _seekOnUpdateEnd: boolean = false;
    private _playingLevel?: number;
    private _startLevel?: number;
    private _monitor!: Monitor;

    private _playbackRateManager?: PlaybackRateManager;

    /**
     * 浏览器是否支持las.js
     */
    static isSupported(): boolean {
        return isSupported();
    }

    /**
     * las.js当前版本
     */
    static get version() {
        return __VERSION__;
    }

    /**
     * las.js的事件列表
     */
    static get Events() {
        return LasEvents;
    }

    /**
     * las.js的错误类型列表
     */
    static get ErrorTypes() {
        return ErrorTypes;
    }

    /**
     * las.js的错误详情列表
     */
    static get ErrorDetails() {
        return ErrorDetails;
    }

    /**
     * 构造函数
     * @param config LasConfig
     */
    constructor(config?: Partial<LasConfig>) {
        super();
        if (!this.off) {
            this.off = this.removeListener;
        }
        this._config = ConfigHelper.processConfig(config);
        this._media = new Media();
        if (!this._config) {
            setTimeout(() => {
                this._onError({
                    type: ErrorTypes.OTHER_ERROR,
                    details: ErrorDetails.CONFIG_ERROR,
                    fatal: true,
                    info: {
                        reason: 'config data error'
                    }
                });
            }, 0);
            return;
        }
        if (!Las.isSupported()) {
            setTimeout(() => {
                this._onError({
                    type: ErrorTypes.OTHER_ERROR,
                    details: ErrorDetails.UNSUPPORTED,
                    fatal: true,
                    info: {
                        reason: 'unsupported'
                    }
                });
            }, 0);
            return;
        }
        this._mainTimer = null;
        this._stat = STAT.INIT;
        this._startMainTimer();
        this._initMonitor();
        if (this._config.autoPlaybackRateConf) {
            this._playbackRateManager = new PlaybackRateManager(this._media, this._config.autoPlaybackRateConf);
        }
        Log.i(this.tag, Las.version, this._config);
    }

    /**
     * 绑定HTMLVideoElement
     * @param video HTMLVideoElement
     */
    public attachMedia(video: HTMLVideoElement): void {
        this._video = video;
        this._media.attachVideo(this._video);
        this._initMSE();
        this._bindVideoEvents();
    }

    /**
     * 开始加载视频
     * @param src src
     */
    public load(src: any = undefined): void {
        if (!this._video) {
            this._onError({
                type: ErrorTypes.OTHER_ERROR,
                details: ErrorDetails.NO_VIDEO,
                fatal: true,
                info: {
                    reason: 'no video attached'
                }
            });
        }
        this._playingLevel = undefined;
        this._monitor.reset();
        if (src) {
            this._src = src;
        }
        this._load();
    }

    /**
     * 恢复播放。从暂停、停止状态恢复
     */
    public resume() {
        Log.i(this.tag, 'call resume');
        if (this._loadStopped) {
            this._loadStopped = false;
            this._load();
        }
        if (this._video && this._video.paused) {
            this._video.play();
        }
    }

    /**
     * 回收资源
     */
    public destroy(): void {
        if (this._playbackRateManager) {
            this._playbackRateManager.destroy();
        }
        this._stopMonitor();
        this._stopMainTimer();
        this._unbindVideoEvents();
        this._stopVideo();
        this.removeAllListeners();
    }

    /**
     * 重新拉流
     */
    public refresh(reuseMSE: boolean = false): void {
        Log.i(this.tag, 'call refresh');
        if (this._config.autoRecoverMedia ||
            !(this._error === ErrorDetails.VIDEO_ERROR && (this._recoverSwapRemuxType() || this._recoverSwapAudioCodec()))
        ) {
            this._reload(reuseMSE);
        }
        this._error = undefined;
    }

    /**
     * 停止加载，内核停止，用于直播停止
     */
    public stopLoad(): void {
        Log.i(this.tag, 'call stopLoad');
        if (this._lasMain) {
            this._destroyLasMain();
            this._mse.endOfData();
            this._loadStopped = true;
            this._monitor.onStopLoad();
        }
        if (this._playbackRateManager) {
            this._playbackRateManager.stop();
        }
    }

    /**
     * 获取视频信息
     */
    public getMediaInfo(): any {
        return Object.assign({}, this._mediaInfo);
    }

    /**
     * 自动码率是否开启
     */
    public get autoLevelEnabled(): boolean {
        if (this._lasMain) {
            return this._lasMain.autoLevelEnabled;
        }
        return false;
    }

    /**
     * 可用流列表
     */
    public get levels(): AbrLevel[] {
        if (this._lasMain) {
            this._lasMain.levels.slice(0);
        }
        return [];
    }

    /**
     * 下一个下载的流index
     */
    public get nextLevel(): number {
        if (this._lasMain) {
            return this._lasMain.nextLevel;
        }
        return 0;
    }

    /**
     * 在下一个关键帧位置切换流
     * 设置-1会启用自动码率
     */
    public set nextLevel(value: number) {
        if (!this._verifyLevel(value) || !this._lasMain) {
            this.emit(LasEvents.LEVEL_SWITCH_FAILED, { level: value });
            return;
        }
        this._lasMain.nextLevel = value;
    }

    /**
     * get: 当前正在下载的流index
     */
    public get currentLevel(): number {
        if (this._lasMain) {
            return this._lasMain.currentLevel;
        }
        return 0;
    }

    /**
     * 立即切换码率，会清空buffer并从当前播放位置所在切片开始下载新的流
     * 设置-1会启用自动码率
     */
    public set currentLevel(value: number) {
        if (!this._verifyLevel(value) || !this._lasMain) {
            this.emit(LasEvents.LEVEL_SWITCH_FAILED, { level: value });
            return;
        }

        if (value === -1) {
            this._lasMain.nextLevel = value;
        } else {
            this._stat = STAT.SELECT_BITRATE;
            this._seekOnUpdateEnd = true;
            if (this._mse) {
                this._mse.flush();
            }
            this._lasMain.currentLevel = value;
        }
    }

    public get startLevel(): number {
        return typeof this._startLevel === 'undefined' ? -1 : this._startLevel;
    }

    public set startLevel(value: number) {
        this._startLevel = value;
    }

    public get monitorData() {
        if (this._monitor) {
            return this._monitor.data;
        }
        return;
    }

    private _reload(reuseMSE: boolean = false) {
        if ((this._lasMain && this._mse) || this._error) {
            if (this._lasMain) {
                this._startLevel = this._lasMain.currentLevel;
            }
            this._nextLevel = [];
            if (reuseMSE && this._mse) {
                this._mse.flush();
                this._internalSeek(0);
                this._seekOnUpdateEnd = true;
            } else {
                this._stopVideo();
                this._initMSE();
            }
            this._destroyLasMain();
            this._initLasMain();
            if (this._lasMain) {
                this._lasMain.load();
            }
        } else {
            Log.v(this.tag, 'transmuxer & mediaSource not ready');
        }
    }

    /**
     * 绑定video事件
     */
    private _bindVideoEvents(): void {
        if (this._video) {
            this._video.addEventListener('loadeddata', this._onVideoLoadeddata);
            this._video.addEventListener('canplay', this._onVideoCanplay);
            this._video.addEventListener('waiting', this._onVideoWaiting);
            this._video.addEventListener('playing', this._onVideoPlaying);
            this._video.addEventListener('ended', this._onVideoEnded);
            this._video.addEventListener('error', this._onVideoError);
        }
    }

    /**
     * 取消video绑定事件
     */
    private _unbindVideoEvents(): void {
        if (this._video) {
            this._video.removeEventListener('loadeddata', this._onVideoLoadeddata);
            this._video.removeEventListener('canplay', this._onVideoCanplay);
            this._video.removeEventListener('waiting', this._onVideoWaiting);
            this._video.removeEventListener('playing', this._onVideoPlaying);
            this._video.removeEventListener('ended', this._onVideoEnded);
            this._video.removeEventListener('error', this._onVideoError);
        }
    }

    /**
     * 处理HTMLVideoElelment事件-loadeddata
     */
    private _onVideoLoadeddata = (): void => {
        Log.i(this.tag, 'loadeddata');
        this._monitor.onLoadeddata();
    };

    /**
     * 处理HTMLVideoElelment事件-canplay
     */
    private _onVideoCanplay = (): void => {
        Log.v(this.tag, `canplay ${!!this._stat}`);
        this._monitor.onCanplay();
        if (this._video && this._stat !== STAT.NONE) {
            this._stat = STAT.NONE;
            this._checkLevelChange();
            if (!this._video.paused) {
                // 兼容waiting后不触发playing
                this._onVideoPlaying();
            }
        }
    };

    /**
     * 处理HTMLVideoElelment事件-waiting
     */
    private _onVideoWaiting = (): void => {
        if (!this._video) {
            return;
        }
        this._stat = this._stat || STAT.WAITING;
        const block = !this._video.seeking && this._stat === STAT.WAITING;
        if (block) {
            Log.i(this.tag, 'waiting currentTime:', this._video.currentTime);
        }
        this._monitor.onWaiting(block);
    };

    /**
     * 处理HTMLVideoElelment事件-playing
     */
    private _onVideoPlaying = (): void => {
        Log.i(this.tag, 'playing');
        if (!this._error) {
            this._stat = STAT.NONE;
            this._monitor.onPlaying();
        }
    };

    /**
     * 处理HTMLVideoElelment事件-ended
     */
    private _onVideoEnded = (): void => {
        this._monitor.onEnd();
        if (this._mse) {
            this._mse.flush();
        }
    };


    /**
     * 处理HTMLVideoElelment事件-error
     */
    private _onVideoError = (error: ErrorEvent): void => {
        Log.e(this.tag, 'video error', error);
        if (this._error) {
            return;
        }
        if (this._config.autoRecoverMedia) {
            const now = performance.now();
            // 尝试切换remux方式
            if ((!this._recoverMediaErrorTime || now - this._recoverMediaErrorTime > 3000) && this._recoverSwapRemuxType()) {
                this._recoverMediaErrorTime = now;
                return;
            }
            // 尝试替换audio codec string
            if (this._recoverSwapAudioCodec()) {
                return;
            }
        }

        let reason = 'video error';
        if (this._video && this._video.error) {
            reason += ` code:${this._video.error.code} message:${this._video.error.message}`;
        }
        this._onError({
            type: ErrorTypes.MEDIA_ERROR,
            details: ErrorDetails.VIDEO_ERROR,
            fatal: true,
            info: {
                reason
            }
        });
    };

    /**
     * 初始化MSE
     * @param video HTMLVideoElement
     */
    private _initMSE() {
        if (!this._video) {
            return;
        }
        let video = this._video;
        this._mse = new MSE(this._config);
        this._mse.attach(video);
        this._media.attachMSE(this._mse);

        this._mse.on(LasEvents.ERROR, data => {
            this._onError(data);
        });
        this._mse.on('updateend', () => {
            if (this._seekOnUpdateEnd && video.buffered.length) {
                Log.i(this.tag, 'seek on updateend');
                this._internalSeek(video.buffered.start(0));
                this._seekOnUpdateEnd = false;
            }
        });
        this._mse.on('resetDone', () => {
            this._seekOnUpdateEnd = true;
        });
    }

    /**
     * 销毁MSE
     */
    private _destroyMSE(): void {
        if (this._mse) {
            this._mse.removeAllListeners();
            this._mse.destroy();
        }
    }

    /**
     * 开始加载视频
     */
    private _load() {
        this._loadStopped = false;
        this._error = undefined;
        this._stat = STAT.INIT;
        this._nextLevel = [];
        this._media.reset();

        this._monitor.onLoad();
        if (this._lasMain) {
            this._destroyLasMain();
        }
        if (this._mse.hasSourceBuffer() || (this._video && this._video.error)) {
            this._resetMSE();
        }
        this._initLasMain();
        if (this._lasMain) {
            this._lasMain.load();
        }
        if (this._config.autoPlaybackRate && this._playbackRateManager) {
            this._playbackRateManager.start();
        }
    }

    /**
     * 重置MSE，清空video.src，重新绑定一个新的MSE
     */
    private _resetMSE = () => {
        this._seekOnUpdateEnd = false;
        if (this._video) {
            Log.i(this.tag, 'rebuild mse');
            URL.revokeObjectURL(this._video.src);
            this._video.src = '';
            this._video.removeAttribute('src');
            this._destroyMSE();
            this._initMSE();
        }
    }

    private _verifyLevel(value: number): boolean {
        return !!(this._lasMain &&
            this._lasMain.levels.length > 0 &&
            value < this._lasMain.levels.length &&
            value >= -1 &&
            this._video && !this._video.ended);
    }

    /**
     * 初始化LasMain
     */
    private _initLasMain(): void {
        this._lasMain = new LasMain(this._config, this._media);
        this._bindLasMainEvent(this._lasMain);
        this._lasMain.init(this._src, this._audioCodec);
    }

    /**
     * 销毁LasMain
     */
    private _destroyLasMain(): void {
        if (this._lasMain) {
            this._lasMain.removeAllListeners();
            this._lasMain.destroy();
            this._lasMain = undefined;
        }
    }

    /**
     * 绑定lasMain事件
     */
    private _bindLasMainEvent(lasMain: LasMain): void {
        const mse = this._mse;
        lasMain.on(LasEvents.MP4_SEGMENT, (data: MP4RemuxResult) => {
            if (mse) {
                mse.mediaSegment(data.segments);
            }
            if (this._monitor) {
                this._monitor.onSegment(data);
            }
        });

        lasMain.on(LasEvents.MEDIA_INFO, data => {
            const mediaInfo = Object.assign({}, data);
            this._monitor.onSegmentInit(mediaInfo);
            this.emit(LasEvents.MEDIA_INFO, mediaInfo);
            this._mediaInfo = mediaInfo;
            this._audioCodec = data.defaultAudioCodec || data.audioCodec;
            if (mse) {
                mse.mediaInit(mediaInfo);
            }
        });

        lasMain.on(LasEvents.ERROR, data => {
            this._onError(data);
        });

        lasMain.on(LasEvents.LOAD_END, () => {
            if (mse) {
                mse.endOfData();
            }
            this.emit(LasEvents.LOAD_END);
        });
        lasMain.on(LasEvents.LEVEL_SWITCH_FAILED, data => {
            this.emit(LasEvents.LEVEL_SWITCH_FAILED, data);
        });
        lasMain.on(LasEvents.LEVEL_SWITCHING, data => {
            if (!data.smooth && this._mse) {
                this._mse.flush();
            }
            this.emit(LasEvents.LEVEL_SWITCHING, { level: data.level });
            this._nextLevel = this._nextLevel
                .sort((a, b) => {
                    return a.startSec - b.startSec;
                })
                .filter(value => {
                    return value.startSec < data.startSec;
                });
            this._nextLevel.push(data);
        });
        lasMain.on(LasEvents.SCRIPT_PARSED, data => {
            this.emit(LasEvents.SCRIPT_PARSED, data);
        });
        lasMain.on(LasEvents.MANIFEST_PARSED, data => {
            if (typeof this._playingLevel === 'number') {
                lasMain.currentLevel = this._playingLevel;
                return;
            }

            if (typeof this._startLevel === 'number') {
                lasMain.currentLevel = this._startLevel;
            }
            data = Object.assign({ levels: this.levels.slice(0), currentLevel: this.currentLevel }, data);
            this._playingLevel = lasMain.currentLevel;
            Log.i(this.tag, LasEvents.MANIFEST_PARSED, data);
            this.emit(LasEvents.MANIFEST_PARSED, data);
        });
        lasMain.on(LasEvents.REPORT, data => {
            if (this._monitor) {
                this._monitor.onReport(data);
            }
        });
    }

    /**
     * 内部seek
     * @param time 时间
     */
    private _internalSeek(time: number): void {
        if (this._video) {
            this._video.currentTime = time;
        }
    }

    /**
     * 主循环
     * 用于处理buffer空隙和清晰度切换轮询检测
     */
    private _mainLoop = (): void => {
        const EPS = 1e-3;
        const video = this._video;

        if (video &&
            ((this._stat === STAT.WAITING && !video.seeking) ||
                this._stat === STAT.INIT ||
                this._stat === STAT.SEEK ||
                this._stat === STAT.SELECT_BITRATE) &&

            this._mse &&
            !this._mse.hasCleanUpTask() &&
            !video.ended
        ) {
            const currentTime = video.currentTime;
            const currentBuffer = this._media.currentBuffer(currentTime);
            let jumpTo: number | undefined = undefined;
            // 卡顿位置无buffer
            if (!currentBuffer || currentBuffer.end - currentTime < 1) {
                const nextBuffer = this._media.nextBuffer(currentTime);
                if (nextBuffer) {
                    Log.i(this.tag, 'try fix block-A');
                    jumpTo = nextBuffer.start;
                }
            } else if (video.buffered.length > 1 && currentBuffer.end - currentTime > 1) {
                // 多段buffer播放卡顿
                Log.i(this.tag, 'try fix block-B');
                jumpTo = currentBuffer.start;
            }

            if (jumpTo) {
                jumpTo = jumpTo + (BrowserHelper.isSafari ? 0.3 : EPS);
                this._internalSeek(jumpTo);
                Log.i(this.tag, `jump to ${jumpTo}`);
            }
        }
        if (this._nextLevel.length) {
            this._checkLevelChange();
        }
    };

    /**
     * 错误处理
     * @param data 错误数据
     */
    private _onError(data: ErrorData): void {
        Log.i(this.tag, `on error ${JSON.stringify(data)}`);
        if (!data.info.url && this.levels && this.levels[this.currentLevel]) {
            data.info.url = this.levels[this.currentLevel].url;
        }
        if (data.fatal) {
            this.stopLoad();
            this._stopMainTimer();
            if (data.details === ErrorDetails.VIDEO_ERROR || (this._video && this._video.error)) {
                this._destroyMSE();
            }
            if (!this._error) {
                this._error = data.details;
                this.emit(LasEvents.ERROR, data);
            }
        }
    }

    /**
     * 开始主循环计时器
     */
    private _startMainTimer(): void {
        if (this._mainTimer === null) {
            this._mainTimer = setInterval(this._mainLoop, MAIN_TIMER_INTERVAL);
        }
    }

    /**
     * 停止主循环计时器
     */
    private _stopMainTimer(): void {
        if (this._mainTimer) {
            clearInterval(this._mainTimer);
            this._mainTimer = null;
        }
    }

    /**
     * 处理清晰度切换是否完成
     */
    private _checkLevelChange(): void {
        const d = this._nextLevel[0];
        if (this._video && d && this._video.currentTime >= d.startSec && this._media.isTimeinBuffered(this._video.currentTime)) {
            this.emit(LasEvents.LEVEL_SWITCHED, { level: d.level });
            this._playingLevel = d.level;
            this._nextLevel.shift();
        }
    }

    private _stopVideo(): void {
        if (this._video) {
            URL.revokeObjectURL(this._video.src);
            this._video.src = '';
            this._video.removeAttribute('src');
            this._destroyLasMain();
            this._destroyMSE();
        }
    }

    private _initMonitor(): void {
        if (!this._monitor) {
            this._monitor = new Monitor(this._media);
            this._monitor.on(LasEvents.HEARTBEAT, value => {
                this.emit(LasEvents.HEARTBEAT, value);
            })
        }
    }

    private _stopMonitor(): void {
        if (this._monitor) {
            this._monitor.destroy();
            this._monitor.removeAllListeners();
        }
    }

    /**
     * 解码错误时尝试更换remux方式
     */
    private _recoverSwapRemuxType(): boolean {
        let gopRemux = this._config.gopRemux;
        this._config.gopRemux = true;

        if (gopRemux === this._config.gopRemux) {
            return false;
        } else {
            Log.i(this.tag, 'recover swap remux type');
            this._reload();
            return true;
        }
    }

    /**
     * 解码错误时尝试更换audio codec string
     */
    private _recoverSwapAudioCodec(): boolean {
        if (!this._audioCodecSwap && this._audioCodec) {
            if (this._audioCodec.indexOf('mp4a.40.5') !== -1) {
                this._audioCodec = 'mp4a.40.2';
            } else {
                this._audioCodec = 'mp4a.40.5';
            }
            this._audioCodecSwap = true;
            Log.i(this.tag, 'recover swap audio codec');
            this._reload();
            return true;
        } else {
            return false;
        }
    }
}
