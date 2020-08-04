// Event Keys
type K_MEDIA_INFO = 'mediaInfo';
type K_SCRIPT_PARSED = 'scriptParsed';
type K_LOAD_END = 'loadEnd';
type K_ERROR = 'lasError';
type K_LEVEL_SWITCH_FAILED = 'levelSwitchFailed';
type K_LEVEL_SWITCHING = 'levelSwitching';
type K_LEVEL_SWITCHED = 'levelSwitched';
type K_MANIFEST_PARSED = 'manifestParsed';
type K_HEARTBEAT = 'heartbeat';

// Error Type Keys
type K_NETWORK_ERROR = 'networkError';
type K_MEDIA_ERROR = 'mediaError';
type K_MUX_ERROR = 'muxError';
type K_OTHER_ERROR = 'otherError';
type K_MSE_ERROR = 'mseError';

// 网络错误
type D_LOAD_ERROR = 10;
// 网络超时错误
type D_LOAD_ERROR_TIMEOUT = 11;
// HTMLMediaElement发生错误
type D_VIDEO_ERROR = 101;
// 浏览器不支持
type D_UNSUPPORTED = 102;
// 配置文件错误
type D_CONFIG_ERROR = 103;
// 传入视频信息错误
type D_MANIFEST_ERROR = 104;
// 找不到video
type D_NO_VIDEO = 105;
// mediaSourceError 初始化MSE错误，MediaSource未定义时触发
type D_MEDIASOURCE_ERROR = 200;
// addSourceBufferError MSE增加SourceBuffer失败
type D_ADDSOURCEBUFFER_ERROR = 201;
// sourceBufferError MSE的SourceBuffer触发错误
type D_SOURCEBUFFER_ERROR = 202;
// endOfStreamError MSE结束流错误
type D_ENDOFSTREAM_ERROR = 203;
// appendBufferError MSE填充buffer错误
type D_APPENDBUFFER_ERROR = 204;
// 解封装错误
type D_PARSING_ERROR = 301;
// 重新封装错误
type D_REMUX_ERROR = 302;
// 重新封装alloc mdat存储错误
type D_REMUX_ALLOC_ERROR = 303;

declare namespace Las {

    type Level = {
        url: string,
        bitrate: number,
        maxBitrate: number,
        avgBitrate: number,
        qualityType: string,
        qualityLabel: string,
        id: number,
        codec: string,
    };

    type Config = {
        webWorker?: boolean;
        /**
         * 请求credentials，跨域是否带cookies
         */
        credentials?: boolean;
        /**
         * 流连接超时(毫秒)
         */
        connectionTimeout?: number;
        /**
         * 流传输超时(毫秒)
         */
        transmissionTimeout?: number;
        /**
         * 默认延迟
         */
        defaultSpts?: number;
        /**
         * 尝试自动恢复video错误
         */
        autoRecoverMedia: boolean;
    };

    /**
     * 错误事件数据
     */
    export type ErrorData = {
        /**
         * Las.ErrorTypes
         */
        type: string,
        /**
         * Las.ErrorDetails
         */
        details: number,
        fatal: boolean,
        info: {
            reason: string,
            url?: string,
            httpStatusCode?: number
        }
    }
}
declare class Las {
    /**
     * las.js当前版本
     */
    static version: string;

    /**
     * 浏览器是否支持las.js
     */
    static isSupported(): boolean;

    /**
     * las.js的事件列表
     */
    static Events: {
        MEDIA_INFO: K_MEDIA_INFO,
        SCRIPT_PARSED: K_SCRIPT_PARSED,
        LOAD_END: K_LOAD_END,
        ERROR: K_ERROR,
        LEVEL_SWITCH_FAILED: K_LEVEL_SWITCH_FAILED,
        LEVEL_SWITCHING: K_LEVEL_SWITCHING,
        LEVEL_SWITCHED: K_LEVEL_SWITCHED,
        MANIFEST_PARSED: K_MANIFEST_PARSED
    }

    /**
     * las.js的错误类型列表
     */
    static ErrorTypes: {
        NETWORK_ERROR: K_NETWORK_ERROR;
        MEDIA_ERROR: K_MEDIA_ERROR;
        MUX_ERROR: K_MUX_ERROR;
        OTHER_ERROR: K_OTHER_ERROR;
        MSE_ERROR: K_MSE_ERROR;
    }

