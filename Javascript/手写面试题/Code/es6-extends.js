// es6 中使用继承方法

class People {
  constructor({name, age}) {
    this.name = name;
    this.age = age;
  }

  getName() {
    console.log(this.name);
    console.log(this.age);
  }
}

class Student extends People {
  constructor(props) {
    super(props); // super的 时候 将参数传入 子类中继承使用
  }

  growUp(val) {
    this.age = val;
  }

  setName(name) {
    this.name = name;
  }
}

const kobe = new Student({name: 'kobe', age: 41});

// kobe.growUp(18);
kobe.growUp(18);
kobe.setName('luna');

const poloMa = new Student({name: 'Ma', age: 24})

poloMa.getName();
