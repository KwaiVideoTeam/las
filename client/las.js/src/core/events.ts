/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:38:52 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:41:35
 * las.js事件定义
 */
const LasEvents = {
    // 视频头信息事件，读取到视频头信息时触发
    MEDIA_INFO: 'mediaInfo',
    // remux一次MP4 Segment触发一次
    MP4_SEGMENT: 'mp4Segment',
    // 读取到flv script tag时触发
    SCRIPT_PARSED: 'scriptParsed',
    // http请求正常结束时触发
    LOAD_END: 'loadEnd',
    // 错误时触发
    ERROR: 'lasError',
    // 清晰度切换失败时触发
    LEVEL_SWITCH_FAILED: 'levelSwitchFailed',
    // 清晰度开始切换时触发
    LEVEL_SWITCHING: 'levelSwitching',
    // 清晰度切换完成时触发
    LEVEL_SWITCHED: 'levelSwitched',
    // manifest解析完成时触发
    MANIFEST_PARSED: 'manifestParsed',
    // 读取到flv头时触发
    FLV_HEAD: 'flvHead',
    // 通知事件
    REPORT: 'report',
    // 心跳事件
    HEARTBEAT: 'heartbeat',
};

export default LasEvents;
