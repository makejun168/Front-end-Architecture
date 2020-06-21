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

#### 严格模式
1. 严格模式是一种特殊的执行模式
2. 修复部分语言上的不足
3. 提供错误检查，而且增加了安全性
4. 向上兼容，编写Node等高质量的代码的时候有用，
5. 打包脚本，服务器运行代码有用

```javascript
'use strict'; // 全部都用全局严格模式
function func() {
    'use strict';
}
```

#### 区别
1. 不允许使用with
2. 不允许未声明的变量被赋值
3. arguments 变成参数的静态副本
4. delete参数，函数名报错
5. delete 不可配置的属性报错
6. 对象字面量重复属性名报错
7. 禁止八进制字面量
8. eval, arguments 变成了关键字，不能作为变量或者函数名
9. eval 独立作用域
10. arguments.caller, arguments.callee 被禁用
11. 一般函数调用时（不是对象的方法调用，也不使用apply/call/bind）等修改this) this指向 null,而不是全局对象window
12. 若使用apply/call,当传入null 或者 undefined时，this将会指向 null 或者 undefined，而不是全局
13. 试图修改不可写属性（writable = false）在不可扩展的对象上添加属性时报错 TypeError，而不是忽略


```javascript
// 不允许未声明的变量被赋值
!function () {
    'use strict';
    x=1;
    console.log(window.x);
}();
// ReferenceError

// 变成了 静态副本 不会影响
// arguments 没有办法被改变了
!function (a) {
    'use strict';
    // arguments 变成静态副本
    arguments[0] = 100;
    console.log(a); // 1
}(1);

// 特殊情况 传入对象
// 共享传递的 修改对象属性会影响
!function (a) {
    'use strict';
    // arguments 变成静态副本
    arguments[0].x = 100;
    console.log(a.x); // 100
}({x:1});

// 返回 false 不会报错
!function (a) {
   console.log(delete a);
}(1);

// SyntaxError
!function (a) {
    'use strict';
   console.log(delete a);
}(1);

// TypeError
!function (a) {
    'use strict';
    var obj = {};
    Object.defineProperty(obj, 'a', {
        configurable: false
    });
    delete obj.a; // 正常模式下 false 不能被删除
}(1);

// SyntaxError 
// 不能定义重复的值 语法错误
!function () {
    'use strict';
    var obj = {x: 1, x: 2};
}();


// SyntaxError 
// 禁止使用八进制 字面量
!function () {
    'use strict';
    console.log(0123); // 正常模式下面 显示 83
}();

// SyntaxError
// 严格模式下 禁止使用 eval，arguments 变关键字
!function () {
    'use strict';
    function eval() {}
}();

// evalVal is not defined undefined
!function () {
    'use strict';
    eval('var evalVal = 2'); // 正常模式下面 会显示 2
    console.log(evalVal);
}();

```



### 对象 
对象中包含一系列的属性，这些属性是无序的，每个属性都有一个字符串 key 对应的的value,像字典一样，重点问题


#### 对象结构 每个属性访问权限的控制

1. writable
2.  enumerable
3.  configurable
4.  value
5.  get/set

隐藏的深奥属性
1. proto
2. class
3. extensible


```javascript
function foo() {}
foo.prototype.z = 3;
var obj = new foo();
obj.z // 3
```

#### 对象创建，原型链
1. 对象创建的方法 var obj1 = {x:2, y: 1}
2. new 创造/原型链
3. Object.create({x: 1})



```javascript
function foo() {}
foo.prototype.z = 3;

// object的原型 指向 foo(构造器)的prototype属性
// 作用
var obj = new foo();
obj.y = 2;
obj.x = 1;

obj.x // 1
obj.y // 2
obj.z // 3
typeof obj.toString; // 'function'
'z' in obj; // true
// z 不在 obj上的 z在 obj的原型链上的
obj.hasOwnProperty('z'); // false

// 赋值操作
obj.z = 5;
obj.hasOwnProperty('z'); // true
foo.prototype.z; // 3
// 先会在当前的对象中找，找不到才会去原型链上面找，先到上一级找
obj.z; // 5
obj.z = undefined;
obj.z; // undefined

delete obj.z; // true
// delete 只能删除当前对象中的属性 不能删除原型链上的
obj.z; // 3
```
**原型链
obj => var obj = new foo() => foo.prototype => function foo(){} => Object.prototype => null**


