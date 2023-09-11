Generator 函数是 JavaScript 中的一种特殊函数，它具有中断和恢复的能力。Generator 函数通过使用 `yield` 关键字来中断执行，并且可以通过调用 `next()` 方法来恢复执行。以下是一个示例，演示了 Generator 函数的中断和恢复：

```javascript
function* generatorExample() {
  console.log('步骤 1');
  yield; // 中断执行
  console.log('步骤 2');
  yield; // 中断执行
  console.log('步骤 3');
}

const generator = generatorExample();

// 第一次调用 next() 恢复执行
console.log('开始执行 Generator');
generator.next(); // 输出 "步骤 1"

// 第二次调用 next() 恢复执行
generator.next(); // 输出 "步骤 2"

// 第三次调用 next() 恢复执行
generator.next(); // 输出 "步骤 3"
```

在上述示例中，我们定义了一个 Generator 函数 `generatorExample`，它包含三个步骤，并在每个步骤之后使用 `yield` 关键字中断执行。然后，我们创建了一个 Generator 对象 `generator`，并通过多次调用 `generator.next()` 方法来逐步执行 Generator 函数中的代码。

每次调用 `generator.next()` 都会从上一次中断的位置继续执行，直到遇到下一个 `yield` 关键字或函数结束。这样，我们就可以实现中断和恢复执行，用于生成迭代过程或异步操作的控制流程。

Generator 函数在处理异步代码时特别有用，因为它们可以轻松地将异步操作和事件处理嵌入到控制流中，而无需使用回调函数或 Promise。