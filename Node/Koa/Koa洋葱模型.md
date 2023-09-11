在没有 `async/await` 的时候，Koa 通过使用 Generator 函数和基于 Promise 的中间件系统来实现洋葱模型。洋葱模型是 Koa 中间件执行的一种方式，它允许中间件按照特定的顺序依次执行，然后再返回。这种模型的特点是每个中间件在处理请求之前都可以执行一些操作，然后在请求向下传递到下一个中间件之前执行一些操作。

以下是一个使用 Koa 和 Generator 函数的示例，演示了洋葱模型的工作原理：

```javascript
const Koa = require('koa');
const app = new Koa();

// 中间件 1
app.use(function* (ctx, next) {
  console.log('中间件 1 开始');
  yield next(); // 执行下一个中间件
  console.log('中间件 1 结束');
});

// 中间件 2
app.use(function* (ctx, next) {
  console.log('中间件 2 开始');
  yield next(); // 执行下一个中间件
  console.log('中间件 2 结束');
});

// 中间件 3
app.use(function* (ctx, next) {
  console.log('中间件 3 开始');
  yield next(); // 执行下一个中间件
  console.log('中间件 3 结束');
});

app.listen(3000);
```

在上述示例中，我们创建了一个简单的 Koa 应用，并定义了三个中间件。每个中间件在处理请求之前和之后都会输出一些日志。Koa 使用 Generator 函数来实现这种洋葱模型，`yield next()` 的语句会将控制权传递到下一个中间件，直到所有中间件都执行完毕，然后再返回，依次执行中间件的结束部分。

尽管 Koa 1.x 版本使用了 Generator 函数来实现中间件，但从 Koa 2.x 开始，它已经升级为使用 `async/await` 来处理中间件，使代码更加清晰和易于理解。