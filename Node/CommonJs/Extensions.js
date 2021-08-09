const Module = require('module');
require('./require');

const prevFunc = Module._extensions['js'];

Module._extensions = function (...args) {
    console.log('load script');
    prevFunc.apply(prevFunc, args);
}

const result = r('./module.js'); // 这里必须写上 js

console.log(result);
