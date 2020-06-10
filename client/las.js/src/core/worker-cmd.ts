/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:41:25 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:41:25 
 * worker通信定义
 */
export enum WorkerCmd {
    // 初始化worker
    INIT = 'init',
    // 收到flv头
    FLV_HEAD = 'flvHead',
    // 设置codec
    SET_CODECS = 'setCodecs',
    // 清空数据
    FLUSH = 'flush',
    // 传入数据
    APPEND_DATA = 'appendData',
    // 下载结束
    LOAD_END = 'loadEnd',
    // 销毁
    DESTROY = 'destroy',
    // 设置扩展数据
    SET_EXTRA = 'setExtra'
};