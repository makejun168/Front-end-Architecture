# Javascript
### Javascript 六种数据类型
5种的是原始类型，1种对象类型
1. Object
2. Number
3. String
4. Boolean
5. Null
6. Undefined

### Object 对象包含6种类型的对象
1. Function
2. Arguments
3. Math
4. Date
5. RegExp
6. Error

#### Javascript 隐式转换
1. 字符串转数字 +String +'37'
2. 数字转化为字符串 Number + '' 37 + ''
3. == 等于 与 严格等于
4. NaN !== NaN 每个人都是 NaN 与所有的东西都不相等
5. undefined === undefined
6. null === null
7. ===严格等于 首先是执行类型判断是否相等，再判断值
8. ==非严格等于 会使用常识类型转换和比较 判断是否相等

#### Javascript 包装对象
1. 当一个基础类型想要通过对象的方式去使用他的属性或者增加他的属性时候，Javascript 就会将基础类型转化为包装类型对象，包装类型才有对象的属性等
2. 相当于 new String(str) 里面就会有很多属性 当走完 a.length 以后临时对象 就会消除
3. 所以a.t 就不能成功的赋值了
4. str => String Object 123 => Number Object true => Boolean Object

包装类型的例子
```javascript
var a = "string";
alert(a.length);
a.t = 3;
alert(a.t);
```

#### JavaScript 数据类型检测
* typeof 返回的是字符串类型 适合基本类型和function的检测
* instanceof obj instanceof Object 左操作数是一个对象 右操作数是一个函数对象或者函数构造器 左边如果不是对象就会直接返回 false
* Object.prototyoe.toString
* constructor 不稳定的方法 会被改写
* duck type 判断某个对象是否存在某个方法 从而判断对象


| 方法名称 | 语法 | 返回值 | 特殊情况 | 
| --- | --- | --- | --- |
| typeof | typeof params 判断基础类型  | 字符串 "number" "boolean" "function" "undefined" | typeof null "object" typeof NaN "number" typeof(undefined) "undefined" 遇到null的判断的时候会失效 |
| instanceof | 判断对象类型，通过原型链判断 obj instanceof Object | 返回布尔值   | 不同window或者iframe间的对象类型检测不能使用instanceof |
| Object.prototyoe.toString.apply(Object) | Object.prototyoe.toString.apply(Object) | 字符串 "[object Array]" "[object Function]" "[object Null]" "[object Undefined]" | IE6/7/8 Object.prototype.toStirng.apply(null) 返回的是 "[object Object]" |


#### Javscript 表达式
* 原始表达式 10
* 初始化表达式 var a = 10
* 复合表达式 10 * 20
* 数组，对象的初始化表达式 [1,2] [1,,,4] {x:1, y:2}
* 函数表达式 var fun = function() {}
* 属性访问表达式 var o ={x:1}; o.x o['x']
* 调用表达式 func();
* 对象创建表达式 new Func(1,2) new Object


#### Javascript 运算符
* 一元运算符 +num
* 二元运算符 a+b
* 三元运算符 c ? a ：b
* 赋值运算符
* 比较
* 算术
* 位
* 逻辑
* 字符串
* 特殊运算符

##### 特殊运算符

* ,
* delete
* in
* instanceof
* typeof
* new
* this
* void
* throw

```javascript
// ,
var val = (1,2,3) // val = 3

// delete
var obj = {x:1};
delete obj.x; // 删除obj 里面的属性 x
var obj = {};
Object.defineProperty(obj, 'x', {
    configurable: false,
    value: 1
});

delete obj.x; // false 不能被删除
console.log(obj.x);

// in
window.x = 1;
'x' in window;// true

// new
function Foo() {}
Foo.prototype.x = 1;
var obj = new Foo();
obj.x; // 1
obj.hasOwnProperty('x'); //false
obj.__proto__.hasOwnProperty('x'); // true

// instanceof 判断对象类型 左边的是对象 右边的是构造函数或者函数对象
[1,2] instanceof Array; //true

// typeof 判断基础类型为主
typeof 1;// "number"
typeof null; // "object"

// this this返回的是上下文
this;// window
var obj = {
    func: function(){return this;}
}
obj.func(); // obj

// void
void 0 // undefined
void(0) // undefined

// throw
throw new Error('error');
// 抛出异常
```

