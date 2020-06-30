/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:37:56 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-30 17:34:44
 * 配置解析处理
 */
import { AutoPlaybackRateConfig, LasConfig } from './types/core';
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
    autoPlaybackRate: true,
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
        this._initPlayBackRateRule(config);
        return config;
    }

    /**
     * 初始化自动倍速配置
     * @param config config
     */
    static _initPlayBackRateRule(config: LasConfig) {
        const conf = config.autoPlaybackRateConf;
        if (conf) {
            let rule = conf.rule;
            if (rule && Array.isArray(rule)) {
                rule = rule.filter(item => {
                    return item.upper > item.lower && item.rate > 0;
                });
                // 速度控制规则，按playbackRate倒序
                rule.sort((a: any, b: any) => {
                    return b.rate - a.rate;
                });
                if (rule.length > 1) {
                    conf.rule = rule;
                    config.autoPlaybackRateConf = conf;
                    return;
                }
            }
        } else {
            let delay = -config.defaultLiveDelay / 1000;
            let abrPlabackRateConf: AutoPlaybackRateConfig = {
                startDelay: delay,
                interval: 0.2,
                rule: [
                    { rate: 1.1, lower: delay + 1, upper: Number.MAX_SAFE_INTEGER },
                    { rate: 1, lower: 0, upper: delay }
                ]
            };
            config.autoPlaybackRateConf = abrPlabackRateConf;
        }
    }
}

export { DEFAULT_CONFIG, ConfigHelper };

