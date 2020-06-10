const assert = require('assert');
import SPS from '../../../src/demux/sps-parser';

const sps264 = new Uint8Array([
    103, 100, 0, 40,
    172, 217, 64, 120,
    2, 39, 229, 132,
    0, 0, 3, 0,
    4, 0, 0, 3,
    0, 240, 60, 96,
    198, 88
]);

const sps264_b = new Uint8Array([
    103, 100, 0, 30,
    172, 180, 5, 1,
    127, 203, 128,
    136, 0, 0, 3,
    0, 8, 0, 0,
    3, 1, 148, 120,
    177, 117
]);

describe('sps parser class', () => {
    it('264', () => {
        const data = SPS.parse(sps264);
        const d = {
            profile: 'High',
            level: '4.0',
            chromaFormat: '4:2:0',
            fps: 0,
            pixelAspectRatio: [1, 1],
            width: 1920, height: 1080
        };
        assert.deepEqual(data, d, 'h264sps');
    });
    it('264 b', () => {
        const data = SPS.parse(sps264_b);
        const d = {
            profile: 'High',
            level: '3.0',
            chromaFormat: '4:2:0',
            fps: 25,
            pixelAspectRatio: [1, 1],
            width: 640, height: 360
        };
        assert.deepEqual(data, d, 'h264sps b');
    });

});
