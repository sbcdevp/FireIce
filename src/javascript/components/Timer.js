import _ from 'underscore';
class Timer {
    constructor() {
        this.startTime = Date.now();
        this.convertSeconds = 0;
        this.interval = setInterval(() => {
            let elapsedTime = Date.now() - this.startTime;
            this.convertSeconds = (elapsedTime / 1000).toFixed(2)
            document.querySelector('.timer-value').innerHTML = this.convertSeconds;
            this._timer();
        }, 0);
    }
    _timer() {
        return this.convertSeconds;
    }
    _stopTimer() {
        clearInterval(this.interval);
    }
}
export default Timer;
