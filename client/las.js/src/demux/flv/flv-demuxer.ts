/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:53:14 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 15:26:13
 * flv解封装
 */
import { EventEmitter } from 'events';
import { ErrorDetails, ErrorTypes } from '../../core/errors';
import LasEvents from '../../core/events';
import MP4Remuxer from '../../remux/mp4-remuxer';
import { LasMainConfig } from '../../types/core';
import { FlvTag, FlvTagType } from '../../types/flv-object';
import { AudioTrack, TrackType, VideoTrack } from '../../types/remux';
import { Log } from '../../utils/log';
import { parseAudioSpecificConfig } from '../audio-specific-config';
import SPSParser from '../sps-parser';
import FlvScriptTagDecoder from './flv-script-tag-decoder';

// 连续Non-monotonous上限，超过上限重置remux
const DISCONTINUITY_ON_NON_MONOTONOUS = 10;

const AUDIO_TIME_ORIGIN_THRESHOLD = 5;

type TagCacheItem = { tag: FlvTag, dataOffset: number };
class FlvDemux {
    private tag = 'FlvDemux';
    private _eventEmitter: EventEmitter;
    private _remuxer: MP4Remuxer;
    private _naluLengthSize: number;
    private _hasVideo: boolean;
    private _hasAudio: boolean;
    private _videoTrack: VideoTrack;
    private _audioTrack: AudioTrack;
    private _remuxStat?: { timeOffset: number; isContinuous: boolean };
    private _audioLastDTS: number = 0;
    private _videoLastDTS: number = 0;
    private _nonMonotonousTagCache?: TagCacheItem[];

    private _audioCodec: string = '';
    private _videoCodec: string = '';

    constructor(eventEmitter: EventEmitter, remuxer: MP4Remuxer, config: LasMainConfig) {
        this._eventEmitter = eventEmitter;
        this._remuxer = remuxer;

        this._naluLengthSize = 4;

        this._hasVideo = true;
        this._hasAudio = true;

        this._videoTrack = {
            id: 1,
            type: TrackType.video,
            codec: '',
            timescale: 1000,
            duration: 0,
            samples: [],
            mp4Samples: [],
            inputTimescale: 1000,
            sequenceNumber: 0,
            width: 0,
            height: 0,
            codecWidth: 0,
            codecHeight: 0,
            sps: [],
            pps: [],
            pixelRatio: [],
            profile: '',
            level: '',
            chromaFormat: '',
            fps: 0,
            sampleDuration: 0,
        };
        this._audioTrack = {
            id: 2,
            type: TrackType.audio,
            codec: '',
            timescale: 1000,
            duration: 0,
            samples: [],
            mp4Samples: [],
            inputTimescale: 1000,
            sequenceNumber: 0,
            samplerate: 0,
            channelCount: 0,
            config: [],
            sampleDuration: 0,
        };
    }

    public append(tags: FlvTag[], timeOffset: number, isContinuous: boolean): void {
        if (!this._remuxStat) {
            this._remuxStat = { timeOffset, isContinuous };
        }
        if (!tags.length) return;
        tags.forEach(tag => {
            if (tag.tagType === FlvTagType.VIDEO && this._hasVideo) {
                this._parseVideoData(tag);
            } else if (tag.tagType === FlvTagType.AUDIO && this._hasAudio) {
                this._parseAudioData(tag);
            } else if (tag.tagType === FlvTagType.SCRIPT) {
                this._parseScriptTag(tag);
            }
        });
        this._remux();
    }

    /**
     * 设置codec
     * @param audioCodec audioCodec
     * @param videoCodec videoCodec
     */
    public setCodecs(audioCodec: string = '', videoCodec: string = ''): void {
        this._audioCodec = audioCodec;
        this._videoCodec = videoCodec;
    }

    public flvHead(hasAudio: boolean, hasVideo: boolean): void {
        this._hasAudio = hasAudio;
        this._hasVideo = hasVideo;
    }

    public destroy() { }

    public flush() {
        this._remux(true);
        this._remuxStat = undefined;
    }

    public reset() {
        this._videoTrack.samples = [];
        this._audioTrack.samples = [];
        this._audioLastDTS = this._videoLastDTS = 0;
        this._remuxStat = undefined;
    }

