/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:46:18 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:46:18 
 * 多码率相关类型定义
 */
import { EventEmitter } from 'events';
import { AbrManifest } from "../abr/abr-manifest";

/**
 * 自适应算法接口定义
 */
export interface IAbrAlgorithm extends EventEmitter {
    nextLevel: number;
    init(manifest: AbrManifest, status?: RealtimeStatus, config?: any): void;
    setAvailableBitrates(list: number[]): void;
    onGOP(buffered: number, size: number, time: number): void;
    onLevelLoad(index: number): void;
    destroy(): void;
}

/**
 * 算法回调定义
 */
export type RealtimeStatus = {
    bufferedSec: () => number;
    downloadSize: () => number;
}

