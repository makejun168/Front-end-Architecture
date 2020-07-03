
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