    /**
     * 处理script tag
     * @param tag flv tag
     */
    private _parseScriptTag(tag: FlvTag) {
        if (tag.body) {
            const scriptData = FlvScriptTagDecoder.decode(tag.body.buffer);
            scriptData.timestamp = tag.timestamp;
            if (scriptData.hasOwnProperty('onMetaData')) {
                const onMetaData = scriptData.onMetaData;
                if (typeof onMetaData.framerate === 'number') {
                    this._videoTrack.fps = this._videoTrack.fps || onMetaData.framerate;
                }
                Log.i(this.tag, 'Parsed onMetaData');
            }
            // script tag数据整个抛出
            this._eventEmitter.emit(LasEvents.SCRIPT_PARSED, scriptData);
        }
    }

    /**
     * 处理flv video tag
     * @param tag FlvTag
     */
    private _parseVideoData(tag: FlvTag) {
        if (!tag.body) {
            return;
        }
        // 获取 video tag body 第一字节
        const spec = tag.body[0];
        // UB[4] 获取是否是关键帧
        tag.frameType = (spec & 0xf0) >>> 4;
        // 获取编码格式
        // UB[4] CodecID 7 = AVC
        const codecId = spec & 0xf;
        if (codecId !== 7) {
            this._onError(ErrorDetails.DEMUX_ERROR, `video codec Unsupported: ${codecId}`)
            return;
        }
        // AVCPacketType
        tag.codecId = codecId;
        const packetType = tag.body[1];
        // 3字节
        tag.cts = ((tag.body[2] & 0xff) << 16) + ((tag.body[3] & 0xff) << 8) + (tag.body[4] & 0xff);

        if (packetType === 0) {
            // 处理sps/pps
            this._parseAVCDecoderConfigurationRecord(tag, 5);
        } else if (packetType === 1) {
            this._parseAVCVideoData(tag, 5) || {};
        } else if (packetType === 2) {
        } else {
            this._onError(ErrorDetails.DEMUX_ERROR, `video packet type error: ${packetType} `);
            return;
        }
    }

    /**
     * 解析AVCDecoderConfigurationRecord
     * @param tag flvtag
     * @param dataOffset tag body offset
     */
    private _parseAVCDecoderConfigurationRecord(tag: FlvTag, dataOffset: number) {
        if (!tag.body) {
            return;
        }
        const track = this._videoTrack;
        const arrayBuffer = tag.body.buffer;
        const dataSize = tag.body.byteLength - dataOffset;
        const v = new DataView(arrayBuffer, dataOffset, dataSize);

        const version = v.getUint8(0);
        const avcProfile = v.getUint8(1);
        // 忽略profile_compatibility、AVCLevelIndication
        if (version !== 1 || avcProfile === 0) {
            this._onError(ErrorDetails.DEMUX_ERROR, 'AVCDecoderConfiguration error');
            return;
        }

        this._naluLengthSize = (v.getUint8(4) & 3) + 1;
        if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) {
            this._onError(ErrorDetails.DEMUX_ERROR, `nalu length size error: ${this._naluLengthSize}`);
            return;
        }

        const spsCount = v.getUint8(5) & 31;
        if (spsCount === 0 || spsCount > 1) {
            this._onError(ErrorDetails.DEMUX_ERROR, `H264 SPS count error: ${spsCount}`);
            return;
        }

        let offset = 6;
        let spsList = [];
        for (let i = 0; i < spsCount; i++) {
            const len = v.getUint16(offset);
            offset += 2;
            if (len === 0) {
                continue;
            }
            const sps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
            offset += len;
            spsList.push(sps);
            const config = SPSParser.parse(sps);
            const codecArray = sps.subarray(1, 4);
            let codecString = 'avc1.';
            for (let j = 0; j < 3; j++) {
                let h = codecArray[j].toString(16);
                if (h.length < 2) {
                    h = '0' + h;
                }
                codecString += h;
            }

            if (
                !!track.codec &&
                (track.width !== config.width ||
                    track.height !== config.height ||
                    codecString !== track.codec)
            ) {
                // sps有更新，现有缓存视频帧全部remux。需要重新生成mp4头
                this._remux(true);
                this._remuxer.resetMoov();
            }
            track.sps = spsList;
            track.width = config.width;
            track.height = config.height;
            track.pixelRatio = config.pixelAspectRatio
            if (config.fps) {
                track.fps = config.fps;
            }
            track.codec = codecString;

            track.profile = config.profile;
            track.level = config.level;
            track.chromaFormat = config.chromaFormat;
        }

