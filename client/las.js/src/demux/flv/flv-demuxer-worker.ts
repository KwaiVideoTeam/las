/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:51:57 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:51:57 
 * worker
 */
import { EventEmitter } from 'events';
import LasEvents from '../../core/events';
import { WorkerCmd } from '../../core/worker-cmd';
import { LasMainConfig } from '../../types/core';
import { MP4RemuxResult } from '../../types/remux';
import { Log } from '../../utils/log';
import FlvDemuxerInline from './flv-demuxer-inline';

export default function (self: any) {
    let flv: FlvDemuxerInline;

    const eventEmitter = new EventEmitter();
    eventEmitter.on(LasEvents.MEDIA_INFO, data => { self.postMessage({ event: LasEvents.MEDIA_INFO, data: data }); });
    eventEmitter.on(LasEvents.ERROR, data => { self.postMessage({ event: LasEvents.ERROR, data: data }); });
    eventEmitter.on(LasEvents.SCRIPT_PARSED, data => { self.postMessage({ event: LasEvents.SCRIPT_PARSED, data: data }); });
    eventEmitter.on(LasEvents.LOAD_END, data => { self.postMessage({ event: LasEvents.LOAD_END, data: data }); });
    eventEmitter.on(LasEvents.MP4_SEGMENT, (data: MP4RemuxResult) => {
        const message = { event: LasEvents.MP4_SEGMENT, data };
        let payloads: ArrayBuffer[] = [];
        data.segments.forEach(element => {
            payloads.push(element.payload.buffer);
        });
        self.postMessage(message, payloads);
    });

    function init(eventEmitter: EventEmitter, config: LasMainConfig, data: any) {
        flv = new FlvDemuxerInline(eventEmitter, config, data);
        flv.init();
    }

    function destroy() {
        if (flv) {
            flv.destroy();
        }
        if (eventEmitter) {
            eventEmitter.removeAllListeners();
        }
    }

    self.addEventListener('message', function (e: { data: any }) {
        const d = e.data;
        switch (d.cmd) {
            case WorkerCmd.INIT:
                Log.level(d.config.debug);
                init(eventEmitter, d.config, d.data);
                break;
            case WorkerCmd.DESTROY:
                destroy();
                break;
            case WorkerCmd.APPEND_DATA:
                flv.append(d.tags, d.timeOffset, d.isContinuous);
                break;
            case WorkerCmd.SET_CODECS:
                flv.setCodecs(d.audioCodec, d.videoCodec);
                break;
            case WorkerCmd.FLV_HEAD:
                flv.flvHead(d.hasAudio, d.hasVideo);
                break;
            case WorkerCmd.FLUSH:
                flv.flush();
                break;
            case WorkerCmd.SET_EXTRA:
                flv.setExtra(d.data);
                break;
            case WorkerCmd.LOAD_END:
                flv.end();
                break;
        }
    });
}
