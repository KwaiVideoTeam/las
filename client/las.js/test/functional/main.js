const assert = require('assert');
import Las from '../../src';
import Manifest from '../mocks/test-manifest.json';

let player;
const v = document.getElementsByTagName('video');
if (v.length) {
    player = v[0];
} else {
    player = document.createElement('video');
    player.setAttribute('controls', 'controls');
    player.setAttribute('autoplay', 'autoplay');
    player.setAttribute('muted', true);
    player.setAttribute('width', '500');
    player.setAttribute('height', '300');
    document.body.appendChild(player);
}
player.muted = true;

describe('las.js main test', () => {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    let las;
    let i = 0;
    beforeEach(done => {
        las = new Las();
        las.attachMedia(player)
        las.on('error', e => {
            assert.ok(false, `kernel error: ${e.code}`);
        });
        las.load(Manifest);

        setTimeout(() => {
            done();
        }, 10000);
    });

    afterEach(done => {
        las.destroy();
        assert.ok(!player.getAttribute('src'), 'clear video src');
        las = null;
        setTimeout(() => {
            done();
        }, 0);
    });

    it('base', () => {
        assert.ok(!player.error, `video error`);
        assert.ok(player.currentTime > 0, `video currentTime:${player.currentTime}`)
    });
});