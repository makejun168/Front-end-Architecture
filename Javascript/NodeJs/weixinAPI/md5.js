const md5 = require('md5');

const timeStr = Math.floor(new Date().getTime() / 1000);
console.log(timeStr);

const salt = 'hjureohea!@irefgo_os4(ferijvsea';

console.log(salt + timeStr);

console.log(md5(timeStr + salt));