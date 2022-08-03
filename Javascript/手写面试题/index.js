
// 在一定时间范围内 只执行一次 传入的 fn 函数
function throttle(fn, delay) {
  let allowRun = true;
  let context = this;
  
  return (...args) => {
    if (!allowRun) return;
    allowRun = false;
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      allowRun = true;
      fn.apply(context, [args]);
    }, delay);
  }
}
