/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:47:25 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:47:25 
 * 性能监控相关类型定义
 */
export type MonitorData = {
    decodedFPS: number,
    droppedFPS: number,
    decodedFrames: number,
    droppedFrames: number,
    loadStartTime: number,
    firstFrameTime: number,
    blockDuration: number,
    blockCount: number,
    downloadedBytes: number,
} & Record<string, any>

export function getNewMonitorData(): MonitorData {
    return {
        decodedFPS: 0,
        droppedFPS: 0,
        decodedFrames: 0,
        droppedFrames: 0,
        loadStartTime: 0,
        firstFrameTime: 0,
        blockDuration: 0,
        blockCount: 0,
        downloadedBytes: 0,
    }
}
