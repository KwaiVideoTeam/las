const assert = require('assert');
import FlvScriptTagDecoder from '../../../../src/demux/flv/flv-script-tag-decoder';
import { mockAMF, mockAMFKwai } from '../../../mocks/mock-amf';

describe('AMF test', () => {
    it('AMF parse', () => {
        const result = FlvScriptTagDecoder.decode(mockAMF.buffer);
        console.log('debug result', result);
        const metadata = result.onMetaData;
        assert.equal(metadata.duration, 634.633, `duration:${metadata.duration} 634.633`);
        assert.equal(metadata.width, 848, `metadata.width:${metadata.width} 848`);
        assert.equal(metadata.height, 480, `metadata.height:${metadata.height} 480`);
        assert.equal(metadata.encoder, 'Lavf58.12.100', `metadata.encoder:${metadata.encoder} Lavf58.12.100`);
        assert.equal(metadata.handler_name, 'VideoHandler', `metadata.handler_name:${metadata.handler_name} VideoHandler`);
        assert.deepEqual(metadata.arr, [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9], `metadata.arr:${metadata.arr}`);
    })

    it('AMF parse kwai', () => {
        const result = FlvScriptTagDecoder.decode(mockAMFKwai.buffer);
        const metadata = result.onMetaData;
        assert.equal(metadata.duration, 0);
        assert.equal(metadata.width, 1920);
        assert.equal(metadata.height, 1080);
        assert.equal(metadata.ksai, 'C<,aehnnnACd+,ajfnnnACd;6alA');
        assert.equal(metadata.kshi, 'CgACmpfpepfkfACU0*92vLu~F9/0vLu~[NI~~~~~~~~~~~Fiign~~^~lpekWV$ACmpnnAC],%=?SJNA');
        assert.equal(metadata.ksvi, 'CKGlhjAC<,?505*ahnnnd<,?1=&ahnnnd<,?150aknnnd8.+aliA');
    })
});