    /**
     * las.js的错误详情列表
     */
    static ErrorDetails: {
        LOAD_ERROR: D_LOAD_ERROR,
        LOAD_ERROR_TIMEOUT: D_LOAD_ERROR_TIMEOUT,
        VIDEO_ERROR: D_VIDEO_ERROR,
        UNSUPPORTED: D_UNSUPPORTED,
        CONFIG_ERROR: D_CONFIG_ERROR,
        NO_VIDEO: D_NO_VIDEO,
        MANIFEST_ERROR: D_MANIFEST_ERROR,
        MEDIASOURCE_ERROR: D_MEDIASOURCE_ERROR,
        ADDSOURCEBUFFER_ERROR: D_ADDSOURCEBUFFER_ERROR,
        SOURCEBUFFER_ERROR: D_SOURCEBUFFER_ERROR,
        ENDOFSTREAM_ERROR: D_ENDOFSTREAM_ERROR,
        APPENDBUFFER_ERROR: D_APPENDBUFFER_ERROR,
        PARSING_ERROR: D_PARSING_ERROR,
        REMUX_ERROR: D_REMUX_ERROR,
        REMUX_ALLOC_ERROR: D_REMUX_ALLOC_ERROR,
    }

    /**
     * 构造函数
     * @param config LasConfig
     */
    constructor(config?: Partial<Las.Config>);

    /**
     * 自动码率是否开启
     */
    readonly autoLevelEnabled: boolean;

    /**
     * 可用流列表
     */
    readonly levels: Las.Level;

    /**
     * get: 当前正在下载的流index
     * set: 立即切换码率，会清空buffer并从当前播放位置所在切片开始下载新的流
     * 
     * 设置-1会启用自动码率
     */
    currentLevel: number;
    /**
     * get: 下一个下载的流index
     * set: 在下一个关键帧位置切换流
     * 
     * 设置-1会启用自动码率
     */
    nextLevel: number;

    /**
     * 起播码率index
     */
    startLevel: number;
    /**
     * 开始加载视频
     * @param src 视频url或manifest内容
     */
    load(src: any): void;

    /**
     * 绑定HTMLVideoElement
     * @param videoElement HTMLVideoElement
     */
    attachMedia(videoElement: HTMLVideoElement): void;

    /**
     * 停止加载，内核停止，用于直播停止
     */
    stopLoad(): void;
    /**
     * 回收资源
     */
    destroy(): void;
    /**
     * 获取视频信息
     */
    getMediaInfo(): any;
    /**
     * 恢复播放。从暂停、停止状态恢复
     */
    resume(): void;
    /**
     * 重新拉流
     */
    refresh(): void;

    /**
     * event listener
     */
    on(event: K_ERROR, callback: (data: Las.ErrorData) => void): void;
    on(event: K_MEDIA_INFO, callback: (data: { type: string, value: any }) => void): void;
    on(event: K_SCRIPT_PARSED, callback: (data: { code: number, reason: string }) => void): void;
    on(event: K_LOAD_END, callback: () => void): void;
    on(event: K_MANIFEST_PARSED, callback: (data: { levels: number[], currentLevel: number }) => void): void;
    on(event: K_LEVEL_SWITCH_FAILED, callback: (data: { level: number }) => void): void;
    on(event: K_LEVEL_SWITCHING, callback: (data: { level: number }) => void): void;
    on(event: K_LEVEL_SWITCHED, callback: (data: { level: number }) => void): void;
    on(event: K_HEARTBEAT, callback: (data: { totalReceive: number, speed: number, videoDataRate: number, audioDataRate: number, decodedFPS: number, droppedFPS: number, decodedFrames: number, droppedFrames: number }) => void): void;

    once(event: K_ERROR, callback: (data: Las.ErrorData) => void): void;
    once(event: K_MEDIA_INFO, callback: (data: { type: string, value: any }) => void): void;
    once(event: K_SCRIPT_PARSED, callback: (data: { code: number, reason: string }) => void): void;
    once(event: K_LOAD_END, callback: () => void): void;
    once(event: K_MANIFEST_PARSED, callback: (data: { levels: number[], currentLevel: number }) => void): void;
    once(event: K_LEVEL_SWITCH_FAILED, callback: (data: { level: number }) => void): void;
    once(event: K_LEVEL_SWITCHING, callback: (data: { level: number }) => void): void;
    once(event: K_LEVEL_SWITCHED, callback: (data: { level: number }) => void): void;
    once(event: K_HEARTBEAT, callback: (data: { totalReceive: number, speed: number, videoDataRate: number, audioDataRate: number, decodedFPS: number, droppedFPS: number, decodedFrames: number, droppedFrames: number }) => void): void;

    off(event: string, callback: (...params: any[]) => void): void;
    removeAllListeners(event?: string | symbol): this;
}
export as namespace Las;
export = Las;
