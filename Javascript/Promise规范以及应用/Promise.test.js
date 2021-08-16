const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 1. 定义状态 pending fulfilled rejected
 * 2. constructor 构造函数执行初始的方法 初始化状态 value reason；传入的方法 fn 马上执行 传入参数 resolve 和 reject
 * 3. getter setter status 当前 status 变成最终态(fulfilled 或者 rejected) 的时候 执行 CALL_BACK_LIST里面全部的方法，并且将 value 或者 reason的值传进去
 * 4. 定义 resolve reject的方法 每次修改状态之前确保状态 是 PENDING 对 status value 或者 reason 进行赋值
 * 5. then 方法 核心方法
 * 5.1 处理传入的方法 判断是否为方法 如果不是方法，修改是默认的方法 value => return value
 * 5.2 定义一个全新的 promise2 new 当前实例返回
 * 5.3 定义当前 微任务的 成功和失败的方法 将 resolve 方法执行 value值的结果 用 x 存起来 继续在 resolvePromise中继续执行 ，拒绝的微任务同理
 * 5.4 resolvePromise 接收参数有 promise2 x resolve reject
 * 6. resolvePromise 最复杂的部分 传入 then 方法的Promise2 x resolve reject
 * 6.1 比较 Promise2 与 x 如果 Promise2 与 x 相同 则返回错误信息 类型错误 Promise 和 返回值相同
 * 6.2 判断 x 是否属于 当前的 MyPromise 继续递归 x.then 继续执行将返回值 传到 resolvePromise中继续传递
 * 6.3 x 如果是对象 或者是方法
 * 6.3.1 如果 x 是等于 null 返回 resolve返回 value = null
 * 6.3.2 取 then 获取当前 x的 then 方法
 * 6.3.3 判断 then 是否是一个方法 如果是
 * 6.3.3.1 如果 then 是一个方法 定义变量 called 设为 false 判断是否立即执行 then方法 立即执行 同样传入 resolve 和 reject 方法
 * resolve函数的参数是y 如果函数已经被执行过了 立即返回，如果没有执行将 called 变量设为 true 继续递归执行 resolvePromise
 * reject函数的参数是r 如果函数已经被执行过了 立即返回，如果没有执行将 called 变量设为 true，通过reject方法抛出错误
 * 如果在这个过程中出现错误 如果 called 函数已经抛出过异常直接返回 如果没有 执行 reject 方法 抛出错误
 * 6.3.3.2 如果不是一个方法直接执行 resolve(x) 不是 Promise,对象,函数 直接执行 resolve(x) x是 字符串 数字 布尔值 undefined
 * 6.4 不是 Promise,对象,函数 直接执行 resolve(x) x是 字符串 数字 布尔值 undefined
 * 7. catch 方法 then 方法只执行 onRejected 的部分
 * 8. 静态方法 resolve 方法 返回一个 Promise 并且执行 参数中 resolve 方法传入 value 如果它是 Promise 直接返回 Promise
 * 9. 静态方法 reject 方法 返回一个 Promise 并且执行 参数中 reject 方法传入 reason 如果它是 Promise 直接返回 Promise
 * 10. 静态方法 race 方法 返回一个 Promise 并且 Promise.resolve 方法执行一个 Promise 获取它的值 直接传出第一个返回的值 resolve(x)
 * 11，静态方法 all 方法 返回一个 Promise 利用 Promise.resolve 方法执行一个 Promise 获取它的值传入数组中并且传出 resolve(result)
 */

class MyPromise {
    FULFILLED_CALLBACK_LIST = [];
    REJECT_CALLBACK_LIST = [];

    _status = PENDING;

