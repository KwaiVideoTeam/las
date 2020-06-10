/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:53:57 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:53:57 
 * 单个清晰度流定义
 */
export default class AbrLevel {
    public url: string;
    public bitrate: number = 0;
    public maxBitrate: number = 0;
    public avgBitrate: number = 0;
    public qualityType: string = '';
    public qualityTypeName: string = '';
    public id: number = 0;
    public codec: string = '';
    public audioCodec?: string = '';
    public videoCodec?: string = '';
    public hidden: boolean = false;
    public disabledFromAdaptive: boolean = false;
    public defaultSelected: boolean = false;

    constructor(url: string) {
        this.url = url;
    }
}