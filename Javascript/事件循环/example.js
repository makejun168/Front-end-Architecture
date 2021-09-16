process.nextTick(() => {
    console.log('nextTick');
})

console.log('start');

setImmediate(() => {
    console.log('Immediate')
})

setTimeout(() => {
    console.log('setTimeout')
}, 1000)

console.log('end');

// 2 end nextTick setTimeout setImmediate
