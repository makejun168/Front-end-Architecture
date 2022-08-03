Function.prototype.myCall = (context) => {
  let ctx = context || window;

  let target = Symbol();

  ctx[target] = this;

  let args = Array.prototype.slice.call(arguments, 1);

  let result = args.length > 0 ? ctx[target](args) : ctx[target]();

  delete ctx[target];

  return result;
}
