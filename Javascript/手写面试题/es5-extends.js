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
function Child(name, age, habit) {
  this.habit = habit;

  this.showHabit = function () {
    console.log(this.habit);
  }

  // 寄生组合继承的方法
  Parent.apply(this, [name, age]); // 调用方法实现继承
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const c1 = new Child('kobe', 41, 'basketball');

c1.getAge();
c1.getName();
c1.showHabit();


