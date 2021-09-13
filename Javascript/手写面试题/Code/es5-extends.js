// 使用寄生组合继承 实现继承的方法

function Parent(name, age) {
  this.name = name;
  this.age = age;
}

Parent.prototype.getName = function() {
  console.log(this.name); // 打印 Name
}

Parent.prototype.getAge = function() {
  console.log(this.age); // 打印当前年纪
}


// 孩子继承 Parent的 属性和 方法
function Child(name, age) {
  // 寄生组合继承的方法
  
}

