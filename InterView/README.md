# InterView
#### 第一天
1. 打乱数组
```javascript
var Solution = function (nums) {
  this.nums = nums;
};
Solution.prototype.reset = function () {
  return this.nums;
};
Solution.prototype.shuffle = function () {
  let num = this.nums.slice(); // 浅拷贝
  for (let i = 0; i < num.length; i++) {
    let index = Math.floor((i + 1) * Math.random());
    [num[index], num[i]] = [num[i], num[index]];
  }
  return num;
};
```
2. 合并链表


#### 第二天
1. && 、 ||和!! 运算符分别能做什么
* && 叫逻辑与，在其操作数中找到第一个虚值表达式并返回它，如果没有找到任何虚值表达式，则返回最后一个真值表达式。它采用短路来防止不必要的工作。
* || 叫逻辑或，在其操作数中找到第一个真值表达式并返回它。这也使用了短路来防止不必要的工作。在支持 ES6 默认函数参数之前，它用于初始化函数中的默认参数值。
* !! 运算符可以将右侧的值强制转换为布尔值，这也是将值转换为布尔值的一种简单方法。
2. JS中数据类型的判断
* typeof
* instanceof
* constructor
* Object.prototype.toString.call()

```javascript
var a = Object.prototype.toString;
console.log(a.call(2)); // [object Number]
console.log(a.call(true)); // [object Boolean]
console.log(a.call('str')); // [object String]
console.log(a.call([])); // [object Array]
console.log(a.call(function(){})); // [object Function]
console.log(a.call({})); // [object Object]
console.log(a.call(undefined)); // [object Undefined]
console.log(a.call(null)); // [object Null]
```

#### 第三天
1. js 有哪些内置对象

* 值属性 Infinity、NaN、undefined、null
* 函数属性 eval()、parseFloat()、parseInt()
* 基本对象 Object、Function、Boolean、Symbol、Error 等
* 数字和日期对象 Number Math Date
* 字符串，用来表示和操作字符串的对象 String RegExp
* 可索引的集合对象 Array
* 使用键的集合对象 Map Set WeakMap WeakSet
* 矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列 SIMD
* 结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据 JSON
* 控制抽象对象 Promise Generator
* 反射 Reflect Proxy
* 国际化，为了支持多语言处理而加入 ECMAScript 的对象 Intl Intl.Collator
* WebAssembly
* arguments

#### 第四天
1. {}和[]的valueOf和toString的结果是什么？

* {} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"
* [] 的 valueOf 结果为 [] ，toString 的结果为 ""

2. javascript 创建对象的几种方式

* （1）第一种是工厂模式，工厂模式的主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。 
* （2）第二种是构造函数模式。js 中每一个函数都可以作为构造函数，只要一个函数是通过 new 来调用的，那么我们就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的 prototype 属性，然后将执行上下文中的 this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为 this 的值指向了新建的对象，因此我们可以使用 this 给对象赋值。构造函数模式相对于工厂模式的优点是，所创建的对象和构造函数建立起了联系，因此我们可以通过原型来识别对象的类型。但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次我们都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有的实例都可以通用的。
* （3）第三种模式是原型模式，因为每一个函数都有一个 prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此我们可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如 Array 这样的值，那么所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。 
* （4）第四种模式是组合使用构造函数模式和原型模式，这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此我们可以组合使用这两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。 
* （5）第五种模式是动态原型模式，这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。 
* （6）第六种模式是寄生构造函数模式，这一种模式和工厂模式的实现基本相同，我对这个模式的理解是，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函数，也达到了扩展对象的目的。它的一个缺点和工厂模式一样，无法实现对象的识别。
