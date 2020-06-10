/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:53:40 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:53:40 
 * manfest定义及解析
 */
import { parseCodecStr } from "../utils/codec-helper";
import AbrLevel from "./abr-level";
export type Representation = {
    // 每个媒体表示的唯一标识号
    id: number,
    // 媒体表示的URL地址
    url: string,
    // 媒体表示的备用URL地址
    backupUrl: string[],
    // 媒体表示的域名
    host: string,
    // 媒体表示的编码码率
    maxBitrate: number,
    // 媒体表示的平均码率
    avgBitrate: number,
    // 音视频流的编码方式
    codec: string,
    // 媒体表示的宽度
    width: number,
    // 媒体表示的高度
    height: number,
    // 媒体表示的帧率
    frameRate: number,
    // 媒体表示的质量类型
    qualityType: string,
    // 媒体表示的质量类型展示字段
    qualityTypeName: string,
    // 媒体表示隐藏选项。设定为true，则对应的媒体表示不外显，用户无法选择，只能通过自适应功能选中；设定为false，则对应的媒体表示外显，用户可手动选择
    hidden: boolean,
    // 媒体表示自适应选项。设定为false，则对应的媒体表示对于自适应功能可见，能被自适应功能选中；
    disabledFromAdaptive: boolean,
    // 默认档功能选项。@defaultSelect为true的媒体表示启播默认播放。所有@representation中，最多只能出现一个媒体表示的@defaultSelect为true；没有@representation设置defaultSelect为true时，自动选择媒体表示启播播放
    defaultSelected: boolean
}

type AdaptationSet = {
    // adaptationSet的唯一标识号
    id: number;
    // 媒体流GOP的长度，单位为毫秒
    duration: number;
    // 媒体表示的集合，媒体表示的集合包含一个或多个媒体表示
    representation: Representation[];
};

export type AbrManifestData = {
    // 版本号
    version: string,
    // 自适应集合，每个MPD由一个或多个自适应集合组成
    adaptationSet: AdaptationSet[];
};

/**
 * las manifest
 */
export class AbrManifest {
    private _levels: AbrLevel[] = [];
    private _abrLevels: number[] = [];
    private _default?: number;

    /**
     * 验证las manifest数据
     * @param data 输入数据
     */
    public static verify(data: any) {
        if (
            data &&
            data.hasOwnProperty('version') &&
            data.hasOwnProperty('adaptationSet') &&
            Array.isArray(data.adaptationSet) &&
            data.adaptationSet.length > 0
        ) {
            return data.adaptationSet.reduce((prev: boolean, item: any) => {
                return !!(prev && item.representation && item.representation.length)
            }, true);
        }
        return false;
    }

    /**
     * 构造函数，解析传入的manifest
     * @param manifest las manifest
     */
    constructor(manifest: AbrManifestData) {
        if (AbrManifest.verify(manifest)) {
            manifest.adaptationSet[0].representation.forEach((item, index) => {
                let level = new AbrLevel(item.url);
                level.id = item.id || 0;
                level.maxBitrate = item.maxBitrate || 0;
                level.avgBitrate = item.avgBitrate || 0;
                level.bitrate = item.avgBitrate || level.maxBitrate;
                level.qualityType = item.qualityType || '';
                level.qualityTypeName = item.qualityTypeName || '';
                level.codec = item.codec || '';
                if (level.codec) {
                    const codecs = parseCodecStr(level.codec);
                    level.audioCodec = codecs.audio;
                    level.videoCodec = codecs.video;
                }
                level.hidden = item.hidden || false;
                level.disabledFromAdaptive = item.disabledFromAdaptive || item.disabledFromAdaptive;
                level.defaultSelected = item.defaultSelected || false;
                this._levels.push(level);

                if (!level.disabledFromAdaptive) {
                    this._abrLevels.push(index);
                }
                if (level.defaultSelected && typeof this._default === 'undefined') {
                    this._default = index;
                }
            });
            this._levels.sort((a, b) => {
                return a.bitrate - b.bitrate;
            });
        } else {
            return;
        }
    }

    /**
     * 码率列表
     */
    public get levels(): AbrLevel[] {
        return this._levels;
    }

    /**
     * 可用于自适应切换的码率index列表
     */
    public get abrLevels(): number[] {
        return this._abrLevels;
    }

    /**
     * 默认起播清晰度
     */
    public get default(): number {
        return this._default || 0;
    }
}
