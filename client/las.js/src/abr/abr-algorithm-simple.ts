/*
 * @Author: wuwenjun
 * @Date: 2020-06-09 11:54:34
 * @Last Modified by:   wuwenjun
 * @Last Modified time: 2020-06-09 11:54:34
 * 自适应算法
 */
import { EventEmitter } from 'events';
import { Log } from '../utils/log';
import AbrLevel from './abr-level';
import { AbrManifest } from './abr-manifest';
import { IAbrAlgorithm, RealtimeStatus } from '../types/abr';
import { SpeedTest, SpeedTestContext, SpeedTestResult } from "../utils/speed-test";

type AdaptiveConfig = {
    stableBufferDiffThresholdSecond: number;
    stableBufferIntervalMs: number;
    speedTestTimeoutMs: number;
    generateSpeedGapMs: number;
    bufferCheckIntervalMs: number,
    smoothedSpeedUtilizationRatio: number;
    smallSpeedToBitrateRatio: number;
    enoughSpeedToBitrateRatio: number;
    bufferLowerLimitSecond: number;
    recentBufferedSize: number;
    smoothedSpeedRatio: number;
    isSpeedFullyUsed: boolean;
};

const tag = 'algorithm-simple';

const CONFIG: AdaptiveConfig = {
    stableBufferDiffThresholdSecond: 0.15,
    stableBufferIntervalMs: 2000,
    speedTestTimeoutMs: 500,
    generateSpeedGapMs: 3000,
    bufferCheckIntervalMs: 500,
    smoothedSpeedUtilizationRatio: 0.8,
    smallSpeedToBitrateRatio: 0.4,
    enoughSpeedToBitrateRatio: 0.9,
    bufferLowerLimitSecond: 0.6,
    recentBufferedSize: 16,
    smoothedSpeedRatio: 0.9,
    isSpeedFullyUsed: true,
};

/**
 * 自适应码率算法入口
 */
class AbrAlgorithmSimple extends EventEmitter implements IAbrAlgorithm {
    private _conf!: AdaptiveConfig;
    private _pastBuffer!: number[];
    private _levels!: AbrLevel[];
    private _current: number = 0; // 当前正在加载的流index
    private _next: number = 0; // 下一个切换的流index
    private _stableBufferStartTime: number = performance.now();
    private _speedTester: SpeedTest = new SpeedTest();
    private _generatedSpeed: number = 0;
    private _lastCheckBuffer: number = 0;
    private _lastSpeed: number = 0;
    private _timer: any;

    constructor() {
        super();
    }

    /**
     * 初始化，并写入初始码率
     * @param manifest 流信息
     * @param config 算法配置
     */
    public init(manifest: AbrManifest, status?: RealtimeStatus, config?: any): void {
        this._conf = Object.assign({}, CONFIG);
        Object.assign(this._conf, config);
        Log.i(tag, 'init', manifest, config, this._conf);

        this._levels = manifest.levels.slice(0);
        this._next = manifest.default;
        this._pastBuffer = [0.1];
        if (status) {
            this._timer = setInterval(() => { this._checkBuffer(status); }, this._conf.bufferCheckIntervalMs);
        }
    }

    private _updateStableBuffer(buffered: number) {
        const diff = buffered - this._lastCheckBuffer;
        const diffRatio = diff / buffered;
        const now = performance.now();
        if (diff < -this._conf.stableBufferDiffThresholdSecond || diffRatio < -0.2) {
            Log.v(tag, `bufferDiffDown: ${diff.toFixed(2)}s, diffRatio: ${diffRatio.toFixed(2)}`);
            this._stableBufferStartTime = Math.max(now, this._stableBufferStartTime);
        }
        if (diff > this._conf.stableBufferDiffThresholdSecond
            && now - this._stableBufferStartTime + this._conf.bufferCheckIntervalMs > this._conf.stableBufferIntervalMs) {
            this._stableBufferStartTime = Math.max(
                now - this._conf.bufferCheckIntervalMs * 2,
                this._stableBufferStartTime + this._conf.bufferCheckIntervalMs * 2
            );
            Log.v(tag, `bufferDiffUp: ${diff.toFixed(2)}s`);
        }
        this._lastCheckBuffer = buffered;
        return now - this._stableBufferStartTime > this._conf.stableBufferIntervalMs;
    }

    private _isSpeedFullyUsed() {
        return this._conf.isSpeedFullyUsed;
    }

    /**
     * 周期检查buffer水平和瞬时带宽，判断是否开启测速
     * @param status 获取buffer和下载信息
     */
    private _checkBuffer(status: RealtimeStatus) {
        const buffered = status.bufferedSec();
        const isBufferStable = this._updateStableBuffer(buffered);
        if (this._isSpeedFullyUsed()) {
            if (isBufferStable && this._current + 1 < this._levels.length) {
                this._generatedSpeed = this._levels[this._current + 1].bitrate;
            } else {
                this._generatedSpeed = 0;
            }
        } else if (isBufferStable && this._current + 1 < this._levels.length) {
            this._startTesting(status);
            this._stableBufferStartTime = performance.now() + this._conf.generateSpeedGapMs;
        }
        this._pastBuffer.push(buffered);
        if (this._pastBuffer.length > this._conf.recentBufferedSize) {
            this._pastBuffer.shift();
        }

    }

