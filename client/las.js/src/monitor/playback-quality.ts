/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:48:59 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:48:59 
 * 播放质量信息
 */
const { performance } = window;

type PlaybackQualityInfo = {
    decoded: number,
    dropped: number,
    decodedFPS: number,
    droppedFPS: number
}
/**
 * 播放质量信息
 * 计算视频播放的解码总数、丢帧总数，解码FPS，丢帧FPS
 */
class PlaybackQuality {
    private tag: string = 'fps';
    private _lastDroppedFrames: number = 0;
    private _lastDecodedFrames: number = 0;
    private _video: HTMLVideoElement | null = null;
    private _isVideoPlaybackQualityAvailable: boolean = false;
    private _lastTime: number = 0;
    private _decoded: number = 0;
    private _dropped: number = 0

    constructor() {
    }

    /**
     * 绑定HTMLVideoElement元素
     * @param media HTMLVideoElement
     */
    public attachMedia(media: HTMLVideoElement): void {
        const video = this._video = media instanceof (window as any).HTMLVideoElement ? media : null;
        if (video) {
            // 部分浏览器seek后帧数信息归零的问题
            this._isVideoPlaybackQualityAvailable = typeof video.getVideoPlaybackQuality === 'function';
        }
    }

    public destory() {
    }

    /**
     * 重置
     */
    public reset() {
        this._lastTime = performance.now();
        this._lastDroppedFrames = this._lastDecodedFrames = this._decoded = this._dropped = 0;
        const video = this._video;
        if (video) {
            try {
                if (this._isVideoPlaybackQualityAvailable) {
                    const videoPlaybackQuality = video.getVideoPlaybackQuality();
                    this._lastDecodedFrames = videoPlaybackQuality.totalVideoFrames;
                    this._lastDroppedFrames = videoPlaybackQuality.droppedVideoFrames;
                } else {
                    this._lastDecodedFrames = (video as any).webkitDecodedFrameCount;
                    this._lastDroppedFrames = (video as any).webkitDroppedFrameCount;
                }
            } catch (e) {
                return;
            }
        }
    }

    /**
     * 获取播放质量信息
     */
    public getInfo(): PlaybackQualityInfo | undefined {
        const video = this._video;
        const currentTime = performance.now();
        let decoded = 0, dropped = 0;

        if (video) {
            if (this._isVideoPlaybackQualityAvailable) {
                const videoPlaybackQuality = video.getVideoPlaybackQuality();
                decoded = videoPlaybackQuality.totalVideoFrames;
                dropped = videoPlaybackQuality.droppedVideoFrames;
            } else {
                decoded = (video as any).webkitDecodedFrameCount || 0;
                dropped = (video as any).webkitDroppedFrameCount || 0;
            }
        }

        if (decoded) {
            if (decoded < this._lastDecodedFrames) {
                this._lastDecodedFrames = 0;
                this._lastDroppedFrames = 0;
            }
            let currentPeriod = currentTime - this._lastTime,
                currentDropped = dropped - this._lastDroppedFrames,
                currentDecoded = decoded - this._lastDecodedFrames,
                droppedFPS = 0,
                decodedFPS = 0;
            if (this._lastTime) {
                droppedFPS = parseFloat((1000 * currentDropped / currentPeriod).toFixed(2)),
                    decodedFPS = parseFloat((1000 * currentDecoded / currentPeriod).toFixed(2));
            }
            this._decoded = this._decoded += currentDecoded;
            this._dropped = this._dropped += currentDropped;
            this._lastTime = currentTime;
            this._lastDroppedFrames = dropped;
            this._lastDecodedFrames = decoded;

            return {
                decoded: this._decoded,
                dropped: this._dropped,
                decodedFPS,
                droppedFPS
            };
        }
        this._lastTime = currentTime;
        return;
    }
}

export default PlaybackQuality;
