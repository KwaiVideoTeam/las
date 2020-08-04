/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:50:30 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-08-04 12:20:04
 * 下载器
 */
import { IInternalLoader, IInternalLoaderCallback, ILoader, ILoaderCallback, ILoaderConfig, ILoaderContext, ILoaderStats } from '../types/io';
import { Log } from '../utils/log';
import FetchLoader from './fetch';
import { XHR } from './xhr';

let ChunkLoader: any;

/**
 * 加载器
 */
export default class Loader<T extends ILoaderContext> implements ILoader<T> {
    public tag: string = 'loader';
    private _context!: T;
    private _loader?: IInternalLoader<T>;
    private _callbacks?: ILoaderCallback<T>;
    private _config: ILoaderConfig;
    private _loaderCallback!: IInternalLoaderCallback<T>;
    private _stats!: ILoaderStats;
    private _retryDelay: number = 0;
    private _loading: boolean = false;
    private _aborted: boolean = false;
    private _requestTimeout: any;
    private _transTimer: any;
    private _retryTimeout: any;
    private _progressTime: number = 0;

    constructor() {
        this._config = {
            useFetch: false,
            connectionTimeout: 0,
            transmissionTimeout: 0,
            maxRetry: 0,
            retryDelay: 0
        };
        this._loaderCallback = {
            onConnect: this._onConnect,
            onProgress: this._onProgress,
            onEnd: this._onEnd,
            onError: this._onError
        };
    }

    /**
     * 开始下载
     * @param context 下载上下文信息
     * @param callbacks 下载回调
     * @param config 下载配置
     */
    public load(context: T, callbacks: ILoaderCallback<T>, config: ILoaderConfig): void {
        this._context = context;
        this._callbacks = callbacks;
        this._config = config || this._config;

        this._stats = {
            requestStartTime: performance.now(),
            retryCount: 0,
            loadedSize: 0,
            httpStatusCode: 0,
            firstDataTime: 0,
            loadedTime: 0,
            totalSize: 0,
            errorMessage: '',
            fatalError: false
        };
        if (this._config.retryDelay) {
            this._retryDelay = this._config.retryDelay;
        }

        this._loadInternal();
    }

    /**
     * 取消当前下载
     */
    public abort(): void {
        this._stopTimer();
        this._abortInternal();
    }

    /**
     * 销毁loader
     */
    public destroy(): void {
        this._stopTimer();
        this._abortInternal();
        this._destroyInternalLoader();
        this._callbacks = undefined;
    }

    /**
     * 下载状态信息
     */
    public get stats(): ILoaderStats {
        return this._stats;
    }

    /**
     * 下载上下文
     */
    public get context(): T {
        return this._context;
    }

    /**
     * 获取流式加载Loader类
     * @param useFetch 是否使用fetch
     * @returns class
     */
    private _getInternalLoader(useFetch: boolean) {
        if (typeof ChunkLoader !== 'undefined') {
            return ChunkLoader;
        }
        ChunkLoader = null;
        if (FetchLoader.isSupported()) {
            ChunkLoader = FetchLoader;
        } else if (XHR.isSupportedChunk()) {
            ChunkLoader = XHR;
        }
        return ChunkLoader;
    }

    /**
     * 销毁内部loader
     */
    private _destroyInternalLoader(): void {
        if (this._loader) {
            this._loader.destroy();
            this._loader = undefined;
        }
    }

    /**
     * 开始加载，非流式处理优先使用xhr
     */
    private _loadInternal(): void {
        this._loading = true;
        this._aborted = false;
        const stats = this._stats;
        stats.httpStatusCode = 0;
        stats.firstDataTime = 0;
        stats.loadedSize = 0;
        if (this._retryTimeout) {
            clearTimeout(this._retryTimeout);
            this._retryTimeout = null;
        }
        if (this._context.progress) {
            this._loader = new (this._getInternalLoader(!!this._config.useFetch))();
        } else {
            this._loader = new XHR();
        }
        if (!this._loader) {
            return;
        }
        // 连接超时
        if (this._config.connectionTimeout) {
            this._requestTimeout = setTimeout(this._onTimeout, this._config.connectionTimeout);
        }
        this._loader.load(this._context, this._loaderCallback);
    }

