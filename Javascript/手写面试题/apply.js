Function.prototype.myApply = (context, ...args) => {
  let ctx = context || window;
  
  const target = Symbol(); // 定义命名空间
  
  ctx[target] = this; // 当前被调用时候所使用的方法

  const result = args.length > 0  ? ctx[target](...args) : ctx[target]()
  
  delete ctx[target];

  return result;
}

var obj = {
  a: 1,
  b: 2
}

function funcA() {
  console.log(this.a);
  return this.a;
}

const myA = funcA.myApply(obj);
