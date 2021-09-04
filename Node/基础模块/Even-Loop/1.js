Promise.resolve().then(() => {
    console.log(0);
    setTimeout(() => {
        console.log('宏任务')
    })
    return Promise.resolve(4)
}).then(res => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
}).then(() => {
    console.log(7)
}).then(() => {
    console.log(8)
})


// 发现 自己手动实现的 Promise 和 Promise 表现不一致，有可能是代码问题
// 参考 网上各种其他视频，发现表现不一致，怀疑原生 Promise 和 js模拟的 promise 有不可替代区别
// return Promise.resolve(4) 会产生两个微任务
// 等到当前执行栈为空的时候，才会 resolve 这个 新的 Promise