    private _abortInternal(): void {
        if (this._callbacks && this._callbacks.onAbort && !this._aborted && this._loading) {
            this._callbacks.onAbort(this);
        }
        this._aborted = true;
        if (this._loader) {
            this._loader.abort();
        }
    }

    /**
     * 停止所有计时器
     * 连接超时、重试延迟、传输超时
     */
    private _stopTimer(): void {
        if (this._requestTimeout) {
            clearTimeout(this._requestTimeout);
            this._requestTimeout = null;
        }
        if (this._retryTimeout) {
            clearTimeout(this._retryTimeout);
            this._retryTimeout = null;
        }
        this._stopTransmissionTimer();
    }

    private _onConnect = (status: number): void => {
        if (this._requestTimeout) {
            clearTimeout(this._requestTimeout);
            this._requestTimeout = null;
        }
        this._startTransmissionTimer();
        this._stats.httpStatusCode = status;
        this._stats.firstDataTime = Math.max(this._stats.requestStartTime, performance.now());
    }
    private _onProgress = (chunk: ArrayBuffer): void => {
        const stats = this._stats;
        this._progressTime = performance.now();
        if (this._callbacks && this._callbacks.onProgress) {
            this._callbacks.onProgress(this, chunk);
        }
        stats.loadedSize += chunk.byteLength;
    }

    private _onEnd = (responseData: string | ArrayBuffer | null): void => {
        this._stopTimer();
        const stats = this._stats;
        if (responseData) {
            if (typeof responseData === 'string') {
                stats.totalSize = stats.loadedSize = responseData.length || 0;
            } else {
                stats.totalSize = stats.loadedSize = responseData.byteLength || 0;
            }
        } else {
            stats.totalSize = stats.loadedSize;
        }
        stats.loadedTime = Math.max(stats.firstDataTime, performance.now());
        this._loading = false;
        if (this._callbacks) {
            this._callbacks.onEnd(this, responseData);
        }
    }

    private _onError = (e: Error): void => {
        Log.i(this.tag, e);
        this._stopTimer();
        this._destroyInternalLoader();
        const stats = this._stats;
        const config = this._config;
        this._loading = false;

        stats.fatalError = !config.maxRetry || (stats.retryCount >= config.maxRetry || !config.maxRetry);
        stats.errorMessage = e.message || 'load error';
        if (this._callbacks && this._callbacks.onError) {
            this._callbacks.onError(this);
        }
        if (stats.fatalError) {
            return;
        }
        stats.retryCount++;
        if (this._callbacks) {
            if (this._retryDelay) {
                this._retryTimeout = setTimeout(this._loadInternal.bind(this), this._retryDelay);
                this._retryDelay = 2 * this._retryDelay;
            } else {
                this._loadInternal();
            }
        }
    }

    /**
     * 处理超时
     */
    private _onTimeout = (): void => {
        this._loading = false;
        this._abortInternal();
        const e = new Error('timeout');
        this._onError(e);
    }

    /**
     * 开始传输超时计时器
     */
    private _startTransmissionTimer(): void {
        this._stopTransmissionTimer();
        this._progressTime = performance.now();
        let timeout = this._config.transmissionTimeout || 0;
        if (timeout) {
            this._transTimer = setInterval(() => {
                if (performance.now() - this._progressTime > timeout) {
                    this._onTimeout();
                }
            }, 1000);
        }
    }

    /**
     * 停止传输超时计时器
     */
    private _stopTransmissionTimer(): void {
        if (this._transTimer) {
            clearInterval(this._transTimer);
            this._transTimer = null;
        }
    }
}
