const assert = require('assert');
import Cache from '../../../src/io/cache';

function uint8Array2Str(data) {
    let len = data.byteLength;
    if (len > 0) {
        let str = '';
        for (let i = 0; i < len; i++) {
            str += (data[i].toString(16).length === 1 ? '0' + data[i].toString(16) : data[i].toString(16)) + ' ';
        }
        return str;
    } else {
        throw new Error('out of memory');
    }
}

describe('download-cache class test', () => {
    let cache;

    describe('read write', () => {
        beforeEach(() => {
            cache = new Cache();
        });

        it('push', () => {
            const data = new Uint8Array([1,2,3,4,5,6,7,8,9,0]);
            for(let i = 0; i < 1000; i++) {
                cache.put(data);
            }
            let unread = data.byteLength * 1000;
            assert.equal(cache.unreadLen, unread);

            unread += cache._size;
            cache.put(new Uint8Array(cache._size));
            assert.equal(cache.unreadLen, unread, 'push and _expandCache');

            cache.put(new Uint8Array(cache._size - cache._writeOffset - 10));
            cache.get(cache.unreadLen);
            cache.put(new Uint8Array(20));
            assert.equal(cache.unreadLen, 20, 'push and _collateCache');

            expect(() => cache.put(new Uint8Array(104857600))).toThrow();
        });

        it('readData', () => {
            const data = new Uint8Array([1,2,3,4,5,6,7,8,9,0]);
            for(let i = 0; i < 1000; i++) {
                cache.put(data);
            }
            cache.get(1000);
            let result = cache.read(1000);
            assert.equal(cache._readOffset, 1000);
            assert.equal(result.byteLength, 1000);
            result = cache.read(cache.unreadLen + 1);
            assert.ok(!result);
        });

        it('getData', () => {
            const data = new Uint8Array([1,2,3,4,5,6,7,8,9,0]);
            for(let i = 0; i < 1000; i++) {
                cache.put(data);
            }
            cache.get(1000);
            assert.equal(cache._readOffset, 1000);
            let result = cache.get(1000);
            assert.equal(cache._readOffset, 2000);
            assert.equal(result.byteLength, 1000);
            result = cache.get(cache.unreadLen + 1);
            assert.ok(!result);
            cache._cache.slice = null;
            result = cache.get(1000);
            assert.equal(result.byteLength, 1000);
            assert.equal(cache._readOffset, 3000);
        });

        it('flush', () => {
            const data = new Uint8Array([1,2,3,4,5,6,7,8,9,0]);
            for(let i = 0; i < 1000; i++) {
                cache.put(data);
            }
            cache.get(1000);
            cache.clear();
            assert.equal(cache.unreadLen, 0);
            assert.equal(cache._writeOffset, 0);
            assert.equal(cache._readOffset, 0);
        });
        it('skip', () => {
            const data = new Uint8Array([1,2,3,4,5,6,7,8,9,0]);
            for(let i = 0; i < 1000; i++) {
                cache.put(data);
            }
            cache.skip(1000);
            assert.equal(cache._readOffset, 1000);
            assert.equal(cache.unreadLen, data.byteLength * 1000 - 1000);
            cache.skip(cache.unreadLen + 1);
            assert.equal(cache._readOffset, 1000);
            assert.equal(cache.unreadLen, data.byteLength * 1000 - 1000);
        });

        it('_transfer', () => {
            const data = new Uint8Array([1,2,3,4,5,6,7,8,9,0]);
            for(let i = 0; i < 1000; i++) {
                cache.put(data);
            }
            cache.skip(1000);
            expect(() => cache._transfer(null)).toThrow();
            const result = cache._transfer(cache._cache.buffer, cache._cache.buffer.byteLength - 10);
            assert.equal(result.byteLength, cache._cache.buffer.byteLength - 10);
        });
    });
});