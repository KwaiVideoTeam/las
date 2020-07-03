/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:51:20 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 16:56:40
 * Adobe Flash Video File Format Specification Version 10.1
 * https://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
 * FraunhoferIIS_Application-Bulletin_AAC-Transport-Formats.pdf
 * AudioSpecificConfig解析处理
 */

import BrowserHelper from "../utils/browser-helper";

const SAMPLING_FREQUENCY_LIST = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

type AACInfo = {
    config: number[],
    samplerate: number,
    channelCount: number,
    codec: string,
    defaultCodec: string
}
export function parseAudioSpecificConfig(data: Uint8Array, offset: number, defaultCodec: string = ''): undefined | AACInfo {
    if (data.byteLength < offset + 3) {
        // 数据长度不对
        return;
    }
    let audioObjectType = data[offset + 2] >>> 3, // 5 bits
        samplingFrequencyIndex = (data[offset + 2] & 0x07) << 1 | data[offset + 3] >>> 7, // 4 bits
        extensionSamplingFrequencyIndex = samplingFrequencyIndex,
        channelConfiguration = (data[offset + 3] & 0x78) >>> 3, // 4 bits
        config: number[] = [];

    defaultCodec = defaultCodec || `mp4a.40.${audioObjectType}`;

    if (samplingFrequencyIndex < 0 || samplingFrequencyIndex >= SAMPLING_FREQUENCY_LIST.length || channelConfiguration < 0 || channelConfiguration >= 8) {
        // 数据读取错误
        return;
    }

    if (BrowserHelper.isFirefox) {
        if (samplingFrequencyIndex >= 6) {
            audioObjectType = 5;
            extensionSamplingFrequencyIndex = samplingFrequencyIndex - 3;
        } else {
            audioObjectType = 2;
        }
    } else if (BrowserHelper.isAndroid) {
        audioObjectType = 2;
    } else {
        audioObjectType = 5;
        if (defaultCodec === 'mp4a.40.29' || defaultCodec === 'mp4a.40.5') {
            extensionSamplingFrequencyIndex = samplingFrequencyIndex - 3;
        } else {
            if (defaultCodec === 'mp4a.40.2' && samplingFrequencyIndex >= 6 && channelConfiguration === 1) {
                audioObjectType = 2;
            }
        }
    }
    // audioObjectType(5) + samplingFrequencyIndex(3 . 1) + channelConfiguration(4) + extensionSamplingFrequencyIndex(3 . 1)
    config[0] = (audioObjectType << 3) | ((samplingFrequencyIndex >> 1) & 0x07);
    config[1] = ((samplingFrequencyIndex << 7) & 0x80) | (channelConfiguration << 3);
    if (audioObjectType === 5) {
        config[1] = config[1] | ((extensionSamplingFrequencyIndex >> 1) & 0x07);
        config[2] = ((extensionSamplingFrequencyIndex & 1) << 7) | 8;
        config[3] = 0;
    }
    return {
        config: config,
        samplerate: SAMPLING_FREQUENCY_LIST[samplingFrequencyIndex],
        channelCount: channelConfiguration,
        codec: `mp4a.40.${audioObjectType}`,
        defaultCodec: defaultCodec
    };
}

