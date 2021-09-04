const b = 132;

const a = require('./myA.js');
console.log('b', a); // {} 为空对象

console.log(typeof a); // object

module.exports = b;