/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:45:39 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:45:39 
 * log工具
 */
const GLOBAL_TAG = 'las.js-';
const FORCE_GLOBAL_TAG = true;

/**
 * 处理log参数
 * @param tag tag
 * @param msg msg
 */
function formatter(tag: string, msg: any[]): any[] {
    if (!msg || msg.length === 0) {
        msg = [tag];
        tag = '';
    }
    tag = FORCE_GLOBAL_TAG ? GLOBAL_TAG + (tag ? '::' + tag : '') : tag || GLOBAL_TAG;
    msg.unshift('[' + tag + '] > ');

    return msg;
}

enum LOG_LEVEL {
    LEVEL_ERROR = 'e', // 日志等级-error，只输出error日志
    LEVEL_WARN = 'w', // 日志等级-warn，输出error，warn日志
    LEVEL_INFO = 'i', // 日志等级-info，输出error, warn, info日志
    LEVEL_DEBUG = 'd', // 日志等级-debug，输出error, warn, info, debug日志
    LEVEL_VERBOSE = 'v' // 日志等级-verbose，输出error, warn, info, debug, verbose日志
}

/**
 * log信息输出
 */
class Log {
    public static ENABLE_ERROR: boolean = true;
    public static ENABLE_WARN: boolean = false;
    public static ENABLE_INFO: boolean = false;
    public static ENABLE_DEBUG: boolean = false;
    public static ENABLE_VERBOSE: boolean = false;

    /**
     * 设置日志输出等级
     * @param l 日志等级
     */
    static level(l: LOG_LEVEL) {
        Log.ENABLE_ERROR = Log.ENABLE_WARN = Log.ENABLE_INFO = Log.ENABLE_DEBUG = Log.ENABLE_VERBOSE = false;
        switch (l) {
            case LOG_LEVEL.LEVEL_WARN:
                Log.ENABLE_ERROR = Log.ENABLE_WARN = true;
                break;
            case LOG_LEVEL.LEVEL_INFO:
                Log.ENABLE_ERROR = Log.ENABLE_WARN = Log.ENABLE_INFO = true;
                break;
            case LOG_LEVEL.LEVEL_DEBUG:
                Log.ENABLE_ERROR = Log.ENABLE_WARN = Log.ENABLE_INFO = Log.ENABLE_DEBUG = true;
                break;
            case LOG_LEVEL.LEVEL_VERBOSE:
                Log.ENABLE_ERROR = Log.ENABLE_WARN = Log.ENABLE_INFO = Log.ENABLE_DEBUG = Log.ENABLE_VERBOSE = true;
                break;
            default:
                Log.ENABLE_ERROR = true;
                break;
        }
    }

    /**
     * error日志
     * @param tag tag
     * @param msg 日志信息
     */
    static e(tag: string, ...msg: any[]) {
        if (!Log.ENABLE_ERROR) {
            return;
        }
        const out: any = formatter(tag, msg);
        (console.error || console.warn || console.log).apply(console, out);
    }

    /**
     * warn日志
     * @param tag tag
     * @param msg 日志信息
     */
    static w(tag: string, ...msg: any[]) {
        if (!Log.ENABLE_WARN) {
            return;
        }
        const out: any = formatter(tag, msg);
        (console.warn || console.log).apply(console, out);
    }

    /**
     * info日志
     * @param tag tag
     * @param msg 日志信息
     */
    static i(tag: string, ...msg: any[]) {
        if (!Log.ENABLE_INFO) {
            return;
        }
        const out: any = formatter(tag, msg);
        (console.info || console.log).apply(console, out);
    }

    /**
     * debug日志
     * @param tag tag
     * @param msg 日志信息
     */
    static d(tag: string, ...msg: any[]) {
        if (!Log.ENABLE_DEBUG) {
            return;
        }
        const out: any = formatter(tag, msg);
        (console.debug || console.log).apply(console, out);
    }

    /**
     * verbose日志
     * @param tag tag
     * @param msg 日志信息
     */
    static v(tag: string, ...msg: any[]) {
        if (!Log.ENABLE_VERBOSE) {
            return;
        }
        const out: any = formatter(tag, msg);
        console.log.apply(console, out);
    }
}

export { Log, LOG_LEVEL };
