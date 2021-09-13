// 因为是关键词 new 没办法完全模拟 用方法代替 对一个参数是目标，第二个参数是 剩余的参数
Function.prototype.myNew = () => {
  let obj = Object.create({});

  let Constructor = Array.prototype.shift.call(arguments); // 获取传入的构造函数

  obj.__proto__ = Constructor.prototype; // 将 obj __proto__ 属性指向 构造函数的原型对象

  let ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
}