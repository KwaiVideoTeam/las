/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:46:33 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:46:33 
 * flv格式相关定义
 */
/**
 * flv tag类型
 */
export enum FlvTagType {
    AUDIO = 8,
    VIDEO = 9,
    SCRIPT = 18
}

/**
 * flv主要字段长度定义
 */
export const FlvSize = {
    FLV_HEAD_LEN: 13,
    FLV_TAG_HEAD_LEN: 11,
    FLV_TAG_SIZE_LEN: 4,
    AVC_KEY_FRAME_CHECK_LEN: 2
}

/**
 * flv tag定义
 */
export class FlvTag {
    public tagType: FlvTagType = FlvTagType.VIDEO;
    public dataSize: number = 0;
    public timestamp: number = 0;
    public size: number = 0;
    public cts: number = 0;
    public frameType: number = 0;
    public codecId: number = 0;
    public body: Uint8Array | null = null;
}
