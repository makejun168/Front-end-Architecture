Function.prototype.myInstanceOf = function (left, right) {
    let proto = left.__proto__; // Object.getPrototypeOf(proto)
    let prototype = right.prototype;

    while (true) {
        if (proto === prototype) return true;
        if (proto === null) return false;
        proto = proto.__proto__; // Object.getPrototypeOf(proto)
    }
}

function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left);
    let prototype = right.prototype;

    while (true) {
        if (prototype === proto) {
            return true
        } else if (prototype === null) {
            return false
        }
        proto = Object.getPrototypeOf(proto)
    }
}

const a = function () {}

const b = Function;

const result = myInstanceof(a, b);

console.log(result);

