export function secFormat(s: number): string {
    s = Math.floor(s);
    let m = Math.floor(s / 60) || 0;
    s = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}