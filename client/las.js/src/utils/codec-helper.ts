/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:44:39 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:44:39 
 * 处理codec字符串，拆分音视频codec
 */
import { TrackType } from "../types/remux";

type Codecs = Partial<Record<TrackType, string>>;

/**
 * 拆解codec串
 * @param value codec串
 */
export function parseCodecStr(value: string): Codecs {
    let result: Codecs = {};
    (value || '').split(/[ ,]+/).forEach(codec => {
        if (codec.indexOf('avc1') === 0) {
            result.video = codec;
        }
        if (codec.indexOf('mp4a') === 0) {
            result.audio = codec;
        }
    });
    return result;
}
