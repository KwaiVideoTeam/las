/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:54:16 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 17:11:02
 * las请求地址生成
 */
/**
 * 生成切换flv的请求地址
 * @param url 流地址
 * @param spts 切换时间戳，单位毫秒。大于0：关键帧pts；小于0：直播延迟
 */
export function abrGetUrl(url: string, spts?: number): string {
    if (typeof spts === 'undefined') {
        return url;
    }
    let arr = url.split('?');
    arr.splice(1, 0, `?startPts=${spts}${arr.length > 1 ? '&' : ''}`);
    return arr.join('');
}