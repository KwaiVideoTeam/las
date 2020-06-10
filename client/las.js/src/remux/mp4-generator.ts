/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:47:47 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-06-09 11:48:11
 * 生成fragmented mp4
 */
import { AudioTrack, Track, TrackType, VideoTrack } from '../types/remux';
const UINT32_MAX = Math.pow(2, 32) - 1;
const BOX_HEAD_LEN = 8;

type DestData = {
    data: Uint8Array;
    offset: number;
}

const HDLR: Record<string, Uint8Array> = {
    video: new Uint8Array([
        0, 0, 0, 45,
        104, 100, 108, 114,
        0, 0, 0, 0,
        0, 0, 0, 0,
        118, 105, 100, 101,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        86, 105, 100, 101,
        111, 72, 97, 110,
        100, 108, 101, 114,
        0
    ]),
    audio: new Uint8Array([
        0, 0, 0, 45,
        104, 100, 108, 114,
        0, 0, 0, 0,
        0, 0, 0, 0,
        115, 111, 117, 110,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        83, 111, 117, 110,
        100, 72, 97, 110,
        100, 108, 101, 114,
        0
    ])
};
const FTYP = new Uint8Array([
    0, 0, 0, 24,
    102, 116, 121, 112,
    105, 115, 111, 109,
    0, 0, 0, 1,
    105, 115, 111, 109,
    97, 118, 99, 49
]);

const STTS = new Uint8Array([
    0, 0, 0, 16,
    115, 116, 116, 115,
    0, 0, 0, 0,
    0, 0, 0, 0
]);
const STSC = new Uint8Array([
    0, 0, 0, 16,
    115, 116, 115, 99,
    0, 0, 0, 0,
    0, 0, 0, 0
]);
const STCO = new Uint8Array([
    0, 0, 0, 16,
    115, 116, 99, 111,
    0, 0, 0, 0,
    0, 0, 0, 0
]);

const STSZ = new Uint8Array([
    0, 0, 0, 20,
    115, 116, 115, 122,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
]);

const DINF = new Uint8Array([
    0, 0, 0, 36,
    100, 105, 110, 102,
    0, 0, 0, 28,
    100, 114, 101, 102,
    0, 0, 0, 0,
    0, 0, 0, 1,
    0, 0, 0, 12,
    117, 114, 108, 32,
    0, 0, 0, 1
]);

const VMHD = new Uint8Array([
    0, 0, 0, 20,
    118, 109, 104, 100,
    0, 0, 0, 1,
    0, 0, 0, 0,
    0, 0, 0, 0
]);

const SMHD = new Uint8Array([
    0, 0, 0, 16,
    115, 109, 104, 100,
    0, 0, 0, 0,
    0, 0, 0, 0
]);

const BTRT = new Uint8Array([
    0, 0, 0, 20,
    98, 116, 114, 116,
    0, 28, 156, 128,
    0, 45, 198, 192,
    0, 45, 198, 192
]);

const MVHD_TPL = new Uint8Array([
    0, 0, 0, 120,
    109, 118, 104, 100,
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 2,
    0, 0, 0, 0,
    0, 0, 0, 3,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 0, 0,
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    64, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    255, 255, 255, 255
]);

const TKHD_TPL = new Uint8Array([
    0, 0, 0, 104,
    116, 107, 104, 100,
    1, 0, 0, 7,
    0, 0, 0, 0,
    0, 0, 0, 2,
    0, 0, 0, 0,
    0, 0, 0, 3,
    0, 0, 0, 2,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    64, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
]);

const TREX_TPL = new Uint8Array([
    0, 0, 0, 32,
    116, 114, 101, 120,
    0, 0, 0, 0,
    0, 0, 0, 2,
    0, 0, 0, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 0, 1
]);
const MDHD_TPL = new Uint8Array([
    0, 0, 0, 44,
    109, 100, 104, 100,
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 2,
    0, 0, 0, 0,
    0, 0, 0, 3,
    0, 0, 172, 68,
    0, 0, 0, 0,
    0, 0, 0, 0,
    85, 196, 0, 0
]);

