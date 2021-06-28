// 用 * 代表 迭代器
function* generator() {
    const list = [1, 2, 3];
    for (let i of list) {
        yield i;
    }
}

let g = generator();

console.log(g.next()); // {value: 1, done: false}
console.log(g.next()); // {value: 2, done: false}
console.log(g.next()); // {value: 3, done: false}
console.log(g.next()); // {value: 1, done: true}

function longTimeFn(time) {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, 1000)
    })).then(value => {
        return value
    }).then(value => {
        return `value new`
    })
    // 同一个实例上面去调用的 都是同一个实例里面的
    // 对于多个 then 是不适用 async/await 这种语法的
}

async function test() {
    try {
        const value = await longTimeFn(1000).catch(err => {
            console.log(err);
        });
        // await 返回的也是 promise
        return value;
    } catch (err) {
        console.log('报错');
    }
}

// async await 过程 只关心 promise 最后的结果
async function testParent() {
    const value = await test();
    console.log(value); // 多个 .then 返回的是最后一个.then的返回值
}

testParent();