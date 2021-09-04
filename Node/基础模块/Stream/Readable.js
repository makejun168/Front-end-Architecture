const Stream = require('stream');
const fs = require('fs');


const Readable = Stream.Readable;
const Writable = Stream.Writable;
const Duplex = Stream.Duplex;
const Transform = Stream.Transform;

// fs.createReadStream('xxx.js').pipe();

// 实现流式的消耗可迭代器的数据

// 这样的话 可以 打印声明出来的参数
// const readble = Readable({
//     objectMode: true
// })

class ToReadable extends Readable {
    constructor(iterator) {
        super();
        this.iterator = iterator;
    }

    _read() {
        const res = this.iterator.next();
        if (res.done) {
            // 当前迭代器结束
            // 数据源 已经消耗完了,通过 push null 表示已经消耗完了
            return this.push(null);
        }

        setTimeout(() => {
            this.push(res.value + '\n');
        }, 0)
    }
}

const iterator = function (limit) {
    return {
        next: function () {
            if (limit--) {
                return {
                    done: false,
                    value: limit + Math.random()
                }
            }
            return {
                done: true
            }
        }
    }
}(1000)

const readable = new ToReadable(iterator);

// 监听 data 事件 一次获取一次
readable.on('data', data => {
    process.stdout.write(data);
})

readable.on('end', () => process.stdout.write('end'));

