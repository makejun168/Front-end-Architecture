// Promise then 的第二个参数和catch都是用于处理Promise的rejected状态，但是它们在捕获错误信息时会遵循就近原则（在then的第二个参数和catch同时存在的情况下，只有then的第二个参数可以捕获到错误，反之，则catch方法会捕获到）
// 它们的区别在于：

// 如果在then的第一个参数里抛出了异常，后面的catch能捕获到，而 then 的第二个参数捕获不到
// catch方法返回的还是一个Promise对象，它可以继续链式调用，而 then 的第二个参数不可以
// 一般来说，捕获异常/错误建议使用catch

