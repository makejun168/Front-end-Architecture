// （解答题）bind()连续调用多次，this的绑定值是什么？

var bar = function(){
  console.log(this.x);
}

var foo = {
  x: 3
}

var sed = {
  x: 4
}

var func = bar.bind(foo).bind(sed);

func(); //? 3

var fiv = {
  x: 5
}

var func = bar.bind(foo).bind(sed).bind(fiv);

func(); //? 3

// 多次绑定是无效的 都是初次绑定的值 3