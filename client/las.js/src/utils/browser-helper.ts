/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:44:00 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 16:16:15
 * 浏览器ua解析，用于浏览器兼容性处理
 */
interface IBrowserHelper {
    isSafari: boolean,
    isFirefox: boolean,
    isAndroid: boolean,
}

/**
 * 浏览器类型检测，用于处理浏览器兼容性问题
 */
const BrowserHelper: IBrowserHelper = ((): IBrowserHelper => {
    let vendor = navigator.vendor;
    let userAgent = navigator.userAgent;
    return {
        isSafari: !!(vendor && vendor.indexOf('Apple') > -1 && userAgent && !userAgent.match('CriOS')),
        isFirefox: /firefox/i.test(userAgent),
        isAndroid: /android/i.test(userAgent),
    };
})();

export default BrowserHelper;
