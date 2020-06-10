/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:42:42 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:55:56
 */
declare const __VERSION__: string;

declare interface MSStreamReader {
    readyState: any;
    onprogress: any;
    onload: any;
    onerror: any;
    readAsArrayBuffer: any;
    abort: any;
}

declare module 'webworkify-webpack';
