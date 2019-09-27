import _ from 'underscore';
class Timer {
    constructor() {
        this.startTime = Date.now();
        setInterval(() => {
            var elapsedTime = Date.now() - this.startTime;
            document.querySelector('.timer-value').innerHTML = (elapsedTime / 1000).toFixed(2);
        }, 0);
    }
}
export default Timer;