const MP4A_STSD_TPL = new Uint8Array([
    0, 0, 0, 93,
    115, 116, 115, 100,
    0, 0, 0, 0,
    0, 0, 0, 1,
    0, 0, 0, 77,
    109, 112, 52, 97,
    0, 0, 0, 0,
    0, 0, 0, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 2, 0, 16,
    0, 0, 0, 0,
    172, 68, 0, 0,
    0, 0, 0, 41,
    101, 115, 100, 115,
    0, 0, 0, 0,
    3, 27, 0, 1,
    0, 4, 19, 64,
    21, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    5
]);

const AVC1_STSD_TPL = new Uint8Array([
    0, 0, 0, 185,
    115, 116, 115, 100,
    0, 0, 0, 0,
    0, 0, 0, 1,
    0, 0, 0, 169,
    97, 118, 99, 49,
    0, 0, 0, 0,
    0, 0, 0, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    5, 0, 2, 208,
    0, 72, 0, 0,
    0, 72, 0, 0,
    0, 0, 0, 0,
    0, 1, 18, 100,
    97, 105, 108, 121,
    109, 111, 116, 105,
    111, 110, 47, 104,
    108, 115, 46, 106,
    115, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 24,
    17, 17
])

const PASP_TPL = new Uint8Array([
    0, 0, 0, 16,
    112, 97, 115, 112,
    0, 0, 0, 1,
    0, 0, 0, 1
]);

class MP4 {
    static types: Record<string, number[]> = {
        'avc1': [97, 118, 99, 49],
        'avcC': [97, 118, 99, 67],
        'btrt': [98, 116, 114, 116],
        'dinf': [100, 105, 110, 102],
        'dref': [100, 114, 101, 102],
        'esds': [101, 115, 100, 115],
        'ftyp': [102, 116, 121, 112],
        'hdlr': [104, 100, 108, 114],
        'mdat': [109, 100, 97, 116],
        'mdhd': [109, 100, 104, 100],
        'mdia': [109, 100, 105, 97],
        'mfhd': [109, 102, 104, 100],
        'minf': [109, 105, 110, 102],
        'moof': [109, 111, 111, 102],
        'moov': [109, 111, 111, 118],
        'mp4a': [109, 112, 52, 97],
        'mvex': [109, 118, 101, 120],
        'mvhd': [109, 118, 104, 100],
        'pasp': [112, 97, 115, 112],
        'sdtp': [115, 100, 116, 112],
        'stbl': [115, 116, 98, 108],
        'stco': [115, 116, 99, 111],
        'stsc': [115, 116, 115, 99],
        'stsd': [115, 116, 115, 100],
        'stsz': [115, 116, 115, 122],
        'stts': [115, 116, 116, 115],
        'tfdt': [116, 102, 100, 116],
        'tfhd': [116, 102, 104, 100],
        'traf': [116, 114, 97, 102],
        'trak': [116, 114, 97, 107],
        'trun': [116, 114, 117, 110],
        'trex': [116, 114, 101, 120],
        'tkhd': [116, 107, 104, 100],
        'vmhd': [118, 109, 104, 100],
        'smhd': [115, 109, 104, 100]
    };

    /**
     * 获取当前音视频的moov
     * @param tracks 音视频描述数据
     */
    public static moov<T extends Track>(tracks: T[]): Uint8Array {
        // 建立空moov
        const len = FTYP.byteLength + MP4._getMoovLen(tracks);
        const dest = { data: new Uint8Array(len), offset: 0 };
        // 写入
        dest.data.set(FTYP, 0);
        dest.offset += FTYP.byteLength;
        MP4._writeMoov(dest, tracks);
        return dest.data;
    }

