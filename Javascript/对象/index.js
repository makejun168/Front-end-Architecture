let obj = {
    name: 'ming',
    age: 12,
    [Symbol('level')]: 'Good',
    [Symbol('level')]: 'Rich',
}

const val = Object.getOwnPropertyDescriptor(obj, 'name');

console.log(val); // { value: 'ming', writable: true, enumerable: true, configurable: true }

Object.defineProperty(obj, 'gender', {
    configurable: false,
    enumerable: true,
    writable: false,
    value: true
});

delete obj.gender; // 这样删除 configurable 没办法删除
obj.gender = false;

for (let key in obj) {
    console.log(key); // 不可枚举的话 不能枚举出来
}

console.log(obj);
