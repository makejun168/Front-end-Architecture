const Stream = require('stream');
const fs = require('fs');


const Readable = Stream.Readable;
const Writable = Stream.Writable;
const Duplex = Stream.Duplex;
const Transform = Stream.Transform;

// fs.createReadStream('xxx.js').pipe();

// 实现流式的消耗可迭代器的数据

class ToReadable extends Readable {
    constructor(iterator) {
        super();
        this.iterator = iterator;
    }

    _read() {
        const res = this.iterator.next()
    }
}