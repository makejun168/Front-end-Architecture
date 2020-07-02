# InterView
#### 第一天

打乱数组

```javascript
var Solution = function (nums) {
  this.nums = nums;
};

Solution.prototype.reset = function () {
  return this.nums;
};

Solution.prototype.shuffle = function () {
  let num = this.nums.slice(); // 浅拷贝

  for (let i = 0; i < num.length; i++) {
    let index = Math.floor((i + 1) * Math.random());
    [num[index], num[i]] = [num[i], num[index]];
  }
  return num;
};
```

合并链表