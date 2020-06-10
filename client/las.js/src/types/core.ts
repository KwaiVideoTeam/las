/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:47:40 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:47:40 
 */
import { LOG_LEVEL } from '../utils/log';

export type LoadConfig = {
};

export type BaseConfig = {
    credentials: boolean;
    gopRemux?: boolean;
    debug: LOG_LEVEL;
    audioCodec?: string;
    webWorker: boolean; // 是否开启webworker
    autoRecoverMedia: boolean;
} & LoadConfig;

export type MSEConfig = {
    appendErrorMaxRetry: number;
} & BaseConfig;

export type StreamLoaderConfig = {
    connectionTimeout: number; // 流连接超时
    transmissionTimeout: number; // 流传输超时
};

export type AbrConfig = {
    defaultLiveDelay: number;
} & BaseConfig;


export type LasMainConfig = {
    hasAudio?: boolean;
    hasVideo?: boolean;
} & BaseConfig &
    StreamLoaderConfig &
    AbrConfig;;

export type LasConfig = {
} & MSEConfig &
    LasMainConfig;

export type TimeRange = {
    start: number;
    end: number;
};

export type SmoothLevelSwitchInfo = {
    url: string;
    level: number;
    timestamp: number;
};
