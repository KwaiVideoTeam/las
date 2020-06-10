const assert = require('assert');
import { isSupported } from '../../../src/utils/is-supported';

describe('is-supported', () => {
    it('is-supported', () => {
        assert.ok(isSupported());
    })
});