    /**
     * 获取当前视频的segment数据
     * @param sn sn
     * @param baseMediaDecodeTime baseMediaDecodeTime
     * @param track 视频数据
     * @param moov moov box数据
     */
    public static videoMediaSegment(sn: number, baseMediaDecodeTime: number, track: Track, moov?: Uint8Array): Uint8Array {
        // 计算mdat长度
        let mdatLen = 8 + (<VideoTrack>track).mp4Samples.reduce((prev, item) => {
            return prev + item.units.reduce((unitLen, unit) => {
                return unitLen + unit.byteLength + 4;
            }, 0);
        }, 0);
        let d = MP4._getMediaSegmentData(track, mdatLen, moov);
        MP4._mediaSegmentHead(d, sn, baseMediaDecodeTime, track, mdatLen, moov);
        (<VideoTrack>track).samples.forEach(sample => {
            sample.units.forEach(unitData => {
                const unitDataLen = unitData.byteLength;
                d.data[d.offset] = unitDataLen >> 24 & 0xff;
                d.data[d.offset + 1] = unitDataLen >> 16 & 0xff;
                d.data[d.offset + 2] = unitDataLen >> 8 & 0xff;
                d.data[d.offset + 3] = unitDataLen & 0xff;
                d.data.set(unitData, d.offset + 4);
                d.offset += 4 + unitDataLen;
            });
            delete sample.units;
        });
        return d.data;
    }

    /**
     * 获取当前音频的segment数据
     * @param sn sn
     * @param baseMediaDecodeTime baseMediaDecodeTime
     * @param track 音频数据
     * @param moov moov
     */
    public static audioMediaSegment(sn: number, baseMediaDecodeTime: number, track: Track, moov?: Uint8Array): Uint8Array {
        let mdatLen = 8 + (<AudioTrack>track).mp4Samples.reduce((prev, item) => {
            return prev + item.unit.byteLength;
        }, 0);
        let d = MP4._getMediaSegmentData(track, mdatLen, moov);
        MP4._mediaSegmentHead(d, sn, baseMediaDecodeTime, track, mdatLen, moov);

        (<AudioTrack>track).mp4Samples.forEach(sample => {
            d.data.set(sample.unit, d.offset);
            d.offset += sample.unit.byteLength;
            delete sample.unit;
        });
        return d.data;
    }

    /**
     * 计算moov头的长度
     * @param tracks 音视频轨数据
     */
    private static _getMoovLen(tracks: Track[]): number {
        const trakLen = tracks.reduce((prev, item) => {
            return prev + MP4._getTrakLen(item)
        }, 0);
        return BOX_HEAD_LEN + MVHD_TPL.byteLength + trakLen + MP4._getMvexLen(tracks);
    }

    /**
     * 向目标数据写入moov
     * @param dest 写入目标
     * @param tracks 音视频轨数据
     */
    private static _writeMoov(dest: DestData, tracks: Track[]): void {
        let moovLen = MP4._getMoovLen(tracks);
        MP4._writeBoxHead(dest, MP4.types.moov, moovLen);
        MP4._writeMvhd(dest, tracks[0].timescale, tracks[0].duration);
        tracks.forEach(item => {
            MP4._writeTrak(dest, item);
        });
        MP4._writeMvex(dest, tracks);
    }

    /**
     * 计算moof box长度
     * @param sampleCount sample数量
     */
    private static _getMoofLen(sampleCount: number): number {
        return 100 + 17 * sampleCount;
    }

    /**
     * 处理mp4 segment头部数据，主要是moof
     * @param dest 写入目标
     * @param sn sn
     * @param baseMediaDecodeTime baseMediaDecodeTime
     * @param track 音视频描述数据
     * @param mdatLen mdatLen
     * @param initSegment moov头
     */
    private static _mediaSegmentHead(dest: DestData, sn: number, baseMediaDecodeTime: number, track: Track, mdatLen: number, initSegment?: Uint8Array): void {
        if (initSegment) {
            dest.data.set(initSegment);
            dest.offset = initSegment.byteLength;
        }
        MP4._writeMoof(dest, sn, baseMediaDecodeTime, track);

        MP4._writeBoxHead(dest, MP4.types.mdat, mdatLen);
    }

    /**
     * 生成一个数据块用于承载mp4Segment数据
     * @param track 音视频描述数据
     * @param mdatLen mdat长度
     * @param moov moov
     */
    private static _getMediaSegmentData(track: Track, mdatLen: number, moov?: Uint8Array): DestData {
        let moofLen = MP4._getMoofLen(track.mp4Samples.length);
        return { data: new Uint8Array(moofLen + mdatLen + (moov ? moov.byteLength : 0)), offset: 0 };
    }

