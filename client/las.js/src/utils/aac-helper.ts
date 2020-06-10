/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:43:15 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:43:56
 * aac工具，获取aac控制，计算frame长度
 */
export const AAC_SAMPLE_DURATION = 1024;

const AAC_SILENT_FRAME_DATA: Record<string, Record<number, Uint8Array>> = {
    'mp4a.40.2': {
        1: new Uint8Array([0, 200, 0, 128, 35, 128]),
        2: new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]),
        3: new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]),
        4: new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]),
        5: new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]),
        6: new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]),
    },
    'mp4a.40.5': {
        1: new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]),
        2: new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]),
        3: new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]),
    }
}


/**
 * 计算单帧aac长度 ms
 * @param samplerate 音频samplerate
 */
export function getAACFrameDuration(samplerate: number): number {
    return AAC_SAMPLE_DURATION * 1000 / samplerate;
}

/**
 * 获取静音音频数据
 * @param audioCodec 音频codec
 * @param channelCount 声道数量
 */
export function getAACSilentFrame(audioCodec: string, channelCount: number): Uint8Array | undefined {
    if (!AAC_SILENT_FRAME_DATA[audioCodec]) {
        audioCodec = 'mp4a.40.5';
    }
    return AAC_SILENT_FRAME_DATA[audioCodec][channelCount];
}