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