    /**
     * 向目标数据写入mvhd
     * @param dest 写入目标
     * @param timescale timescale
     * @param duration duration
     */
    private static _writeMvhd(dest: DestData, timescale: number, duration: number): void {
        duration *= timescale;
        const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
        const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
        const mvhd = MVHD_TPL;
        mvhd[28] = timescale >> 24 & 0xff;
        mvhd[29] = timescale >> 16 & 0xff;
        mvhd[30] = timescale >> 8 & 0xff;
        mvhd[31] = timescale & 0xff;
        mvhd[32] = upperWordDuration >> 24;
        mvhd[33] = upperWordDuration >> 16 & 0xff;
        mvhd[34] = upperWordDuration >> 8 & 0xff;
        mvhd[35] = upperWordDuration & 0xff;
        mvhd[36] = lowerWordDuration >> 24;
        mvhd[37] = lowerWordDuration >> 16 & 0xff;
        mvhd[38] = lowerWordDuration >> 8 & 0xff;
        mvhd[39] = lowerWordDuration & 0xff;
        dest.data.set(mvhd, dest.offset);
        dest.offset += MVHD_TPL.byteLength;
    }

    /**
     * 向目标数据写入tkhd
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeTkhd(dest: DestData, track: AudioTrack & VideoTrack): void {
        const id = track.id,
            duration = track.duration * track.timescale,
            upperWordDuration = Math.floor(duration / (UINT32_MAX + 1)),
            lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
        let width = 0,
            height = 0;
        if (track.hasOwnProperty('width')) {
            width = track.width;
        }
        if (track.hasOwnProperty('height')) {
            height = track.height;
        }
        const tkhd = TKHD_TPL;
        tkhd[28] = id >> 24 & 0xff;
        tkhd[29] = id >> 16 & 0xff;
        tkhd[30] = id >> 8 & 0xff;
        tkhd[31] = id & 0xff;
        tkhd[36] = upperWordDuration >> 24;
        tkhd[37] = upperWordDuration >> 16 & 0xff;
        tkhd[38] = upperWordDuration >> 8 & 0xff;
        tkhd[39] = upperWordDuration & 0xff;
        tkhd[40] = lowerWordDuration >> 24;
        tkhd[41] = lowerWordDuration >> 16 & 0xff;
        tkhd[42] = lowerWordDuration >> 8 & 0xff;
        tkhd[43] = lowerWordDuration & 0xff;
        tkhd[96] = width >> 8 & 0xff;
        tkhd[97] = width & 0xff;
        tkhd[100] = height >> 8 & 0xff;
        tkhd[101] = height & 0xff;

        dest.data.set(tkhd, dest.offset);
        dest.offset += TKHD_TPL.byteLength;
    }

    /**
     * 计算trak box长度
     * @param track 音视频描述数据
     */
    private static _getTrakLen(track: Track): number {
        return BOX_HEAD_LEN + TKHD_TPL.byteLength + MP4._getMdiaLen(track);
    }

    /**
     * 向目标数据写入trak
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeTrak(dest: DestData, track: Track): void {
        const trakLen = MP4._getTrakLen(track);
        this._writeBoxHead(dest, MP4.types.trak, trakLen);
        this._writeTkhd(dest, <AudioTrack & VideoTrack>track);
        this._writeMdia(dest, track);
    }

    /**
     * 计算mdia长度
     * @param track 音视频描述数据
     */
    private static _getMdiaLen(track: Track): number {
        return BOX_HEAD_LEN + MDHD_TPL.byteLength + HDLR[track.type].byteLength + MP4._getMinfLen(track);
    }

