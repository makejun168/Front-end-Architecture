// setTimeout(() => {
//     console.log('timeout')
// }, 0)
//
// setImmediate(() => {
//     console.log('immediate')
// }, 0)

// 在宏任务中，setTimeout 与 setImmediate 执行顺序不固定的

const fs = require('fs');
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout')
    }, 0)

    setImmediate(() => {
        console.log('immediate')
    }, 0)
})

