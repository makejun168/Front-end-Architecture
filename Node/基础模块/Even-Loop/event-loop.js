const fs = require('fs');

async function async3() {
    console.log('async 3');
}

async function async1() {
    console.log('async1 start')
    await async2();
    await async3(); // 这里就会进度下一次微任务
    // new Promise((resolve) => {
    //      console.log('async2')
    // }).then(() => {
    //      new Promise((resolve) => {
    //          console.log('async');
    //      }).then(() => {
    //          console.log('async1 end')
    //      })
    // })
    console.log('async1 end'); // 微任务队列 添加到 微任务队列里面 1
}

async function async2() {
    console.log('async2');
}

console.log('script start');

fs.readFile(__filename, () => {
    console.log('readFile'); // 读写流 在最后执行
})

// 宏任务
setTimeout(function () {
    console.log('setTimeout 0'); // 1
    setTimeout(function () {
        console.log('setTimeout 1'); // 3 下一轮的 timer 再执行
    }, 0)
    setImmediate(() => {
        console.log('setImmediate'); // 2 当前阶段 check 执行
    })
}, 0)

process.nextTick(() => {
    console.log('nextTick')
}) // 微任务队列 2 process.nextTick 在 Node 优先级更高

async1();

new Promise(function (resolve) {
    console.log('promise1')
    resolve(); // resolve 同步的 后面继续输出 Promise源码可知
    console.log('promise2')
}).then(function () {
    console.log('promise 3') // 微任务队列 3
})

console.log('script end');

// script start
// async1 start
// async2
// promise 1
// promise 2
// script end

// nextTick

// async1 end
// promise 3
// setTimeout 0
// setImmediate
// setTimeout 1