    /**
     * 向目标数据写入mdia
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeMdia(dest: DestData, track: Track): void {
        const mdiaLen = MP4._getMdiaLen(track);
        this._writeBoxHead(dest, MP4.types.mdia, mdiaLen);
        this._writeMdhd(dest, track.timescale, track.duration);
        dest.data.set(HDLR[track.type], dest.offset);
        dest.offset += HDLR[track.type].byteLength;
        this._writeMinf(dest, track);
    }

    /**
     * 向目标数据写入mdhd
     * @param dest 写入目标
     * @param timescale timescale
     * @param duration duration
     */
    private static _writeMdhd(dest: DestData, timescale: number, duration: number): void {
        duration *= timescale;
        const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
        const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
        const mdhd = MDHD_TPL;
        mdhd[28] = timescale >> 24 & 0xff;
        mdhd[29] = timescale >> 16 & 0xff;
        mdhd[30] = timescale >> 8 & 0xff;
        mdhd[31] = timescale & 0xff; // timescale
        mdhd[32] = upperWordDuration >> 24;
        mdhd[33] = upperWordDuration >> 16 & 0xff;
        mdhd[34] = upperWordDuration >> 8 & 0xff;
        mdhd[35] = upperWordDuration & 0xff;
        mdhd[36] = lowerWordDuration >> 24;
        mdhd[37] = lowerWordDuration >> 16 & 0xff;
        mdhd[38] = lowerWordDuration >> 8 & 0xff;
        mdhd[39] = lowerWordDuration & 0xff;
        dest.data.set(mdhd, dest.offset);
        dest.offset += mdhd.byteLength;
    }

    /**
     * 计算minf长度
     * @param track 音视频描述数据
     */
    private static _getMinfLen(track: Track): number {
        if (track.type === TrackType.audio) {
            return BOX_HEAD_LEN + SMHD.byteLength + DINF.byteLength + MP4._getStblLen(track);
        }
        return BOX_HEAD_LEN + VMHD.byteLength + DINF.byteLength + MP4._getStblLen(track);
    }

    /**
     * 向目标数据写入minf
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeMinf(dest: DestData, track: Track) {
        this._writeBoxHead(dest, MP4.types.minf, MP4._getMinfLen(track));
        if (track.type === 'audio') {
            dest.data.set(SMHD, dest.offset);
            dest.offset += SMHD.byteLength;
            dest.data.set(DINF, dest.offset);
            dest.offset += DINF.byteLength;
            this._writeStbl(dest, track);
            return;
        }
        dest.data.set(VMHD, dest.offset);
        dest.offset += VMHD.byteLength;
        dest.data.set(DINF, dest.offset);
        dest.offset += DINF.byteLength;
        this._writeStbl(dest, track);
        return;
    }

    /**
     * 计算stbl长度
     * @param track 音视频描述数据
     */
    private static _getStblLen(track: Track): number {
        return BOX_HEAD_LEN + this._getStsdLen(track) + STTS.byteLength + STSC.byteLength + STSZ.byteLength + STCO.byteLength;
    }

    /**
     * 向目标数据写入stbl
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeStbl(dest: DestData, track: Track): void {
        let stblLen = this._getStblLen(track);
        this._writeBoxHead(dest, MP4.types.stbl, stblLen);
        this._writeStsd(dest, track);
        dest.data.set(STTS, dest.offset);
        dest.offset += STTS.byteLength;
        dest.data.set(STSC, dest.offset);
        dest.offset += STSC.byteLength;
        dest.data.set(STSZ, dest.offset);
        dest.offset += STSZ.byteLength;
        dest.data.set(STCO, dest.offset);
        dest.offset += STCO.byteLength;
    }

    /**
     * 计算stsd长度
     * @param track 音视频描述数据
     */
    private static _getStsdLen(track: Track): number {
        if (track.type === TrackType.audio) {
            return MP4._getMp4aStsdLen(<AudioTrack>track);
        } else {
            return MP4._getAvc1StsdLen(<VideoTrack>track);
        }
    }

    /**
     * 向目标数据写入stsd
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeStsd(dest: DestData, track: Track): void {
        if (track.type === TrackType.audio) {
            this._writeMp4aStsd(dest, <AudioTrack>track);
            return;
        }
        this._writeAvc1Stsd(dest, <VideoTrack>track);
    }

    /**
     * 计算avcC长度
     * @param track 音视频描述数据
     */
    private static _getAvcCLen(track: VideoTrack): number {
        const spsLen = track.sps.reduce((prev, item) => {
            return prev + item.byteLength + 2;
        }, 0);
        const ppsLen = track.pps.reduce((prev, item) => {
            return prev + item.byteLength + 2;
        }, 0);
        // 8 + 5 + sps + 1 + pps
        return 15 + spsLen + ppsLen;
    }

    /**
     * 计算avc1长度
     * @param track 音视频描述数据
     */
    private static _getAvc1Len(track: VideoTrack): number {
        // avc1 + avcc + btrt + pasp
        return 86 + MP4._getAvcCLen(track) + 20 + 16;
    }

