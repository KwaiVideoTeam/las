import { secFormat } from "../utils";

class ProgressBar {
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
            pos = { rangeSt: Math.min(v.currentTime, b.start(0)), rangeEd: Math.max(v.currentTime, b.end(b.length - 1)), w };

        this._ctx.clearRect(0, 0, w, h);
        // 整体背景
        this._ctx.fillStyle = '#011935';
        this._ctx.fillRect(0, 0, w, h);

        const barH = h - 6;

        // 进度条背景
        this._ctx.fillStyle = '#00343f';
        this._ctx.fillRect(x, y, w, barH);

        this._ctx.fillStyle = '#555555';
        for (let i = 0; i < b.length; i++) {
            this._ctx.fillRect(this.value2x(b.start(i), pos), y, this.value2x(b.end(i), pos) - this.value2x(b.start(i), pos), h - 6);
        }

        this._ctx.fillStyle = '#d0e9ff';
        this._ctx.font = `${h * 0.7}px Consolas, Arial`;

        this._ctx.textAlign = 'start';
        this._ctx.fillText(secFormat(pos.rangeSt), 5, h * 0.25);

        this._ctx.textAlign = 'end';
        this._ctx.fillText(
            secFormat(v.currentTime) + ' / ' + secFormat(pos.rangeEd),
            w - 5,
            h * 0.15
        );

        this._ctx.lineWidth = 1;
        this._ctx.beginPath();
        this._ctx.moveTo(this.value2x(v.currentTime, pos), 0);
        this._ctx.lineTo(this.value2x(v.currentTime, pos), h);
        this._ctx.strokeStyle = '#ffff00';
        this._ctx.stroke();
    }

    public setSize(w: number, h: number) {
        this._canvas.width = this._w = w;
        this._canvas.height = this._h = h;
    }

    public get dom() {
        return this._canvas;
    }

    private value2x = (value: number, p: { rangeSt: number, rangeEd: number, w: number }) => {
        return (value - p.rangeSt) / (p.rangeEd - p.rangeSt) * p.w;
    }
}

export default ProgressBar;