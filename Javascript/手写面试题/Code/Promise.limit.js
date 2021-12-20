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
        // 等待执行的 Promise 队
        this.pendingList = [];
    }

    /**
     * 加载到等待队列里面
     * @param task
     */
    add(task) {
        this.pendingList.push(task);
        this.run() // 执行
    }

    /**
     * 执行核心逻辑
     */
    run() {
        if (this.pendingList.length === 0){
            return;
        }

        if (this.currentCount === this.concurrency) {
            return;
        }

        // 执行开始 +
        this.currentCount++;

        // 拿出来 第一个
        const { fn } = this.pendingList.sort((a,b) => b.priority - a.priority).shift();
        const promise = fn();
        promise.then(this.completeOne.bind(this)).catch(this.completeOne.bind(this))
    }

    /**
     * 完成
     */
    completeOne() {
        this.currentCount--;
        this.run();
    }
}