    /**
     * 计算stsd + avc1长度
     * @param track 音视频描述数据
     */
    private static _getAvc1StsdLen(track: VideoTrack): number {
        // stsd + avc1
        return 16 + this._getAvc1Len(track);
    }

    /**
     * 向目标数据写入stsd(avc1)
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeAvc1Stsd(dest: DestData, track: VideoTrack): void {
        let sps: number[] = [],
            pps: number[] = [],
            i,
            data,
            len;

        for (i = 0; i < track.sps.length; i++) {
            data = track.sps[i];
            len = data.byteLength;
            sps.push(len >>> 8 & 0xff);
            sps.push(len & 0xff);
            sps = sps.concat(Array.prototype.slice.call(data));
        }

        for (i = 0; i < track.pps.length; i++) {
            data = track.pps[i];
            len = data.byteLength;
            pps.push(len >>> 8 & 0xff);
            pps.push(len & 0xff);
            pps = pps.concat(Array.prototype.slice.call(data));
        }
        const avcCLen = this._getAvcCLen(track);
        const avc1Len = this._getAvc1Len(track);
        const stsdLen = this._getAvc1StsdLen(track);
        const avc1Stsd = AVC1_STSD_TPL;
        let width = track.width,
            height = track.height,
            hSpacing = track.pixelRatio[0],
            vSpacing = track.pixelRatio[1];

        avc1Stsd[0] = stsdLen >> 24 & 0xff;
        avc1Stsd[1] = stsdLen >> 16 & 0xff;
        avc1Stsd[2] = stsdLen >> 8 & 0xff;
        avc1Stsd[3] = stsdLen & 0xff;

        avc1Stsd[16] = avc1Len >> 24 & 0xff;
        avc1Stsd[17] = avc1Len >> 16 & 0xff;
        avc1Stsd[18] = avc1Len >> 8 & 0xff;
        avc1Stsd[19] = avc1Len & 0xff;

        avc1Stsd[48] = width >> 8 & 0xff;
        avc1Stsd[49] = width & 0xff; // width
        avc1Stsd[50] = height >> 8 & 0xff;
        avc1Stsd[51] = height & 0xff; // height
        dest.data.set(avc1Stsd, dest.offset);
        dest.offset += avc1Stsd.byteLength;

        this._writeBoxHead(dest, MP4.types.avcC, avcCLen);

        const avcc = [
            0x01, sps[3], sps[4], sps[5],
            0xfc | 3, 0xe0 | track.sps.length
        ]
            .concat(sps)
            .concat([
                track.pps.length
            ])
            .concat(pps);
        dest.data.set(avcc, dest.offset);
        dest.offset += avcc.length;

        dest.data.set(BTRT, dest.offset);
        dest.offset += BTRT.byteLength;

        const pasp = PASP_TPL;
        pasp[8] = hSpacing >> 24; // hSpacing
        pasp[9] = hSpacing >> 16 & 0xff;
        pasp[10] = hSpacing >> 8 & 0xff;
        pasp[11] = hSpacing & 0xff;
        pasp[12] = vSpacing >> 24; // vSpacing
        pasp[13] = vSpacing >> 16 & 0xff;
        pasp[14] = vSpacing >> 8 & 0xff;
        pasp[15] = vSpacing & 0xff;
        dest.data.set(pasp, dest.offset);
        dest.offset += pasp.byteLength;
    }

    /**
     * 计算mp4 esds长度
     * @param track 音视频描述数据
     */
    private static _getMp4aEsdsLen(track: AudioTrack): number {
        const configLen = track.config.length;
        return BOX_HEAD_LEN + 25 + configLen + 4;
    }

    /**
     * 计算stsd + mp4a + esds长度
     * @param track 音视频描述数据
     */
    private static _getMp4aStsdLen(track: AudioTrack): number {
        // stsd + mp4a + esds
        return 16 + 36 + MP4._getMp4aEsdsLen(track);
    }

