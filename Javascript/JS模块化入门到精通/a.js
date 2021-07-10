exports.a = false;

const b = require('./b.js');

console.log('a 模块 输出了 b 模块的：', b);

exports.a = true;

console.log('a 模块到这执行完了');