/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:44:58 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:44:58 
 * 解码UTF-8
 */
/**
 * 从arraybuffer中读取utf8 数据
 * @param data 数据
 */
export function decodeUTF8(value: ArrayBuffer, offset: number, size: number): string {
    let data = new Uint8Array(value, offset, size),
        unicode: number[] = [],
        i = 0,
        len = data.byteLength;

    while (i < len) {
        if (data[i] < 0x80) {
            // 单字节，同ASCII
            // 000000-00007F   0xxxxxxx
            unicode.push(data[i]);
        } else if (data[i] < 0xc0) {
        } else if (data[i] < 0xe0) {
            // 双字节，unicode = 5bit + 6bit 
            // 000080-0007FF   110xxxxx 10xxxxxx    首字节小于0xe0=11100000
            if (i < len - 1 && (data[i + 1] >> 6) === 0b10) {
                unicode.push(((data[i] & 0x1f) << 6) | (data[i + 1] & 0x3f));
                i += 2;
                continue;
            }
        } else if (data[i] < 0xf0) {
            // 三字节，unicode = 4bit + 6bit + 6bit
            // 000800-00FFFF   1110xxxx 10xxxxxx 10xxxxxx   首字节小于0xf0=11110000
            if (i < len - 2 && (data[i + 1] >> 6) === 0b10 && (data[i + 2] >> 6) === 0b10) {
                // 1110xxxx -> 0b1111 ->  0xf
                unicode.push(((data[i] & 0xf) << 12) | ((data[i + 1] & 0x3f) << 6) | (data[i + 2] & 0x3f));
                i += 3;
                continue;
            }
        } else if (data[i] < 0xf8) {
            // 四字节，unicode = 3bit + 6bit + 6bit + 6bit
            // 010000-10FFFF	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx 首字节小于0xf8=11111000
            if (i < len - 3 && (data[i + 1] >> 6) === 0b10 && (data[i + 2] >> 6) === 0b10 && (data[i + 3] >> 6) === 0b10) {
                // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
                unicode.push(((data[i] & 0x7) << 18) | ((data[i + 1] & 0x3f) << 12) | ((data[i + 2] & 0x3f) << 6) | (data[i + 3] & 0x3f));
                i += 4;
                continue;
            }
        }
        i++;
    }
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
    return String.fromCodePoint.apply(null, unicode);
}