    /**
     * 向目标数据写入stsd(mp4a)
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeMp4aStsd(dest: DestData, track: AudioTrack): void {
        const configLen = track.config.length;
        const esdsLen = MP4._getMp4aEsdsLen(track);
        const stsdLen = MP4._getMp4aStsdLen(track);
        const mp4aLen = stsdLen - 16;

        const mp4a = MP4A_STSD_TPL;
        mp4a[0] = stsdLen >> 24 & 0xff;
        mp4a[1] = stsdLen >> 16 & 0xff;
        mp4a[2] = stsdLen >> 8 & 0xff;
        mp4a[3] = stsdLen & 0xff;

        mp4a[16] = mp4aLen >> 24 & 0xff;
        mp4a[17] = mp4aLen >> 16 & 0xff;
        mp4a[18] = mp4aLen >> 8 & 0xff;
        mp4a[19] = mp4aLen & 0xff;

        mp4a[41] = track.channelCount;
        mp4a[48] = track.samplerate >> 8 & 0xff;
        mp4a[49] = track.samplerate & 0xff;

        mp4a[52] = esdsLen >> 24 & 0xff;
        mp4a[53] = esdsLen >> 16 & 0xff;
        mp4a[54] = esdsLen >> 8 & 0xff;
        mp4a[55] = esdsLen & 0xff;

        mp4a[65] = 23 + configLen;
        mp4a[70] = 15 + configLen;

        dest.data.set(mp4a, dest.offset);
        dest.offset += mp4a.byteLength;
        let tmp = [configLen].concat(track.config).concat([0x06, 0x01, 0x02]);
        dest.data.set(tmp, dest.offset);
        dest.offset += tmp.length;
    }

    /**
     * 计算mvex长度
     * @param tracks 音视频描述数据
     */
    private static _getMvexLen(tracks: Track[]): number {
        return BOX_HEAD_LEN + tracks.length * TREX_TPL.byteLength;
    }

    /**
     * 向目标数据写入mvex
     * @param dest 写入目标
     * @param tracks 音视频描述数据
     */
    private static _writeMvex(dest: DestData, tracks: Track[]): void {
        let mvexLen = MP4._getMvexLen(tracks);
        this._writeBoxHead(dest, MP4.types.mvex, mvexLen);
        tracks.forEach(item => {
            MP4._writeTrex(dest, item);
        })
    }

    /**
     * 向目标数据写入trex
     * @param dest 写入目标
     * @param track 音视频描述数据
     */
    private static _writeTrex(dest: DestData, track: Track): void {
        const id = track.id;
        const trex = TREX_TPL;
        trex[12] = id >> 24;
        trex[13] = id >> 16 & 0xff;
        trex[14] = id >> 8 & 0xff;
        trex[15] = id & 0xff; // track_ID
        dest.data.set(trex, dest.offset);
        dest.offset += trex.byteLength;
    }

