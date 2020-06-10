/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:52:22 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:52:22 
 * flv预处理器
 */
import { EventEmitter } from 'events';
import { ErrorDetails, ErrorTypes } from '../../core/errors';
import LasEvents from '../../core/events';
import Cache from '../../io/cache';
import { FlvSize, FlvTag, FlvTagType } from '../../types/flv-object';

/**
 * 关键帧回调方法定义
 */
export type FlvKeyframeCallback<T> = (time: number) => T | undefined;

/**
 * 处理结果定义
 */
type Result<T> = {
    list: FlvTag[];
    callbackResult?: T;
}

/**
 * flv预处理，拆解tag，关键帧位置回调
 */
class FlvPreprocessor<T> {
    private _eventEmitter: EventEmitter;
    private _cache: Cache;
    private _tag?: FlvTag;
    private _result: Result<T>;

    private _parseLen: number = 0;
    private _parseFunc: Function;
    private _onFlvKeyframe: FlvKeyframeCallback<T>;

    /**
     * 构造函数
     * @param eventEmitter 事件派发器
     * @param onFlvKeyframe 关键帧位置回调
     */
    constructor(eventEmitter: EventEmitter, onFlvKeyframe: FlvKeyframeCallback<T>) {
        this._eventEmitter = eventEmitter;
        this._onFlvKeyframe = onFlvKeyframe;
        this._cache = new Cache();
        this._parseLen = FlvSize.FLV_HEAD_LEN;
        this._parseFunc = this._parseFlvHead;
        this._result = { list: [] };
    }

    /**
     * 重置状态
     */
    public reset(): void {
        this._parseLen = FlvSize.FLV_HEAD_LEN;
        this._parseFunc = this._parseFlvHead;
        this._cache.clear();
        this._tag = undefined;
        this._result.list = [];
        this._result.callbackResult = undefined;
    }

    /**
     * 处理数据
     * @param input flv数据
     */
    public processing(input: ArrayBuffer): Result<T> {
        this._cache.put(new Uint8Array(input));
        while (this._cache.unreadLen > this._parseLen) {
            this._parseFunc();
        }
        let data = { list: this._result.list.splice(0), callbackResult: this._result.callbackResult }
        this._result.callbackResult = undefined;
        return data;
    }

    /**
     * 解析tag头
     */
    private _parseFlvHead(): void {
        const data = this._cache.read(FlvSize.FLV_HEAD_LEN);
        if (data) {
            if (data[0] !== 0x46 || data[1] !== 0x4c || data[2] !== 0x56 || data[3] !== 0x01) {
                this._eventEmitter.emit(LasEvents.ERROR, {
                    type: ErrorTypes.MUX_ERROR,
                    details: ErrorDetails.DEMUX_ERROR,
                    fatal: true,
                    info: {
                        reason: 'flv wrong head'
                    }
                });
            }
            this._eventEmitter.emit(LasEvents.FLV_HEAD, {
                hasAudio: (data[4] & 4) >>> 2,
                hasVideo: (data[4] & 1)
            });
            // TEST:
            // this._eventEmitter.emit(KEvents.FLV_HEAD, {
            //     hasAudio: true,
            //     hasVideo: true
            // });

            this._cache.skip(FlvSize.FLV_HEAD_LEN);
            this._parseLen = FlvSize.FLV_TAG_HEAD_LEN;
            this._parseFunc = this._parseFlvTagHead;
        }
    }

    /**
     * 解析flv tag head
     */
    private _parseFlvTagHead(): void {
        this._tag = new FlvTag();
        const data = this._cache.read(FlvSize.FLV_TAG_HEAD_LEN);
        if (data) {
            // 取出tag类型
            this._tag.tagType = data[0];
            // 取出包体大小
            this._tag.dataSize = ((data[1] & 0xff) << 16) + ((data[2] & 0xff) << 8) + (data[3] & 0xff);
            // 取出解码时间
            this._tag.timestamp =
                ((data[7] & 0xff) << 24) + ((data[4] & 0xff) << 16) + ((data[5] & 0xff) << 8) + (data[6] & 0xff);
            this._cache.skip(FlvSize.FLV_TAG_HEAD_LEN);
            // 尝试在处理完整个tag之前判断是否为关键帧，用于自适应码率
            if (this._tag.tagType === FlvTagType.VIDEO) {
                this._parseFunc = this._detectKeyFrame;
                this._parseLen = FlvSize.AVC_KEY_FRAME_CHECK_LEN;
            } else {
                this._parseFunc = this._parseFlvTag;
                this._parseLen = this._tag.dataSize + FlvSize.FLV_TAG_SIZE_LEN;
            }
        }
    }

    /**
     * 检测关键帧
     */
    private _detectKeyFrame(): void {
        const data = this._cache.read(2);
        if (data && this._tag) {
            const frameType = (data[0] & 240) >>> 4;
            const packetType = data[1];
            this._parseFunc = this._parseFlvTag;
            this._parseLen = this._tag.dataSize + FlvSize.FLV_TAG_SIZE_LEN;
            // 获取是否是关键帧
            if (frameType === 1 && packetType === 1 && this._onFlvKeyframe) {
                this._result.callbackResult = this._onFlvKeyframe(this._tag.timestamp);
                if (this._result.callbackResult) {
                    this._parseLen = FlvSize.FLV_HEAD_LEN;
                    this._parseFunc = this._parseFlvHead;
                    this._cache.clear();
                    this._tag = undefined;
                }
            }
        }
    }

    /**
     * 解析flv tag
     */
    private _parseFlvTag(): void {
        const tag = this._tag;
        if (!tag) {
            return;
        }
        if (tag.tagType === FlvTagType.SCRIPT || tag.tagType === FlvTagType.AUDIO || tag.tagType === FlvTagType.VIDEO) {
            tag.body = this._cache.get(tag.dataSize);
            this._cache.skip(4); // skip size
            if (tag)
                this._result.list.push(tag);
            this._tag = undefined;
        }
        this._parseFunc = this._parseFlvTagHead;
        this._parseLen = FlvSize.FLV_TAG_HEAD_LEN;
    }
}

export default FlvPreprocessor;
