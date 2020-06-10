class MockBuffered {
    constructor() {
        this._buffered = [{ st: 0, ed: 0 }];
    }

    start(i) {
        return this._buffered[i].st;
    }

    end(i) {
        return this._buffered[i].ed;
    }

    get length() {
        return this._buffered.length;
    }

    get data() {
        return this._buffered;
    }

    clear() {
        this._buffered = [];
    }
}

class MockVideo {
    constructor() {
        this.buffered = new MockBuffered();
        this.currentTime = 0;
        this.buffered;
    }
}

class MockMSE {
    constructor() {
        this.readyState = 'closed'; // "closed" | "open" | "ended"
        this.sourceBuffer = { video: { buffered: new MockBuffered() }, audio: { buffered: new MockBuffered() } };
        this.queue = { video: [], audio: [] };
    }
    bufferedEndByType(type) {
        const sb = this.sourceBuffer[type];
        if (sb && sb.buffered.length > 0) {
            return sb.buffered.end(sb.buffered.length - 1);
        }
        return 0;
    }

    bufferSliceNumByType(type) {
        const sb = this.sourceBuffer[type];
        if (sb) {
            return sb.buffered.length;
        }
        return 0;
    }

    pendingNum() {
        let num = 0;
        for (const type in this.queue) {
            num += this.queue[type].length;
        }
        return num;
    }

    pendingSecByType(type) {
        const buffer = this.queue[type];
        if (buffer) {
            return buffer.reduce((prev, current) => {
                return prev + current.duration;
            }, 0);
        }
        return 0;
    }
}

export { MockBuffered, MockVideo, MockMSE };