        const ppsCount = v.getUint8(offset);
        if (ppsCount === 0 || ppsCount > 1) {
            this._onError(ErrorDetails.DEMUX_ERROR, `H264 PPS count error: ${ppsCount}`);
            return;
        }

        offset++;
        track.pps = [];
        for (let i = 0; i < ppsCount; i++) {
            const len = v.getUint16(offset);
            offset += 2;
            const pps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
            track.pps.push(pps);
            if (len === 0) {
                continue;
            }
            offset += len;
        }
        Log.v(this.tag, 'Parsed AVCDecoderConfigurationRecord');

        track.sampleDuration = Math.floor(track.timescale / (track.fps || 25));
    }

    /**
     * 解析视频tag
     * @param tag flv tag
     * @param dataOffset dataOffset
     */
    private _parseAVCVideoData(tag: FlvTag, dataOffset: number, fromNonMonotonousCache: boolean = false) {
        if (!tag.body) {
            return;
        }
        let info;
        const arrayBuffer = tag.body.buffer;
        const dataSize = tag.body.byteLength - dataOffset;
        const v = new DataView(arrayBuffer, dataOffset, dataSize);

        const units = [];
        let length = 0;

        let offset = 0;
        const lengthSize = this._naluLengthSize;
        let dts = tag.timestamp;
        let keyframe = tag.frameType === 1; // from FLV Frame Type constants
        // 处理Non-monotonous DTS及丢帧时间修正后可能出现的时间重叠
        if (!fromNonMonotonousCache && dts <= this._videoLastDTS && this._videoLastDTS > 0) {
            Log.w(this.tag, `debug Non-monotonous DTS dts:${dts} last:${this._videoLastDTS}`);
            this._onNonMonotonous({ tag, dataOffset }, TrackType.video);
            return;
        }
        if (!fromNonMonotonousCache && this._nonMonotonousTagCache) {
            this._flushNonMonotonousCache();
        }

        if (fromNonMonotonousCache && dts <= this._videoLastDTS) {
            dts = this._videoLastDTS + 1;
        }
        const pts = dts + tag.cts;
        while (offset < dataSize) {
            if (offset + 4 >= dataSize) {
                Log.v(this.tag, `ignore nalu. timestamp = ${tag.timestamp}, offset = ${offset}, dataSize = ${dataSize}`);
                break;
            }
            let naluSize = v.getUint32(offset);
            if (lengthSize === 3) {
                naluSize >>>= 8;
            }
            if (naluSize > dataSize - lengthSize) {
                Log.v(this.tag, `ignore nalu. naluSize > dataSize timestamp ${dts}`);
                return;
            }
            const data = new Uint8Array(arrayBuffer, dataOffset + offset + 4, lengthSize + naluSize - 4);
            let unitType;
            if (tag.codecId === 7) {
                unitType = v.getUint8(offset + lengthSize) & 0x1f;
                if (unitType === 5) {
                    keyframe = true;
                }
            }

            units.push(data);
            length += data.byteLength;
            offset += lengthSize + naluSize;
        }

        if (units.length) {
            const track = this._videoTrack;
            const avcSample = {
                units,
                length,
                dts: dts,
                cts: tag.cts,
                pts: pts,
                streamDTS: dts,
                key: keyframe
            };
            track.samples.push(avcSample);
        }
        this._videoLastDTS = dts;
        return info;
    }

    /**
     * 解析音频tag
     * @param tag flv tag
     */
    private _parseAudioData(tag: FlvTag) {
        if (!tag.body) {
            return;
        }
        const dataSize = tag.body.byteLength;
        let aacFrameLen;
        if (dataSize <= 1) {
            Log.v(this.tag, 'audio packet no payload!');
            return;
        }
        const track = this._audioTrack;
        const packetType = tag.body[1];
        if (packetType === 0) {
            if (tag.body.byteLength < 4) {
                return;
            }
            let info = parseAudioSpecificConfig(tag.body, 0, this._audioCodec);
            if (info) {
                track.config = info.config;
                track.timescale = track.samplerate = info.samplerate;
                track.channelCount = info.channelCount;
                track.codec = info.codec;
                track.defaultCodec = info.defaultCodec;
                track.sampleDuration = 1024 * 1000 / track.samplerate;
            } else {
                this._onError(ErrorDetails.DEMUX_ERROR, 'AudioSpecificConfig parse error');
            }

            return;
        } else if (packetType === 1) {
            const aacData = tag.body.subarray(2);
            // AAC raw frame data
            let dts = tag.timestamp;
            // 通过时间计算的dts与通过帧长度计算的dts比对，判断是否发生了跳帧
            // aac帧长度
            aacFrameLen = 1024 * 1000 / track.samplerate;
            if (this._audioLastDTS > 0) {
                // 默认使用时间戳累加方式
                dts = this._audioLastDTS + aacFrameLen;
                const dtsDiff = tag.timestamp - dts;
                let threshold = aacFrameLen * AUDIO_TIME_ORIGIN_THRESHOLD;
                if (dtsDiff > threshold || dtsDiff < -threshold) {
                    // 超出阈值使用tag.timestamp
                    dts = tag.timestamp;
                }
            }

            const aacSample = {
                unit: aacData,
                length: aacData.byteLength,
                dts: dts,
                pts: dts,
                streamDTS: tag.timestamp
            };
            this._audioLastDTS = dts;
            track.samples.push(aacSample);
        } else {
            Log.v(this.tag, `Unsupported AAC data type ${packetType}`);
        }
    }

    /**
     * 检测到Non-monotonous
     * 少量出现Non-monotonous尝试修正时间戳
     * 连续出现Non-monotonous按照中断重推处理
     * @param data tag相关数据
     * @param type audio|video
     */
    private _onNonMonotonous(data: TagCacheItem, type: TrackType) {
        if (!this._nonMonotonousTagCache) {
            this._nonMonotonousTagCache = [];
        }
        const cache = this._nonMonotonousTagCache;
        if (cache.length > DISCONTINUITY_ON_NON_MONOTONOUS) {
            this.flush();
            const lastPTS = this._remuxer.getLastPTS();
            let ptsSync: number = lastPTS.audio;
            if (ptsSync === 0 || (lastPTS.video > 0 && lastPTS.video < ptsSync)) {
                ptsSync = lastPTS.video;
            }
            this._videoTrack.samples = [];
            this._audioTrack.samples = [];
            this._audioLastDTS = this._videoLastDTS = 0;
            this._remuxStat = { isContinuous: false, timeOffset: ptsSync };
            this._remuxer.resetMoov();
            this._remuxer.resetTimeStamp();
            Log.i(this.tag, 'NON_MONOTONOUS reset time');
            this._flushNonMonotonousCache();
        } else {
            cache.push(data);
        }
    }

    /**
     * 清空Non-monotonous数据，remux
     */
    private _flushNonMonotonousCache() {
        if (this._nonMonotonousTagCache) {
            const nonMonotonousCache = this._nonMonotonousTagCache;
            const cache = nonMonotonousCache;
            while (cache.length) {
                const data = cache.shift();
                if (data) {
                    this._parseAVCVideoData(data.tag, data.dataOffset, true);
                }
            }
            this._nonMonotonousTagCache = undefined;
        }
    }

    private _remux(end = false) {
        const audiotrack = this._audioTrack;
        const videotrack = this._videoTrack;
        let isContinuous = true,
            timeOffset = 0;
        if (this._remuxStat) {
            isContinuous = this._remuxStat.isContinuous;
            timeOffset = this._remuxStat.timeOffset;
        }

        if (audiotrack.samples.length === 0 && videotrack.samples.length === 0) {
            if (end) {
                this._remuxer.flush();
            }
            return;
        }

        if (!end && (this._hasAudio && audiotrack.samples.length === 0 || this._hasVideo && videotrack.samples.length < 2)) {
            return;
        }
        try {
            this._remuxer.remux(audiotrack, videotrack, timeOffset, isContinuous, end);
            this._remuxStat = undefined;
        } catch (error) {
            Log.e(this.tag, error);
            this._onError(ErrorDetails.REMUX_ERROR, error.message)
        }
    }

    /**
     * 错误处理，抛出错误事件
     * @param details ErrorDetails
     * @param reason 错误原因
     */
    private _onError(details: ErrorDetails, reason: string) {
        this._eventEmitter.emit(LasEvents.ERROR, {
            type: ErrorTypes.MUX_ERROR,
            details: details,
            fatal: true,
            info: {
                reason
            }
        });
    }
}

export default FlvDemux;
