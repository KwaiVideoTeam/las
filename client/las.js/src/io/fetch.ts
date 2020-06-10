/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:50:16 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:50:16 
 * 封装的fetch
 */
import { IInternalLoader, IInternalLoaderCallback, ILoaderContext } from '../types/io';

export default class FetchLoader implements IInternalLoader<ILoaderContext> {
    public tag: string = 'fetch';
    private _context!: ILoaderContext;
    private _callbacks: IInternalLoaderCallback<ILoaderContext> | null = null;
    private _controller: AbortController | null = null;
    private _reader: ReadableStreamReader | null = null;
    private _abort: boolean = false;

    /**
     * broswer is support moz-chunk
     * @returns 是否支持
     */
    static isSupport(): boolean {
        if (self.fetch && self.ReadableStream) {
            return true;
        }
        return false;
    }
    /**
     * 开始加载
     * @param context context
     * @param callbacks 回调
     */
    load(context: ILoaderContext, callbacks: IInternalLoaderCallback<ILoaderContext>) {
        this._context = context;
        this._callbacks = callbacks;

        const reqHeaders = new Headers();
        if (context.headers) {
            context.headers.forEach(element => {
                reqHeaders.append(element.header, element.value);
            });
        }
        const params: RequestInit = {
            method: 'GET',
            headers: reqHeaders,
            mode: 'cors',
            cache: 'default',
            referrerPolicy: 'no-referrer-when-downgrade',
            signal: this._getAbortSignal()
        };
        if (context.credentials) {
            params.credentials = 'include';
        }
        fetch(context.url, params)
            .then(res => {
                context.responseUrl = res.url;
                context.responseHeader = res.headers;
                if (this._callbacks && this._callbacks.onConnect) {
                    this._callbacks.onConnect(res.status);
                }
                if (res.ok) {
                    // 兼容AbortController不可用
                    if (this._abort) {
                        if (res.body) {
                            res.body.getReader().cancel();
                        }
                        return;
                    }
                    if (context.responseType === 'arraybuffer') {
                        if (context.progress) {
                            if (res.body) {
                                this._reader = res.body.getReader();
                                this._pump(this._reader);
                            }
                            return;
                        }
                        res.arrayBuffer().then(responseData => {
                            this._onEnd(context, responseData);
                        });
                        return;
                    }
                    res.text().then(responseData => {
                        this._onEnd(context, responseData);
                    });
                    return;
                }
                const error = new Error(res.status + ' ' + res.statusText);
                this._onError(error);
                return;
            })
            .catch(e => {
                // 忽略AbortError，避免与timeout手动abort冲突
                if (e.name !== 'AbortError') {
                    this._onError(e);
                }
            });
    }

    abort() {
        if (this._controller) {
            this._controller.abort();
        } else if (this._reader) {
            this._reader.cancel();
            this._reader = null;
        }
        this._abort = true;
    }

    destroy() {
        this._callbacks = null;
        this.abort();
    }

    _onProgress(context: ILoaderContext, chunk: ArrayBuffer) {
        if (this._callbacks && this._callbacks.onProgress) {
            this._callbacks.onProgress(chunk);
        }
    }

    _onEnd(context: ILoaderContext, responseData: ArrayBuffer | string | null) {
        if (this._callbacks && this._callbacks.onEnd) {
            this._reader = null;
            this._controller = null;
            this._callbacks.onEnd(responseData);
        }
    }

    _onError(e: Error) {
        if (this._callbacks && this._callbacks.onError) {
            this._callbacks.onError(e);
        }
    }

    /**
     * pump data
     * @param reader 读取数据
     * @private
     */
    _pump(reader: ReadableStreamReader) {
        reader
            .read()
            .then(result => {
                if (this._abort) {
                    reader.cancel();
                    return null;
                }
                if (result.done) {
                    this._onEnd(this._context, null);
                    return null;
                }
                const chunk = result.value.buffer;
                this._onProgress(this._context, chunk);
                return this._pump(reader);
            })
            .catch((e: Error) => {
                if (e.name !== 'AbortError') {
                    this._onError(e);
                }
            });
    }

    _getAbortSignal(): AbortSignal | null {
        try {
            if (AbortController) {
                this._controller = new AbortController();
                return this._controller.signal;
            }
        } catch (e) {
            return null;
        }
        return null;
    }
}
