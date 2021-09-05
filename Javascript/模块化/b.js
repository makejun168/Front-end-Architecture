exports.b = false;

const a = require('./a.js');

console.log('b 模块 输出了 a 模块的：', a);

exports.b = true;

console.log('b 模块到这执行完了');