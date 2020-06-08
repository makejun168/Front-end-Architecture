# Event Loop

### 1. 浏览器的 Event Loop

整个 js 这种运行机制又称为 Event Loop(事件循环)

1. 函数入栈，当 Stack 中执行到异步任务的时候，就将他丢给 WebAPIs,接着执行同步任务,直到 Stack 为空；
2. 此期间 WebAPIs 完成这个事件，把回调函数放入队列中等待执行（微任务放到微任务队列，宏任务放到宏任务队列）
3. 执行栈为空时，Event Loop 把微任务队列执行清空；
4. 微任务队列清空后，进入宏任务队列，取队列的第一项任务放入 Stack(栈）中执行，回到第 1 步。

**注意项目**

1. Promise 中的 executor 是一个立即执行的函数
2. Promise 的 then 函数每次的执行都返回一个新的 promise
3. async await 相当于 一个 promise, await 后面执行的内容 相当于 then 之后执行的函数
4. async 的 then 和 promise 的 then 的优先级
5. process.nextTick 优先级高于 Promise.then

### 总结经验
* 第一步确认宏任务，微任务
  宏任务：script，setTimeout，setImmediate，promise中的executor
  微任务：promise.then，process.nextTick

* 第二步解析async/await，出现async/await不要慌，他们只在标记的函数中能够作威作福，出了这个函数还是跟着大部队的潮流。
* 第三步，根据Promise中then使用方式的不同做出不同的判断，是链式还是分别调用。
* 最后一步记住一些特别事件
  比如，process.nextTick优先级高于Promise.then


微任务和宏任务
- 微任务 Promise 的 then，MutationObserver Promise 中的 executor 是一个立即执行的函数
- 宏任务 setInterval，setTimeout，setImmediate(ie)，MessageChannel

```javascript
setTimeout(() => {
  console.log(1);
}, 0);
Promise.resolve().then(() => {
  console.log(2);
});
console.log(3);
// 3 2 1
```

```javascript
setTimeout(() => {
  console.log(1);
  Promise.resolve(3).then((data) => console.log(data));
}, 0);
setTimeout(() => {
  console.log(2);
}, 0);
//浏览器 1 3 2 //node 1 2 3
```

```javascript
console.log(1);
console.log(2);
Promise.resolve().then(function () {
  console.log(3);
});
setTimeout(function () {
  console.log("setTimeout1");
  Promise.resolve().then(function () {
    console.log("promise");
  });
});
setTimeout(function () {
  console.log("setTimeout2");
});
// 1 2 3 setTimeout1 promise setTimeout2
```

```javascript
console.log(1);
setTimeout(function () {
  console.log(2);
}, 0);
new Promise(function (resolve) {
  console.log(3);
  resolve(Date.now());
}).then(function () {
  console.log(4);
});
console.log(5);
setTimeout(function () {
  new Promise(function (resolve) {
    console.log(6);
    resolve(Date.now());
  }).then(function () {
    console.log(7);
  });
}, 0);
// 1 3 5 4 2 6 7
```

1. 执行当前的栈
2. 执行微任务 Promise then
3. 将宏任务的第一项推到栈中执行 如果嵌套了 Promise 的微任务 微任务就加入微任务队列
4. 执行微任务
5. 将宏任务的第二项推到栈中执行，如此循环

### 2. Node 的 Event Loop

#### Node 中的任务源（task)

- 微任务： then 、nextTick 、 messageChannel 、mutationObersve
- 宏任务：setTimeout 、setInterval 、setImmediate 、io 文件操作

Node 环境中微任务是插缝执行，（如果执行宏任务的时候发现了微任务， 不会像浏览器一样执行了，而是将为微任务放到微任务队列中，等待整个宏 任务队列执行完毕或者达到执行上线后，下一个阶段开始的时候先执行完微任务队列中的任务）
**整个宏任务队列执行完成以后，再执行微任务的队列，直到下一个阶段的宏任务开始**

看看谁先执行完就打印

```javascript
setTimeout(function () {
  console.log("setTimeout1");
});
setImmediate(function () {
  console.log("setImmediate2");
});
```

如果 i/o 文件操作以后就会先执行 setImmediate，因为 setImmediate 在 i/o 文件操作后面的那个阶段执行，执行完 setImmediate 会在下一个阶段的时候再执行 setTimeout (timers 计时器执行阶段)
微任务中 nextTIck 会比 then 先执行。
微任务会优先与 i\o 文件操作执行。

### 练习题目和例子

版本 1

```javascript
new Promise((resolve, reject) => {
  console.log("promise1");
  resolve();
})
  .then(() => {
    console.log("then11");
    new Promise((resolve, reject) => {
      console.log("promise2");
      resolve();
    })
      .then(() => {
        console.log("then21");
      })
      .then(() => {
        console.log("then23");
      });
  })
  .then(() => {
    console.log("then12");
  });
// promise1
// then11
// promise2
// then21
// then12
// then23
```

版本 2

```javascript
new Promise((resolve, reject) => {
  console.log("promise1");
  resolve();
})
  .then(() => {
    console.log("then11");
    return new Promise((resolve, reject) => {
      console.log("promise2");
      resolve();
    })
      .then(() => {
        console.log("then21");
      })
      .then(() => {
        console.log("then23");
      });
  })
  .then(() => {
    console.log("then12");
  });
// promise1 then11 promise2 then21 then23 then12
```

版本 3

```javascript
new Promise((resolve, reject) => {
  console.log("promise1");
  resolve();
})
  .then(() => {
    console.log("then11");
    new Promise((resolve, reject) => {
      console.log("promise2");
      resolve();
    })
      .then(() => {
        console.log("then21");
      })
      .then(() => {
        console.log("then23");
      });
  })
  .then(() => {
    console.log("then12");
  });
new Promise((resolve, reject) => {
  console.log("promise3");
  resolve();
}).then(() => {
  console.log("then31");
});
// promise1 promise3 then11 promise2 then31 then21 then12 then23
```

版本 4

```javascript
async function async1() {
  console.log("async1 start");
  await async2(); // await async2()相当于一个Promise
  // await 后面的内容在下一个 事件循环以后再执行
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

// 宏任务最后
setTimeout(function () {
  console.log("settimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// settimeout
```

最后的版本
```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("settimeout");
});
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
setImmediate(() => {
  console.log("setImmediate");
});
process.nextTick(() => {
  console.log("process");
});
console.log("script end");
// script start async1 start async2 promise1 async1 end process promise2 setImmediate settimeout
```
