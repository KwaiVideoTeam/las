/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:45:18 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:45:18 
 * 浏览器能力检测，是否支持flv播放
 */
import FetchLoader from '../io/fetch';
import { XHR, XHR_TYPE } from '../io/xhr';

export function isSupported(): boolean {
    const mediaSource = (window as any).MediaSource || (window as any).WebKitMediaSource;
    const sourceBuffer = (window as any).SourceBuffer || (window as any).WebKitSourceBuffer;
    // 解码
    const isTypeSupported: boolean =
        mediaSource &&
        typeof mediaSource.isTypeSupported === 'function' &&
        mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

    // MSE
    const sourceBufferValidAPI =
        !sourceBuffer ||
        (sourceBuffer.prototype &&
            typeof sourceBuffer.prototype.appendBuffer === 'function' &&
            typeof sourceBuffer.prototype.remove === 'function');

    // Loader
    let streaming = FetchLoader.isSupport() || XHR.isSupportChunk() === XHR_TYPE.MOZ_CHUNK;
    return isTypeSupported && sourceBufferValidAPI && streaming;
}
