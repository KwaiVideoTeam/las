/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:51:05 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:51:05 
 * 哥伦布编码读取器
 */
class ExpGolomb {
    private _data: Uint8Array;
    private _byteIndex: number;
    private _bitIndex: number;

    constructor(data: Uint8Array) {
        this._data = data;
        this._byteIndex = 0;
        this._bitIndex = 0;
    }

    /**
     * 跳过指定长度bit
     * @param bitLen 位长度
     */
    public skipBits(bitLen: number): void {
        if (this.bitRemaining > bitLen) {
            let bitMove = bitLen % 8;
            this._byteIndex = this._byteIndex + Math.floor(bitLen / 8) + Math.floor((this._bitIndex + bitMove) / 8);
            this._bitIndex = (this._bitIndex + bitMove) % 8;
        } else {
            // 结尾
            this._byteIndex = this._data.byteLength - 1;
            this._bitIndex = 7;
        }
    }

    /**
     * 读取指定长度bit
     * @param bitLen 位长度
     */
    public bits(bitLen: number): number {
        if (bitLen > 32) {
            throw new Error('len must be less 32');
        }
        let byte = this._data[this._byteIndex];
        // 当前字节需要读取位数
        let readBitLen = Math.min(8 - this._bitIndex, bitLen);
        // 当前字节数据需要左移位数
        let shiftLeft = bitLen - readBitLen;
        // 刷新index
        this._bitIndex += readBitLen;
        let value = (byte >> (8 - this._bitIndex)) & Math.pow(2, readBitLen) - 1;
        if (this._bitIndex === 8) {
            this._bitIndex = 0;
            this._byteIndex++;
        }
        if (shiftLeft) {
            return (value << shiftLeft) | this.bits(shiftLeft);
        }
        return value;
    }

    /**
     * 无符号指数哥伦布编码
     */
    public ue() {
        let count = this._leadingZeroCount();
        return this.bits(count + 1) - 1;
    }

    /**
     * 有符号指数哥伦布编码
     */
    public se() {
        let ue = this.ue();
        return Math.pow(-1, ue + 1) * Math.ceil(ue / 2)
    }

    /**
     * 剩余bit数
     */
    public get bitRemaining(): number {
        return (this._data.byteLength - this._byteIndex) * 8 - this._bitIndex;
    }

    /**
     * 哥伦布编码前导0计数
     */
    private _leadingZeroCount(): number {
        let bitRemaining = this.bitRemaining;
        for (let i = 0; i < bitRemaining; i++) {
            if (this.bits(1) === 1) {
                if (this._bitIndex === 0) {
                    this._byteIndex--;
                    this._bitIndex = 7;
                } else {
                    this._bitIndex--;
                }
                return i;
            }
        }
        return 0;
    }
}

export default ExpGolomb;