#### 块 block
语法｛
    语句1;
    语句2;
    ...
    语句n
｝
***没有块级作用域***
```javascript
var i = 0;
for(; i<arr.length; i++) {
    ...
}
```
1. 函数作用域
2. 全局作用域
3. 没有块级作用域

#### var
```javascript
var a = b = 1;
function foo() {
    var a = b =1;
}
typeof a; // undefined
typeof b; // "number" b 变成了全局变量
```

#### try catch
```javascript
try {
    throw "test"; // 抛出错误
} catch (ex) {
    console.log(ex); // test
} finally {
    console.log('finally')
}
```

**执行顺序的考验**
```javascript
try {
    try {
        throw new Error("oops");
    } finally {
        console.log('finally');
    }
} catch (ex) {
    console.log('outer'); 
} finally {
    console.log('finally')
}
// 1. 先执行内部的 抛出的错误 oops
// 2. 再执行内部的 finally
// 3. 最后执行外部的捕获错误 outer
```

```javascript
try {
    try {
        throw new Error("oops");
    } catch(ex) {
        console.log('inner', ex);
    } finally {
        console.log('finally');
    }
} catch (ex) {
    console.log('outer');
} finally {
    console.log('finally');
}
// 1. 先执行内部的 抛出的错误 oops
// 2. 再执行内部的捕获错误 catch inner error
// 3. 最后执行内部 finally
// 4. 外部的 catch 将不会执行 因为内部已经处理过了
```

```javascript
try {
    try {
        throw new Error("oops");
    } catch(ex) {
        console.log('inner', ex);
        throw ex;
    } finally {
        console.log('finally');
    }
} catch (ex) {
    console.log('outer');
}
// 1. 先执行内部的 抛出的错误 oops
// 2. 再执行内部的捕获错误 catch inner error
// 3. 最后执行内部 finally
// 4. 外部的 catch 执行 outer
```

#### function
1. 函数声明会预先处理，在函数声明之前也能正常调用, 也叫做函数前置
2. 函数表达式就不可以这样做
```javascript
// 函数声明
fd(); // true
function fd() {
    // do sth.
    return true;
}

// 函数表达式
fe(); // TypeError
var fe = function() {
    // do sth.
}
```

#### for ... in
1. 顺序是不确定的
2. enumerable 为 false 时 不会出现
3. for in 对象属性时受原型链影响
4. 坑比较多，不建议使用

```javascript
var p;
var obj = {x:1, y:2}

for (p in obj) {
}
```

#### switch
```javascript
// 需要注意的是 需要使用break 阻止继续走下去
var val = 2;
switch(val) {
    case 1:
        console.log(1);
        break;
    case 2:
        console.log(2);
        break;
    default:
        console.log(0);
        break;
}
```

```javascript
// 多个使用的时候
var val = 2;
switch(val) {
    case 1:
    case 2:
    case 3:
        console.log(123);
        break;
    case 4:
    case 5:
    case 6:
        console.log(456);
        break;
    default:
        console.log(0);
        break;
}
```

#### 循环
```javascript
while (isTrue) {
    // do sth
}

do {
    // do sth.
} while (isTrue)

var i;
for (i = 0; i < n; i++) {
    // do sth
}
```

#### with
1. 不建议使用with
2. 让 JS引擎优化很难
3. 可读性很差
4. 可被变量所替代
5. 严格模式下面是禁止使用的
```javascript
with ({x: 1}) {
    console.log(x);
}
with (document.forms[0]) {
    // 隐藏调用了 document.forms[0].name.values
    console.log(name.values);
}

var form = document.forms[0].name.values;
```