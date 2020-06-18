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