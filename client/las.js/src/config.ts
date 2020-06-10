/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:37:56 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:37:56 
 * 配置解析处理
 */
import { LasConfig } from './types/core';
import BrowserHelper from './utils/browser-helper';
import { Log, LOG_LEVEL } from './utils/log';

const DEFAULT_CONFIG: LasConfig = {
    webWorker: true, // 是否开启webworker
    appendErrorMaxRetry: 3, // mse append出错后重试次数
    credentials: false, // 请求是否带cookie
    defaultLiveDelay: -2000,
    debug: LOG_LEVEL.LEVEL_ERROR,
    connectionTimeout: 10000, // 流连接超时
    transmissionTimeout: 30000, // 流传输超时
    autoRecoverMedia: false, // 尝试自动恢复video.error
};

class ConfigHelper {
    /**
     * 处理传入的config
     * @param userConfig 传入config
     * @returns config
     */
    static processConfig(userConfig: any): LasConfig {
        const config: LasConfig = Object.assign({}, DEFAULT_CONFIG);
        Object.assign(config, userConfig);

        if (!(window as any).Worker) {
            config.webWorker = false;
        }
        if (config.debug) {
            Log.level(config.debug);
        }
        config.gopRemux = BrowserHelper.isSafari;
        return config;
    }
}

export { DEFAULT_CONFIG, ConfigHelper };