    /**
     * 基于下一档码率，开启测速，并更新_speedTestResult
     * @param status 获取buffer和下载信息
     */
    private _startTesting(status: RealtimeStatus) {
        Log.v(tag, `start speed testing on index: ${this._current + 1}`);
        const lastDownloadSize = status.downloadSize();
        const testedBitrate = this._levels[this._current + 1].bitrate;
        this._speedTester.start(
            { url: this._levels[this._current + 1].url, timeout: this._conf.speedTestTimeoutMs },
            {
                onEnd: (context: SpeedTestContext, result: SpeedTestResult) => {
                    const originalDownloadSize = status.downloadSize() - lastDownloadSize;
                    if (result.succeeded && result.duration > 0 && result.firstPackageDuration > 0) {
                        const testedSpeed = (originalDownloadSize + result.loaded) * 8 / result.duration;
                        Log.v(tag, `testSpeed: ${testedSpeed.toFixed(0)}`);
                        if (testedSpeed >= testedBitrate) {
                            this._generatedSpeed = testedBitrate;
                        }
                    }
                    Log.v(tag, `succeeded: ${result.succeeded}, firstPackageDuration: ${result.firstPackageDuration}, originalDownloadSize: ${originalDownloadSize}, downloadSize: ${result.loaded}, downloadTime: ${result.duration}`)
                }
            }
        );
    }

    /**
     * 设置码率列表中的清晰度是否可用
     * @param list 码率index列表
     */
    public setAvailableBitrates(list: number[]): void { }

    /**
     * 获取下一个清晰度
     * @returns {number} 下个清晰度index
     */
    public get nextLevel(): number {
        Log.v(tag, `nextLevel: ${this._next}`);
        return this._next;
    }

    /**
     * 收到关键帧
     * @param buffered buffer长度（秒）
     * @param size 下载长度
     * @param time 下载耗时（秒）
     */
    public onGOP(buffered: number, size: number, time: number): void {
        // Byte/s -> kbps: {x} * 1000 * 8 / 1024;
        let speed = (size / Math.max(time, 0.05)) * 8 / 1024;
        Log.v(tag, `buffered: ${buffered.toFixed(2)}, size: ${size}, time: ${time.toFixed(2)}`)
        this._next = this._nextRateIndex(speed, buffered);
    }

    /**
     * 当开始加载新流
     * @param index 清晰度index
     */
    public onLevelLoad(index: number): void {
        this._current = Math.max(0, index);
    }

    public destroy(): void {
        this._speedTester.destroy();
        clearInterval(this._timer);
    }

    private _quantization(speed: number): number {
        let index = 0;
        for (let i = this._levels.length - 1; i >= 0; i--) {
            if (speed >= this._levels[i].bitrate) {
                index = i;
                break;
            }
        }
        return index;
    }

    /**
     * 计算下一个使用的码率
     * @param speed 下载速度 kbps
     * @param buffered 当前buffer ms
     */
    private _nextRateIndex(speed: number, buffered: number): number {
        let index = this._nextRateBySpeedAndBuffered(speed, buffered);
        if (index != this._current) {
            this._stableBufferStartTime = performance.now() + this._conf.generateSpeedGapMs;
        }
        if (index < this._current) {
            this._speedTester.cancel();
            this._generatedSpeed = 0;
            this._lastSpeed = speed;
            this._pastBuffer = [buffered];
        } else {
            this._lastSpeed = this._getSmoothedSpeed(speed);
        }
        return index;
    }

    /**
     * 获取平滑带宽
     * @param speed 下载速度 kbps
     */
    private _getSmoothedSpeed(speed: number) {
        if (this._lastSpeed > 0) {
            return speed * (1 - this._conf.smoothedSpeedRatio) + this._lastSpeed * this._conf.smoothedSpeedRatio;
        }
        return speed;
    }

    private _getPredictedBuffer(buffered: number) {
        const pastBuffer = Math.max(...this._pastBuffer);
        return buffered + (buffered - pastBuffer);
    }

    private _getBufferSpeed(buffered: number) {
        const pastBuffer = Math.max(...this._pastBuffer);
        const bufferSpeedRatio = 1 + (buffered - pastBuffer) / pastBuffer;
        return bufferSpeedRatio * this._levels[this._current].bitrate;
    }

    private _isSpeedTooSmall(speed: number) {
        return speed / this._levels[this._current].bitrate < this._conf.smallSpeedToBitrateRatio;
    }

    private _isSpeedEnough(speed: number) {
        return speed / this._levels[this._current].bitrate > this._conf.enoughSpeedToBitrateRatio;
    }

    /**
     * 根据下载速度和buffer长度计算下一个码率
     * @param speed 下载速度 kbps
     * @param buffered 当前buffer ms
     */
    private _nextRateBySpeedAndBuffered(
        speed: number,
        buffered: number
    ): number {
        const bufferSpeed = this._getBufferSpeed(buffered);
        const smoothedSpeed = this._getSmoothedSpeed(speed);
        Log.v(tag, `gopSpeed: ${speed.toFixed(0)}, smoothedSpeed: ${smoothedSpeed.toFixed(0)}`);

        const predictedBuffered = this._getPredictedBuffer(buffered);
        Log.v(tag, `bufferSpeed: ${bufferSpeed.toFixed(0)}, predictedBuffered: ${predictedBuffered.toFixed(1)}`);

        let nextIndex = this._current;
        if (predictedBuffered < this._conf.bufferLowerLimitSecond || this._isSpeedTooSmall(bufferSpeed)) {
            nextIndex = Math.min(this._current, this._quantization(bufferSpeed));
        } else if (this._isSpeedEnough(bufferSpeed)) {
            if (this._generatedSpeed > 0) {
                Log.i(tag, `generatedSpeed used`);
                nextIndex = this._quantization(this._generatedSpeed);
                this._generatedSpeed = 0;
            } else {
                nextIndex = this._quantization(smoothedSpeed * this._conf.smoothedSpeedUtilizationRatio);
            }
            nextIndex = Math.min(this._current + 1, Math.max(nextIndex, this._current));
        }
        return nextIndex;
    }
}

export default AbrAlgorithmSimple;
