// 数据向 水管一样 一步步进来

const Writeable = require('stream').Writable;

const writeable = new Writeable();

// push
writeable._write = function (data, enc, next) {
    // 将流中的数据 输出
    process.stdout.write(data.toString().toUpperCase());

    // 当写入完成的时候，通知传入下一个数据
    process.nextTick(next); // 事件循环中的东西

}

writeable.on('finish', () => {
    process.stdout.write('done');
})

writeable.write('a' + '\n')
writeable.write('b' + '\n')
writeable.write('c' + '\n')


writeable.end();
