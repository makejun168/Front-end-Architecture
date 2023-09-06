`async/await`、Generator 函数（使用 `function*` 声明）、和 Promise 都是用于处理异步操作的 JavaScript 特性。它们之间有关联，但也有一些区别。下面是它们之间的关系和区别，以及一个包含它们的示例：

1. **Promise**:
   - Promise 是 JavaScript 中用于处理异步操作的基本构建块。
   - 它表示一个尚未完成的异步操作，并提供了 `.then()` 和 `.catch()` 方法来处理操作完成或失败后的结果。
   - Promise 使用 `.then()` 和 `.catch()` 方法链式调用来处理异步操作。

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
    // 或者 reject('失败');
  }, 1000);
});

promise
  .then(result => {
    console.log(result); // 输出：'成功'
  })
  .catch(error => {
    console.error(error);
  });
```

2. **Generator 函数**:
   - Generator 函数使用 `function*` 声明，允许你在函数内部暂停和恢复执行。
   - 通过调用 Generator 函数会返回一个 Generator 对象，可以通过调用 `.next()` 方法来逐步执行函数内部的代码块。

```javascript
function* generatorExample() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generatorExample();
console.log(generator.next().value); // 输出：1
console.log(generator.next().value); // 输出：2
console.log(generator.next().value); // 输出：3
```

3. **async/await**:
   - `async` 函数声明一个异步函数，允许你在函数内使用 `await` 表达式来等待其他 Promise 的解决。
   - `await` 表达式会使函数的执行暂停，直到 Promise 解决或拒绝。

```javascript
async function asyncExample() {
  try {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('成功');
      }, 1000);
    });
    console.log(result); // 输出：'成功'
  } catch (error) {
    console.error(error);
  }
}

asyncExample();
```

关联和区别：
- `async/await` 构建在 Promise 之上，使异步代码更易于编写和理解。
- Generator 函数用于创建可暂停和恢复的函数，通常与迭代器一起使用，而不是直接处理异步操作。
- Promise 是一个低级别的异步构建块，可以在 `async/await` 和 Generator 函数中使用。

这些特性可以结合使用，例如，可以在 Generator 函数内使用 `async/await` 来处理异步操作，或者将 Generator 函数包装在 Promise 中。这取决于你的需求和编程风格。