```javascript
// 这里的 x 创建在 Object 的 prototype 属性中 而不是 在 obj 中
// 这里的 obj原型 指向的是 Object的protoType
var obj = Object.create({x: 1});
obj.x // 1
// 用自变量创建的对象 原型指向的是 Object.prototype 指向Object构造器的 prototype属性
typeof obj.toString // "function"
obj.hasOwnProperty('x'); // false

// 并不是所有的 对象属性上面都有 toString方法的
// 这样创建的话，obj的原型 直接就指向 null 了 所以 obj 就没有 toString方法了    
var obj = Object.create(null);
obj.toString // undefined
```

#### 属性操作
1. 读写对象属性
2. 属性异常
3. 删除属性
4. 检测属性
5. 枚举属性


##### 属性读写
```javascript
var obj = {x:1, y: 2};
obj.x; // 1
obj['y']; // 2 属性名称需要拼接的时候 用到 中括号的方式

obj.["x"] = 3;
obj.y = 4;


// for in 属性
// 有可能吧 原型链上面的属性也会遍历出来 不确定顺序的
// 不建议使用 for in
var p;
for (p in obj) {
    console.log(obj[p])
}
```

##### 属性读写-异常
```javascript
var obj = {x: 1};
obj.y; // undefined

var yz = obj.y.z; // TypeError: Cannot read property 'z' of undefined
obj.y.z = 2; // TypeError: Cannot set proerty 'z' of undefined

var yz;
var yz = obj && obj.y && obj.y.z; // 通过 && 去判断 
```


##### 属性删除
```javascript
var person = {age: 28, title: 'fe'};
delete person.age; // true
delete person['title']; // true
person.age; // undefined
delete person.age; // true 重复删除 也会返回 true 表示已经不存了

delete Object.prototype; // false 不能删除

var descriptor = Object.getOwnPropertyDescriptor(Object, 'prototype');
descriptor.configurable; // false 
descriptor.enumerable;  // false
descriptor.writable; // false

// 全局变量定义以后不能被删除
var globalVal = 1;
delete globalVal; // false

function fd() {}
delete fd; // false

// 局部作用域和全局作用域的函数都不能被删除 变量和函数都是一样的

// 隐式创建变量 是可以被删除的
ohNo = 1;
window.ohNo; // 1
delete ohNo; // true
```

##### 属性检测
```javascript
var cat = new Object;
cat.legs = 4;

'legs' in cat; // true 会在原型链上面去找
'abc' in cat; // false
'toString' in cat; // true inherited prototype!! 在原型链上面找到的

cat.hasOwnProperty('legs'); // true
cat.hasOwnProperty('toString'); // false

// 每个属性都有 Enumerable 属性都有 判断是否可以被枚举的
// Object.prototype 的大部分属性都是 不可枚举的 原型链上面大部分的属性都是不可以枚举的
cat.propertyIsEnumerable('legs'); // true
cat.propertyIsEnumerable('toString'); // false

Object.defineProperty(cat, 'price', {enumerable: false, value: 1000});
cat.propertyIsEnumerable('price'); // false
cat.hasOwnProperty('price'); // true

// 实际情况
// 先判断到底是否存在脚
if (cat && cat.legs) {
    cat.legs *= 2;
}

// 同理
if (cat.legs != undefined) {
    // !== undefined, or , !== null
}

// 先判断类型 再判断值
if (cat.legs !== undefined) {
    // only if cat.legs is not undefined
}
```

##### 属性枚举
```javascript
var o = {x: 1, y: 2, z: 3};
'toString' in o; // true
o.propertyIsEnuumerable('toString'); // false
var key;
for (key in o) {
    console.log(key); // x y z
}
```

```javascript
// 这里的 obj1 的原型是指向 o的protoType的
var obj = Object.create(o);
obj.a = 4;
// 印证了 for in 循环是不稳定的
for (key in obj) {
    console.log(key); // a,x,y,z
}

// 这里的 obj1 的原型是指向 o的protoType的 o的原型指向 Object.prototype
var obj = Object.create(o);
obj.a = 4;
// 印证了 for in 循环是不稳定的
for (key in obj) {
    // 过滤原型链上面的属性
    if (obj.hasOwnProperty(key)) {
        console.log(key); // a
    }
}
```