// 先在 Promise 原型对象 上定义一个 finally 函数，该函数接收一个 callback 回调函数作为参数，并返回一个新的 Promise 对象
// 无论原始Promise的调用是否成功，都会调用 callback 回调函数

Promise.property.finally = function(callback) {
	let P = this.constructor // 获取当前 Promise 实例
  return this.then(
    (value) => {
      P.resolve(callback().then(() => value))
    },
    (reason) => {
      P.resolve(callback().then(() => { throw reason }))
    }
  )
}