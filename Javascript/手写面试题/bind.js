Function.prototype.myBind = (context) => {
  let ctx = context || window;
  let fn = this;

  let args = Array.prototype.slice.call(arguments, 1);
  
  return (...newArgs) => {
    if (this instanceof Function) {
      return new fn(args.concat(newArgs));
    }
    return fn.apply(ctx, [args.concat(newArgs)]);
  }
}