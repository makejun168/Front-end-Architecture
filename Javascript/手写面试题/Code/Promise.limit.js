const urls = [
    {
        info: '23',
        time:  3000,
        level: 1,
    },
    {
        info: '23',
        time:  3000,
        level: 3,
    },
    {
        info: '23',
        time:  2000,
        level: 5,
    }
]

class PromiseQueue {
    constructor(options ={}) {
        this.concurrency = options.concurrency || 1;
        this.currentCount = 0;
    }
}