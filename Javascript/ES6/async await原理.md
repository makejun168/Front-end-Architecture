`async/await` 是 JavaScript 中用于处理异步操作的语法糖，它基于 Promise 对象，使异步代码更加清晰和易于理解。`async` 函数声明一个异步函数，而 `await` 表达式用于等待一个 Promise 对象的解决（或拒绝）并返回其结果。

`async/await` 的原理可以简要概括如下：

1. `async` 函数声明：通过在函数前面加上 `async` 关键字来定义一个异步函数。这表示该函数将返回一个 Promise 对象，无论它内部的操作是同步还是异步。

2. `await` 表达式：在异步函数内部，可以使用 `await` 来等待一个 Promise 的解决。当遇到 `await` 关键字时，JavaScript 引擎会暂停函数的执行，等待 Promise 解决，并将 Promise 解决的结果返回。在等待期间，事件循环可以继续执行其他任务。

以下是一个使用 `async/await` 的示例：

```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncExample() {
  console.log('开始执行异步函数');
  
  await delay(2000); // 等待2秒钟
  
  console.log('等待结束，继续执行');
  
  return '异步函数执行完成';
}

asyncExample()
  .then(result => {
    console.log(result); // 输出：'异步函数执行完成'
  })
  .catch(error => {
    console.error(error);
  });
```

在这个示例中，我们定义了一个 `delay` 函数，它返回一个 Promise，在一定时间后解决。然后，我们创建了一个 `asyncExample` 异步函数，内部使用 `await` 来等待 `delay` 函数的结果。当 `delay` 函数完成后，异步函数会继续执行。最后，我们调用 `asyncExample()` 并使用 `.then()` 处理异步操作的结果。

`async/await` 的原理实际上是通过 Promise 的机制来管理异步操作的执行顺序，并通过语法糖的方式使代码更易于编写和理解。