function Foo(){
  Foo.a = function(){
      console.log(1);
  }
  this.a = function(){
      console.log(2);
  }
}

Foo.prototype.a = function(){
  console.log(3);
}

Foo.a = function(){
  console.log(4);
}

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();

// 调用Foo.a()时，会输出 4 ，因为Foo.a是一个静态方法，直接在函数对象上定义的，所以可以通过函数名直接调用
// 调用obj.a()时，会输出2。因为obj指的是构造函数Foo，在Foo中通过this.a定义了实例属性a，会覆盖原属性中的同名属性
// 最后再次调用Foo.a()时，会输出1，因为此时静态方法Foo.a已经被构造函数里的Foo.a给覆盖了
// 所以最后的输出结果依次是：4， 2， 1

