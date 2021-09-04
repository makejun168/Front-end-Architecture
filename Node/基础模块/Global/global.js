process.on('exit', function (code) {
    // 这里 没有触发 setTimeout 程序已经退出了
    setTimeout(function () {
        console.log(123)
    }, 0)
    console.log(code); // 程序结束以后再输出
})

console.log('end')

console.log(this);

module.exports.foo = 5;
module.exports.x = function () {};

console.log(this); // 输出不是全局对象 Global 而是输出 module.exports
