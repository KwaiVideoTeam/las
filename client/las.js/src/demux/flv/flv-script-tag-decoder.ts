/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:52:42 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:53:05
 * flv script tag处理
 */
// amf0-file-format-specification
// Adobe Flash Video File Format Specification Version 10.1

import { decodeUTF8 } from '../../utils/decode-utf8';

/**
 * 数据源定义
 */
type Source = {
    view: DataView,
    i: number,
}

/**
 * 解码flv script tag数据
 * 处理AMF0数据
 */
class FlvScriptTagDecoder {
    /**
     * 解码script tag数据
     * @param data script tag body数据
     * @param offset 数据偏移量，默认：0
     */
    public static decode(data: ArrayBuffer, offset: number = 0): any {
        let source: Source = {
            view: new DataView(data, offset),
            i: 0
        }
        source.i = 0;
        let result: any = {};
        try {
            result[FlvScriptTagDecoder._read(source)] = FlvScriptTagDecoder._read(source);
        } catch (e) { }
        return result;
    }

    /**
     * 从数据源读取AMF0格式数据
     * @param s 数据源
     */
    private static _read(s: Source): any {
        let view = s.view;
        let len = view.byteLength;
        let type = view.getUint8(s.i);
        s.i++;
        let result: any;
        switch (type) {
            case 0:
                // Number Type
                result = view.getFloat64(s.i);
                s.i += 8;
                return result;
            case 1:
                // Boolean Type
                result = view.getUint8(s.i);
                s.i++;
                return result;
            case 2:
                // String Type
                return FlvScriptTagDecoder._readString(s);
            case 3:
                // Object Type
                result = {};
                while (s.i < len - 4) {
                    if (FlvScriptTagDecoder._isObjectEnd(s)) {
                        s.i += 3;
                        break;
                    }
                    FlvScriptTagDecoder._readObjProperty(s, result);
                }
                return result;
            case 5:
                // null Type
                return null;
            case 8:
                // ECMA Array Type
                result = {};
                s.i += 4;
                while (s.i < len - 8) {
                    if (FlvScriptTagDecoder._isObjectEnd(s)) {
                        s.i += 3;
                        break;
                    }
                    FlvScriptTagDecoder._readObjProperty(s, result);
                }
                return result;
            case 10:
                // Strict Array Type
                result = [];
                let size = view.getUint32(s.i);
                s.i += 4;
                for (let i = 0; i < size; i++) {
                    result.push(FlvScriptTagDecoder._read(s));
                }
                return result;
            case 11:
                // Date Type
                return FlvScriptTagDecoder._readDate(s);
            case 12:
                // Long String Type
                return FlvScriptTagDecoder._readLongString(s);
        }
    }

    /**
     * 判断Object End Type
     * @param s 数据源
     */
    private static _isObjectEnd(s: Source): boolean {
        // 0x00 0x00 0x09
        if (s.i + 2 > s.view.byteLength - 1 ||
            s.view.getInt16(s.i) === 0 && s.view.getUint8(s.i + 2) === 9) {
            return true;
        }
        return false;
    }

    /**
     * 读取object属性
     * @param s 数据源
     * @param obj 输出
     */
    private static _readObjProperty(s: Source, obj: any): void {
        let name = FlvScriptTagDecoder._readString(s);
        let value = FlvScriptTagDecoder._read(s);
        obj[name] = value;
    }

    /**
     * 读取字符串
     * @param s 数据源
     */
    private static _readString(s: Source): string {
        // 16bit（字符串长度） + 字符串
        const len = s.view.getUint16(s.i);
        let result;
        if (len > 0) {
            result = decodeUTF8(s.view.buffer, s.view.byteOffset + s.i + 2, len);
        } else {
            result = '';
        }
        s.i += 2 + len;
        return result;
    }

    /**
     * 读取长字符串
     * @param s 数据源
     */
    private static _readLongString(s: Source): string {
        // 32bit（字符串长度） + 字符串
        const len = s.view.getUint32(s.i);
        let result;
        if (len > 0) {
            result = decodeUTF8(s.view.buffer, s.view.byteOffset + s.i + 4, len);
        } else {
            result = '';
        }
        s.i += 4 + len;
        return result;
    }

    /**
     * 读取日期
     * @param s 数据源
     */
    private static _readDate(s: Source): Date {
        // 64bit(utc) + 16bit(时区，分钟)
        let timestamp = s.view.getFloat64(s.i);
        s.i += 8;
        let tz = s.view.getInt16(s.i);
        s.i += 2;
        return new Date(timestamp + tz * 60 * 1000);
    }
}

export default FlvScriptTagDecoder;
