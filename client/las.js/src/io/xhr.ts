/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:50:38 
 * @Last Modified by: gengxing
 * @Last Modified time: 2020-08-04 12:18:22
 * 封装的xhr
 */
import { IInternalLoader, IInternalLoaderCallback, ILoaderContext } from '../types/io';
export enum XHR_TYPE {
    MOZ_CHUNK = 'moz-chunked-arraybuffer',
    MS_STREAM = 'ms-stream',
    UNKNOW = 'unknow',
    UNSUPPORT = ''
}

/**
 * XhrLoader
 * @class XhrLoader
 */
export class XHR implements IInternalLoader<ILoaderContext> {
    private static supportChunk: XHR_TYPE = XHR_TYPE.UNKNOW;

    public tag: string = 'xhr';
    private _xhr: XMLHttpRequest | null = null;
    private _context!: ILoaderContext;
    private _callbacks: IInternalLoaderCallback<ILoaderContext> | null = null;
    private _reader: MSStreamReader | null = null;
    private _msBufferOffset: number = 0;
    private _msBufferUpper: number = 16 * 1024 * 1024; // 16MB
    private _progress: XHR_TYPE = XHR_TYPE.UNKNOW;

    static isSupportedChunk() {
        if (XHR.supportChunk !== XHR_TYPE.UNKNOW) {
            return XHR.supportChunk;
        }
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://example.com', true);
            (xhr.responseType as any) = XHR_TYPE.MOZ_CHUNK;
            if ((xhr.responseType as any) === XHR_TYPE.MOZ_CHUNK) {
                XHR.supportChunk = XHR_TYPE.MOZ_CHUNK;
                return XHR.supportChunk;
            }
        } catch (e) {
            XHR.supportChunk = XHR_TYPE.UNSUPPORT;
        }
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://example.com', true);
            (xhr.responseType as any) = XHR_TYPE.MS_STREAM;
            if ((xhr.responseType as any) === XHR_TYPE.MS_STREAM) {
                XHR.supportChunk = XHR_TYPE.MS_STREAM;
                return XHR.supportChunk;
            }
        } catch (e) {
            XHR.supportChunk = XHR_TYPE.UNSUPPORT;
        }
        return XHR_TYPE.UNSUPPORT;
    }

    constructor() {
        this._xhr = null;
        this._msBufferOffset = 0;
    }

    /**
     * 开始加载
     * @param context
     * @param callbacks
     */
    load(context: ILoaderContext, callbacks: IInternalLoaderCallback<ILoaderContext>) {
        this._callbacks = callbacks;
        this._context = context;
        this._progress = XHR_TYPE.UNSUPPORT;
        if (context.progress && context.responseType === 'arraybuffer') {
            this._progress = XHR.isSupportedChunk();
            if (this._progress === XHR_TYPE.MS_STREAM) {
                const reader = this._reader = new (self as any).MSStreamReader();
                reader.onprogress = this._msrOnProgress.bind(this);
                reader.onload = this._onLoadEnd.bind(this);
                reader.onerror = this._onError.bind(this);
            }
        }

        const xhr = this._xhr = new XMLHttpRequest();
        xhr.open('GET', this._context.url, true);
        // arraybuffer类型尝试使用chunk
        if (this._progress === XHR_TYPE.MOZ_CHUNK) {
            (xhr.responseType as any) = XHR_TYPE.MOZ_CHUNK;
            xhr.onprogress = this._onProgress.bind(this);
            xhr.onload = this._onLoadEnd.bind(this);
        } else if (this._progress === XHR_TYPE.MS_STREAM) {
            (xhr.responseType as any) = XHR_TYPE.MS_STREAM;
        } else {
            (xhr.responseType as any) = context.responseType || 'arraybuffer';
            xhr.onload = this._onLoadEnd.bind(this);
        }
        xhr.onreadystatechange = this._onReadyStateChange.bind(this);
        xhr.onerror = this._onError.bind(this);
        xhr.withCredentials = !!context.credentials;

        xhr.send();
    }

    /**
     * abort request
     */
    abort() {
        if (this._reader) {
            // 0 EMPTY 1 LOADING 2 DONE
            if (this._reader.readyState === 1) {
                this._reader.abort();
            }
            this._reader.onprogress = null;
            this._reader.onload = null;
            this._reader.onerror = null;
            this._reader = null;
        }
        if (this._xhr) {
            this._xhr.onreadystatechange = null;
            this._xhr.onprogress = null;
            this._xhr.onload = null;
            this._xhr.onerror = null;
            this._xhr.abort();
            this._xhr = null;
        }
    }

    /**
     * destroy xhr Object clean cache
     */
    destroy() {
        this._callbacks = null;
        this.abort();
    }

    _onReadyStateChange(e: Event) {
        if (!this._xhr) {
            return;
        }
        const xhr = this._xhr;
        if (xhr.readyState === 2) {
            this._context.responseUrl = xhr.responseURL;
            this._context.responseHeader = xhr.getAllResponseHeaders();
            if (this._callbacks && this._callbacks.onConnect) {
                this._callbacks.onConnect(xhr.status);
            }
            if (xhr.status < 200 || xhr.status > 299) {
                this._onError(new Error('xhr error'));
            }
        } else if (xhr.readyState === 3) {
            if (this._reader && this._reader.readyState === 0 && xhr.status >= 200 && xhr.status <= 299) {
                this._reader.readAsArrayBuffer(xhr.response);
            }
        }
    }

    /**
     * xhr onProgress
     * @param {*} e xhr回调数据
     */
    _onProgress(e: Event) {
        if (!this._xhr) {
            return;
        }
        const chunk = this._xhr.response;
        if (this._callbacks && this._callbacks.onProgress && chunk) {
            this._callbacks.onProgress(chunk);
        }
    }

    /**
     * ms-stream progress
     * @param {*} e MSStreamReader回调
     */
    _msrOnProgress(e: any) {
        const reader = e.target;
        const buffer = reader.result;
        if (!buffer) {
            // result may be null, workaround for buggy M$
            this._onError(new Error('ms buffer null'));
            return;
        }

        const chunk = buffer.slice(this._msBufferOffset);
        this._msBufferOffset = buffer.byteLength;

        if (this._callbacks && this._callbacks.onProgress) {
            this._callbacks.onProgress(chunk);
        }

        if (buffer.byteLength >= this._msBufferUpper) {
            this._onError(new Error('ms buffer too large'));
        }
    }

    /**
     * xhr onLoadEnd
     * @param {*} e xhr回调数据
     */
    _onLoadEnd(e: ProgressEvent) {
        let data = null;
        const target = this._xhr;
        if (!this._progress && target) {
            data = target.response;
        }
        if (this._callbacks) {
            this._callbacks.onEnd(data);
        }
    }

    /**
     * xhr onXhrError
     * @param {*} e xhr回调数据
     * @private
     */
    _onError(e: any) {
        if (this._callbacks && this._callbacks.onError) {
            this._callbacks.onError(e);
        }
    }
}
