/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:47:05 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 15:28:59
 * 转封装相关类型定义
 */
export enum TrackType {
    video = 'video',
    audio = 'audio'
}

/**
 * 音视频描述
 */
export type Track = {
    id: number;
    type: TrackType;
    codec: string;
    defaultCodec?: string;
    timescale: number;
    duration: number;
    samples: Sample[];
    mp4Samples: MP4Sample[];
    inputTimescale: number;
    sequenceNumber: number;
    sampleDuration: number;
}

/**
 * 音频数据描述
 */
export type AudioTrack = {
    samples: AudioSample[];
    mp4Samples: MP4AudioSample[];
    config: number[];
    samplerate: number;
    channelCount: number;
} & Track;

/**
 * 视频数据描述
 */
export type VideoTrack = {
    samples: VideoSample[];
    mp4Samples: MP4VideoSample[];
    width: number;
    height: number;
    codecWidth: number;
    codecHeight: number;
    sps: Uint8Array[];
    pps: Uint8Array[];
    pixelRatio: number[];
    profile: string;
    level: string;
    chromaFormat: string;
    fps: number;
} & Track;

/**
 * demux读取的sample描述
 */
export type Sample = {
    pts: number;
    dts: number;
    streamDTS: number;
}

/**
 * demux读取的音频sample描述
 */
export type AudioSample = {
    unit: Uint8Array;
} & Sample;

/**
 * demux读取的视频sample描述
 */
export type VideoSample = {
    key: boolean;
    cts: number;
    units: Uint8Array[];
} & Sample;

/**
 * 用于生成mp4的sample描述
 */
export type MP4Sample = {
    cts: number,
    len: number,
    duration: number,
    streamDTS: number,
    flags: {
        isLeading: number,
        isDependedOn: number,
        hasRedundancy: number,
        degradPrio: number,
        dependsOn: number,
        isNonSync: number,
    }
};

/**
 * 用于生成mp4的音频sample描述
 */
export type MP4AudioSample = {
    unit: Uint8Array;
} & MP4Sample;

/**
 * 用于生成mp4的视频sample描述
 */
export type MP4VideoSample = {
    units: Uint8Array[];
} & MP4Sample;

/**
 * remux后的MP4segment
 */
export type MP4Segment = {
    payload: Uint8Array,
    startPTS: number,
    endPTS: number,
    startDTS: number,
    endDTS: number,
    type: TrackType,
    streamDTS: number
};

/**
 * remux结果
 */
export type MP4RemuxResult = {
    segments: MP4Segment[],
    extra: any;
}