    /**
     * 写入moof头
     * @param dest 写入目标
     * @param sn sn
     * @param baseMediaDecodeTime baseMediaDecodeTime
     * @param track 音视频描述数据
     * @param mdatLen mdat box 长度
     */
    private static _writeMoof(dest: DestData, sn: number, baseMediaDecodeTime: number, track: Track): void {
        // mooflen = 8 + mfhd(8 + 8 ) + traf(8 + tfhd(8 + 8) + tfdt(8 + 12) + trun(8 + 12 + 16 * sample.len) + sdtp(8 + 4 + sample.len)) = 100 + 17 * track.samples.length;
        // trunOffset = moof + mdat header
        let len = track.mp4Samples.length,
            moofLen = MP4._getMoofLen(len),
            trafLen = moofLen - 24,
            sdtpLen = 12 + len,
            trunLen = 20 + 16 * len,
            trunOffset = moofLen + 8,
            id = track.id,
            samples = track.mp4Samples || [],
            upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1)),
            lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));

        // moof
        MP4._writeBoxHead(dest, MP4.types.moof, moofLen);

        // mfhd
        MP4._writeBoxHead(dest, MP4.types.mfhd, 16);
        dest.data[dest.offset + 4] = sn >> 24;
        dest.data[dest.offset + 5] = sn >> 16 & 0xff;
        dest.data[dest.offset + 6] = sn >> 8 & 0xff;
        dest.data[dest.offset + 7] = sn & 0xff;
        dest.offset += 8;

        // traf
        MP4._writeBoxHead(dest, MP4.types.traf, trafLen);

        // tfhd
        MP4._writeBoxHead(dest, MP4.types.tfhd, 16);
        dest.data[dest.offset + 4] = id >> 24;
        dest.data[dest.offset + 5] = id >> 16 & 0xff;
        dest.data[dest.offset + 6] = id >> 8 & 0xff;
        dest.data[dest.offset + 7] = id & 0xff;
        dest.offset += 8;

        // tfdt
        MP4._writeBoxHead(dest, MP4.types.tfdt, 20);
        dest.data[dest.offset] = 1;
        dest.data[dest.offset + 4] = upperWordBaseMediaDecodeTime >> 24;
        dest.data[dest.offset + 5] = upperWordBaseMediaDecodeTime >> 16 & 0xff;
        dest.data[dest.offset + 6] = upperWordBaseMediaDecodeTime >> 8 & 0xff;
        dest.data[dest.offset + 7] = upperWordBaseMediaDecodeTime & 0xff;
        dest.data[dest.offset + 8] = lowerWordBaseMediaDecodeTime >> 24;
        dest.data[dest.offset + 9] = lowerWordBaseMediaDecodeTime >> 16 & 0xff;
        dest.data[dest.offset + 10] = lowerWordBaseMediaDecodeTime >> 8 & 0xff;
        dest.data[dest.offset + 11] = lowerWordBaseMediaDecodeTime & 0xff;
        dest.offset += 12;

        // sdtp
        MP4._writeBoxHead(dest, MP4.types.sdtp, sdtpLen);
        dest.offset += 4;
        samples.forEach((sample, index) => {
            let flags = sample.flags;
            dest.data[dest.offset + index] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
        });
        dest.offset += len;

        // trun
        MP4._writeBoxHead(dest, MP4.types.trun, trunLen);
        dest.data[dest.offset + 2] = 15;
        dest.data[dest.offset + 3] = 1;
        dest.data[dest.offset + 4] = len >>> 24 & 0xff;
        dest.data[dest.offset + 5] = len >>> 16 & 0xff;
        dest.data[dest.offset + 6] = len >>> 8 & 0xff;
        dest.data[dest.offset + 7] = len & 0xff;
        dest.data[dest.offset + 8] = trunOffset >>> 24 & 0xff;
        dest.data[dest.offset + 9] = trunOffset >>> 16 & 0xff;
        dest.data[dest.offset + 10] = trunOffset >>> 8 & 0xff;
        dest.data[dest.offset + 11] = trunOffset & 0xff;
        dest.offset += 12;
        samples.forEach((sample, index) => {
            dest.data.set([
                sample.duration >>> 24 & 0xff,
                sample.duration >>> 16 & 0xff,
                sample.duration >>> 8 & 0xff,
                sample.duration & 0xff, // sample_duration
                sample.len >>> 24 & 0xff,
                sample.len >>> 16 & 0xff,
                sample.len >>> 8 & 0xff,
                sample.len & 0xff, // sample_len
                sample.flags.isLeading << 2 | sample.flags.dependsOn,
                sample.flags.isDependedOn << 6 | sample.flags.hasRedundancy << 4 | sample.flags.isNonSync,
                sample.flags.degradPrio & 0xf0 << 8,
                sample.flags.degradPrio & 0x0f, // sample_flags
                sample.cts >>> 24 & 0xff,
                sample.cts >>> 16 & 0xff,
                sample.cts >>> 8 & 0xff,
                sample.cts & 0xff // sample_composition_time_offset
            ], dest.offset + 16 * index
            );
        });
        dest.offset += len * 16;
    }

    /**
     * 写入box头
     * @param dest 写入目标
     * @param type box type
     * @param len box len
     */
    private static _writeBoxHead(dest: DestData, type: number[], len: number): void {
        dest.data[dest.offset] = len >> 24 & 0xff;
        dest.data[dest.offset + 1] = len >> 16 & 0xff;
        dest.data[dest.offset + 2] = len >> 8 & 0xff;
        dest.data[dest.offset + 3] = len & 0xff;
        dest.data.set(type, dest.offset + 4);
        dest.offset += 8;
    }
}

export default MP4;
