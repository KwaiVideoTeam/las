/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:46:47 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:46:47 
 * 加载器相关类型定义
 */
/**
 * 下载状态数据
 */
export interface ILoaderStats {
    // load 时间点 performance.now
    requestStartTime: number;
    // 首包时间点 performance.now
    firstDataTime: number;
    // 下载完成时间 performance.now
    loadedTime: number;
    // 已下载字节数
    loadedSize: number;
    // 总字节数
    totalSize: number;
    // http status code
    httpStatusCode: number;
    // 重试次数
    retryCount: number;
    // 致命错误
    fatalError: boolean;
    // 错误信息
    errorMessage: string;
}

type ReqHeader = {
    header: string;
    value: any;
};

/**
 * 下载上下文
 */
export interface ILoaderContext {
    url: string;
    progress?: boolean;
    responseType?: string;
    credentials?: boolean;
    headers?: ReqHeader[];
    responseUrl?: string | null;
    responseHeader?: string | Headers;
}

/**
 * 下载器配置
 */
export interface ILoaderConfig {
    useFetch?: boolean;
    connectionTimeout?: number;
    transmissionTimeout?: number;
    maxRetry?: number;
    retryDelay?: number;
}

/**
 * 下载器回调
 */
export interface ILoaderCallback<T extends ILoaderContext> {
    onEnd: (target: ILoader<T>, data: string | ArrayBuffer | null) => void;
    onProgress?: (target: ILoader<T>, chunk: string | ArrayBuffer) => void;
    onError: (target: ILoader<T>) => void;
    onAbort: (target: ILoader<T>) => void;
}

/**
 * 下载器定义
 */
export interface ILoader<T extends ILoaderContext> {
    readonly context: T;
    readonly stats: ILoaderStats;
    destroy(): void;
    abort(): void;
    load(context: T, callbacks: ILoaderCallback<T>, config: ILoaderConfig): void;
}

/**
 * 内部下载器回调
 */
export interface IInternalLoaderCallback<T extends ILoaderContext> {
    onConnect: (status: number) => void;
    onEnd: (data: string | ArrayBuffer | null) => void;
    onError: (e: Error) => void;
    onProgress?: (chunk: ArrayBuffer) => void;
}

/**
 * 内部下载器定义
 */
export interface IInternalLoader<T extends ILoaderContext> {
    destroy(): void;
    abort(): void;
    load(context: T, callbacks: IInternalLoaderCallback<T>): void;
    tag: string;
}
