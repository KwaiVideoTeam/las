/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:38:33 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:39:19
 * las.js中的错误相关定义
 */
/**
 * las.js错误类型定义
 */
export enum ErrorTypes {
    // 网络错误
    NETWORK_ERROR = 'networkError',
    // video错误
    MEDIA_ERROR = 'mediaError',
    // 转封装错误
    MUX_ERROR = 'muxError',
    // 其他错误
    OTHER_ERROR = 'otherError',
    // MSE错误
    MSE_ERROR = 'mseError'
};

/**
 * las.js具体错误定义
 */
export enum ErrorDetails {
    // 网络错误
    LOAD_ERROR = 10,
    // 网络超时错误
    LOAD_ERROR_TIMEOUT = 11,
    // HTMLMediaElement发生错误
    VIDEO_ERROR = 101,
    // 浏览器不支持
    UNSUPPORTED = 102,
    // 配置文件错误
    CONFIG_ERROR = 103,
    // 传入视频信息错误
    MANIFEST_ERROR = 104,
    // 找不到video
    NO_VIDEO = 105,
    // mediaSourceError 初始化MSE错误，MediaSource未定义时触发
    MEDIASOURCE_ERROR = 200,
    // addSourceBufferError MSE增加SourceBuffer失败
    ADDSOURCEBUFFER_ERROR = 201,
    // sourceBufferError MSE的SourceBuffer触发错误
    SOURCEBUFFER_ERROR = 202,
    // endOfStreamError MSE结束流错误
    ENDOFSTREAM_ERROR = 203,
    // appendBufferError MSE填充buffer错误
    APPENDBUFFER_ERROR = 204,
    // 解封装错误
    DEMUX_ERROR = 301,
    // 重新封装错误
    REMUX_ERROR = 302,
    // 重新封装alloc mdat存储错误
    REMUX_ALLOC_ERROR = 303,
};

/**
 * las.js错误事件返回数据定义
 */
export type ErrorData = {
    type: ErrorTypes,
    details: ErrorDetails,
    fatal: boolean,
    info: {
        reason: string,
        url?: string,
        httpStatusCode?: number
    }
}