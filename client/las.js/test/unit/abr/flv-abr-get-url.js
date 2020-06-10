const assert = require('assert');
import { abrGetUrl } from '../../../src/abr/abr-get-url';

describe('abrGetUrl', () => {
    it('abrGetUrl', () => {
        let urlA = abrGetUrl('http://test/1', 123);
        assert.equal(urlA, 'http://test/1?startPts=123');
        let urlB = abrGetUrl('http://test/1');
        assert.equal(urlB, 'http://test/1');
        let urlC = abrGetUrl('https://test3/1?test=3', 234);
        assert.equal(urlC, 'https://test3/1?startPts=234&test=3');
        let urlD = abrGetUrl('https://test4/1?test=4#444', 345);
        assert.equal(urlD, 'https://test4/1?startPts=345&test=4#444');
    });
});