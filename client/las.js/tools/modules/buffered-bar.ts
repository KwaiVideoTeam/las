class BufferedBar {
    private _w: number = 800;
    private _h: number = 20;

    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    private _video?: HTMLVideoElement;

    constructor(w?: number, h?: number) {
        this._w = w || this._w;
        this._h = h || this._h;

        this._canvas = document.createElement('canvas');
        this._canvas.width = this._w;
        this._canvas.height = this._h;
        this._ctx = this._canvas.getContext('2d');
        this._ctx.textBaseline = 'top';
    }

    public attachMedia(video: HTMLVideoElement): void {
        this._video = video;
    }

    public refresh() {
        let v = this._video;
        if (!v) {
            return;
        }
        var b = v.buffered;
        if (!b.length) {
            return;
        }

        let x = 0,
            y = 3,
            w = this._canvas.width,
            h = this._canvas.height,
            buffered = Math.max(v.currentTime, b.end(b.length - 1)) - v.currentTime,
            max = Math.max(2, Math.ceil(buffered));

        this._ctx.clearRect(0, 0, w, h);
        // 整体背景
        this._ctx.fillStyle = '#011935';
        this._ctx.fillRect(0, 0, w, h);

        const barH = h - 6;

        // 进度条背景
        this._ctx.fillStyle = '#00343f';
        this._ctx.fillRect(x, y, w, barH);

        this._ctx.fillStyle = '#555555';
        let barW = Math.min(w, buffered / max * w);
        this._ctx.fillRect(x, y, barW, h - 6);

        this._ctx.fillStyle = '#FFFFFF';
        this._ctx.font = `${h * 0.7}px Consolas, Arial`;
        
        this._ctx.textBaseline = 'bottom';

        this._ctx.textAlign = 'left';
        this._ctx.fillText(
            `Video Buffer: ${buffered.toFixed(3)} s`,
            5,
            h * 0.9
            );

        this._ctx.fillStyle = '#AAAAAA';

        this._ctx.textAlign = 'end';
        this._ctx.fillText(
            `${max}s`,
            w - 5,
            h * 0.9
        );
    }

    public setSize(w: number, h: number) {
        this._canvas.width = this._w = w;
        this._canvas.height = this._h = h;
    }

    public get dom() {
        return this._canvas;
    }
}

export default BufferedBar;