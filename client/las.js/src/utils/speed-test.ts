/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:45:57 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:45:57 
 * 测速工具
 */
import Loader from "../io/loader";
import { ILoader, ILoaderCallback, ILoaderConfig, ILoaderContext } from "../types/io";

export type SpeedTestContext = {
    url: string,
    timeout: number,
};

/**
 * 测速结果
 */
export type SpeedTestResult = {
    // 下载数据大小
    loaded: number,
    // 测试总耗时
    duration: number,
    // 首包时间点
    firstPackageDuration: number,
    // 测试成功
    succeeded: boolean,
};

export type SpeedTestEnded = (context: SpeedTestContext, result: SpeedTestResult) => void;

export interface ISpeedTestCallback {
    onEnd: SpeedTestEnded;
}

// 单次测速用时上限
const MAX_TIMEOUT = 10000;

/**
 * 测速工具
 * 测速时间上线10s
 */
export class SpeedTest {
    private _context?: SpeedTestContext;
    private _result?: SpeedTestResult;
    private _callback?: ISpeedTestCallback;

    private _loader?: ILoader<ILoaderContext>;
    private _loaderConf: ILoaderConfig;
    private _loaderCallbacks: ILoaderCallback<ILoaderContext>;

    private _timer: any;
    private _startTime: number = 0;

    constructor() {
        this._loaderConf = {
            connectionTimeout: 0,
            transmissionTimeout: 0,
            maxRetry: 0,
            retryDelay: 0,
            useFetch: true
        };

        this._loaderCallbacks = {
            onProgress: this._onProgress,
            onError: this._onLoaderError,
            onEnd: this._onLoaderEnd,
            onAbort: this._onAbort,
        };

    }

    /**
     * 开始测速
     * @param context 测速上下文
     * @param callback 测速回调
     */
    public start(context: SpeedTestContext, callback: ISpeedTestCallback): void {
        this._context = context;
        this._callback = callback;
        this._result = {
            loaded: 0,
            duration: 0,
            firstPackageDuration: 0,
            succeeded: true,
        }
        this._startTime = performance.now();
        if (this._loader) {
            this._loader.destroy();
        }
        const timeout = Math.min(MAX_TIMEOUT, context.timeout);
        this._loaderConf.connectionTimeout = timeout;
        const loaderContext = {
            url: context.url,
            progress: true,
            responseType: 'arraybuffer'
        };
        this._loader = new Loader();
        this._startTimer(timeout);
        this._loader.load(loaderContext, this._loaderCallbacks, this._loaderConf);
    }

    /**
     * 取消测速
     */
    public cancel() {
        this._stopTimer();
        if (this._loader) {
            this._loader.destroy();
        }
    }

    /**
     * 销毁
     */
    public destroy() {
        this.cancel();
    }

    /**
     * 开始测速计时
     * @param timeout 时长
     */
    private _startTimer(timeout: number) {
        this._timer = setTimeout(() => this._testEnd(), timeout);
    }

    /**
     * 停止测速计时器
     */
    private _stopTimer(): void {
        clearTimeout(this._timer);
    }

    /**
     * 测试结束，停止加载并回调
     */
    private _testEnd = (): void => {
        this._stopTimer();
        if (this._loader) {
            this._loader.destroy();
        }
        if (this._context && this._result && this._callback) {
            this._result.firstPackageDuration = Math.round(this._result.firstPackageDuration);
            this._result.duration = Math.round(performance.now() - this._startTime);
            this._callback.onEnd(this._context, this._result);
        }
    }

    private _onProgress = (target: ILoader<ILoaderContext>, data: string | ArrayBuffer): void => {
        if (this._result) {
            this._result.firstPackageDuration = target.stats.firstDataTime ? target.stats.firstDataTime - target.stats.requestStartTime : 0;
            this._result.loaded = target.stats.loadedSize;
        }
    }

    private _onLoaderError = (): void => {
        if (this._result) {
            this._result.succeeded = false;
        }
        this._testEnd();
    }

    private _onLoaderEnd = (): void => {
        this._testEnd();
    }
    private _onAbort = (): void => { }
}
