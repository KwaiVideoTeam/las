/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:49:54 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:49:54 
 * Uint8Array数据缓存
 */
class Cache {
    // 100m = 104857600 = 100 * 1024 * 1024
    public static MAX_CACHE_SIZE = 104857600;
    public static DEFAULT_CACHE_SIZE = 3145728;
    // 初始cache大小
    private _size: number;
    private _readOffset: number = 0;
    private _writeOffset: number = 0;
    // cache
    private _storage: ArrayBuffer;
    private _cache: Uint8Array;

    constructor(size: number = 0) {
        if (size > 0) {
            this._size = size;
        } else {
            this._size = Cache.DEFAULT_CACHE_SIZE;
        }
        this._storage = new ArrayBuffer(this._size);
        this._cache = new Uint8Array(this._storage);
    }

    /**
     * 添加至cache
     * @param chunk 数据
     */
    public put(chunk: Uint8Array): void {
        if (this._readOffset === this._writeOffset) {
            this._readOffset = this._writeOffset = 0;
        }
        if (this._writeOffset + chunk.byteLength > this._size) {
            const expected = this._writeOffset + chunk.byteLength - this._readOffset;
            if (expected > this._size) {
                // 扩展
                this._collateCache();
                this.expandCache(expected);
            } else {
                // 整理buffer
                this._collateCache();
            }
        }
        this._cache.set(chunk, this._writeOffset);
        this._writeOffset += chunk.byteLength;
    }

    /**
     * 获取数据拷贝
     * @param len 数据长度
     * @returns 数据
     */
    public get(len: number): Uint8Array | null {
        if (len + this._readOffset > this._writeOffset) {
            return null;
        }
        let data = null;
        if (this._cache.slice) {
            data = this._cache.slice(this._readOffset, this._readOffset + len);
        } else {
            const offset = this._cache.byteOffset + this._readOffset;
            data = new Uint8Array(this._storage.slice(offset, offset + len));
        }
        this._readOffset += len;
        return data;
    }

    /**
     * 获取数据读取Uint8Array，从cache中直接读取，异步使用可能出现故障
     * @param len 长度
     * @returns 数据
     */
    public read(len: number): Uint8Array | null {
        if (len + this._readOffset > this._writeOffset) {
            return null;
        }
        return new Uint8Array(this._storage, this._readOffset, len);
    }

    /**
     * 后移读指针
     * @param len 数据长度
     */
    public skip(len: number): void {
        if (len + this._readOffset > this._writeOffset) {
            return;
        }
        this._readOffset += len;
    }

    /**
     * 清理
     */
    public clear(): void {
        this._readOffset = this._writeOffset = 0;
    }

    /**
     * 扩展cache，cache不足时，cache容量max(翻倍,预期)
     * @param expected 预期最小值
     */
    public expandCache(expected: number = 0): void {
        this._size = Math.max(this._size * 2, expected);
        if (this._size >= Cache.MAX_CACHE_SIZE) {
            throw new Error('max cache size');
        }
        if (this._readOffset === 0 && this._writeOffset === 0) {
            this._storage = new ArrayBuffer(this._size);
        } else {
            this._storage = this._transfer(this._storage, this._size);
        }
        this._cache = new Uint8Array(this._storage);
    }

    /**
     * 未读取数据长度
     */
    public get unreadLen(): number {
        return this._writeOffset - this._readOffset;
    }

    /**
     * 整理cache中的数据，抛弃已读取的数据
     */
    private _collateCache(): void {
        const remain = new Uint8Array(this._storage, this._readOffset, this._writeOffset - this._readOffset);
        this._cache.set(remain);
        this._writeOffset -= this._readOffset;
        this._readOffset = 0;
    }

    private _transfer(source: ArrayBuffer, length: number): ArrayBuffer {
        if (!(source instanceof ArrayBuffer)) {
            throw new TypeError('Source must be an instance of ArrayBuffer');
        }
        if (length <= source.byteLength) {
            return source.slice(0, length);
        }
        const sourceView = new Uint8Array(source),
            destView = new Uint8Array(new ArrayBuffer(length));
        destView.set(sourceView);
        return destView.buffer;
    }
}

export default Cache;
