const Duplex = require('stream').Duplex;

const duplex = new Duplex()

duplex._read = function () {
    this._readNum = this._readNum || 0; // 初始化的时候是 0
    if (this._readNum > 1) {
        this.push(null); // 2的时候就 不会再读数据了
    } else {
        this.push(`${this._readNum++}`);
    }
}

duplex._write = function (buf, enc, next) {
    process.stdout.write(`_write ${buf.toString()}\n`)
    next();
}

duplex.on('data', data => console.log(`onData =  ${data.toString()}`)); // 这里的 data 是 Buffer 类型的

duplex.write('a');
duplex.write('b');
duplex.write('c');
duplex.write('d');
duplex.write('e');

duplex.end();