    constructor(fn) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;
        // 初始化的时候直接执行的 传入的 fn函数
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (err) {
            this.reject(err);
        }
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        this._status = newStatus;
        switch (newStatus) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value);
                })
                break;
            }
            case REJECTED: {
                this.REJECT_CALLBACK_LIST.forEach(callback => {
                    callback(this.reason);
                })
                break;
            }
        }
    }

    // 将 PENDING 状态 改成 FULFILLED
    resolve(value) {
        if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if (this.status === REJECTED) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }

    isFunction(value) {
        return typeof value === "function"
    }

    then(onFulfilled, onRejected) {
        // 值的透传 如果不是函数的话 直接传出去传入的值
        // 定义真正的 onFulfilled 和 onRejected
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value;
        } // 保证无论如何都是 一个函数

        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            return reason;
        }

        // 处理 then的返回值 整体是一个 全新的 Promise 对象
        const promise2 = new MyPromise((resolveFn, rejectFn) => {
            // 新建 微任务
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        // 6.1 如果 执行结果是x
                        const x = realOnFulfilled(this.value);
                        // 这里是规范要求的
                        this.resolvePromise(promise2, x, resolveFn, rejectFn);
                    } catch(e) {
                        rejectFn(e);
                    }
                })
            }

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason);
                        this.resolvePromise(promise2, x, resolveFn, rejectFn);
                    } catch (e) {
                        rejectFn(e);
                    }
                })
            }

            // 判断当前状态 fulfilled 状态执行 对应方法 Rejected 状态也执行对应方法 pending 将函数放进回调函数数组中
            switch(this.status) {
                case FULFILLED: {
                    fulfilledMicrotask();
                    break;
                }
                case REJECTED: {
                    rejectedMicrotask();
                    break;
                }
                case PENDING: {
                    this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
                    this.REJECT_CALLBACK_LIST.push(rejectedMicrotask);
                    break;
                }
            }
        })

        return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return new TypeError('The promise and the return value are the same');
        }

        if (x instanceof MyPromise) {
            // 微任务函数包裹
            queueMicrotask(() => {
                x.then(y => {
                    this.resolvePromise(promise2, y, resolve, reject);
                })
            })
        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                resolve(x); // 这里直接返回 null
            }

            let then = null;
            try {
                then = x.then;
            } catch(err) {
                return reject(err); // 返回 return reject方法
            }

            if (this.isFunction(then)) {
                let called = false;
                try {
                    // 这里等于 x.then call 立即执行
                    then.call(x,
                    (y) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        this.resolvePromise(promise2, y, resolve, reject);
                    },
                    (r) => {
                        if (called) {
                            return;
                        }
                        reject(r);
                    })
                } catch (err) {
                    if (called) {
                        return;
                    }
                    reject(err);
                }
            } else {
                resolve(x);
            }
        } else {
            // Boolean Number Undefined String
            resolve(x);
        }
    }

    static resolve(value) {
        if (value instanceof MPromise) {
            return value;
        }

        return new MPromise((resolve) => {
            resolve(value);
        })
    }

    static reject(reason) {
        if (reason instanceof MPromise) {
            return reason;
        }

        return new MPromise((resolve, rejected) => {
            rejected(reason);
        })
    }

    static race(promiseArr) {
        if (promiseArr instanceof Array) {
            // 执行 每一个Promise 返回第一个完成的
            return new MyPromise((resolve, reject) => {
                promiseArr.forEach((item, i) => {
                    MyPromise.resolve(item).then(value => {
                        resolve(value);
                    }, reason => {
                        reject(reason);
                    })
                })
            })
        } else {
            new TypeError('需要传入数组类型的Promise 列表 不然会报错')
        }
    }

    static all(promiseArr) {
        if (promiseArr instanceof Array) {
            let result = [], index = 0;
            return new MyPromise((resolve, reject) => {
                promiseArr.forEach((item, i) => {
                    index++;
                    MyPromise.resolve().then(value => {
                        result[i] = value;
                        if (index === promiseArr.length) {
                            resolve(result);
                        }
                    }, reason => {
                        reject(reason);
                    })
                })
            })
        } else {
            new TypeError('需要传入数组类型的Promise 列表 不然会报错')
        }
    }
}
