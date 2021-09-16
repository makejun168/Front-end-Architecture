const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * @param {Function} fn {resolve, reject}
 */
class MPromise {
    FULFILLED_CALLBACK_LIST = [];
    REJECT_CALLBACK_LIST = [];

    _status = PENDING;

    constructor(fn) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        // 初始化的时候就马上 执行了
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch(e) {
            this.reject(e);
        }
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        this._status = newStatus;
        switch(newStatus) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value);
                });
                break;
            }
            case REJECTED: {
                this.REJECT_CALLBACK_LIST.forEach(callback => {
                    callback(this.reason);
                });
                break;
            }
        }
    }

    // 更改状态
    resolve(value) {
        if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }

    }

    // 更改状态的方法
    reject(reason) {
        if (this.status === REJECTED) {
            this.reason = reason;
            this.status =REJECTED;
        }
    }

    // 这两个参数必须是函数
    then(onFulfilled, onRejected) {
        // 值的透传 不是函数的话 直接传出去传入的值
        // 这里第一步 体验了 6.3 和 6.4 判断是否是函数
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value;
        }

        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            return reason;
        }

        // .then 返回值 整体就是一个 Promise
        const promise2 = new MPromise((resolve, reject) => {
            // 6.2 如果是报错的话 执行rejected
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        // 6.1 如果 执行结果是x
                        const x = realOnFulfilled(this.value);
                        // 这里是规范要求的
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            }

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })

            }


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
        });

        return promise2;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    resolvePromise(promise2, x, resolve, reject){
        if (promise2 === x) {
            return reject(new TypeError('The promise and the return value are the same'));
        }

        if (x instanceof MPromise) {
            // 如果 x 为 Promise ，则使 newPromise 接受 x 的状态
            // 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
            queueMicrotask(() => {
                x.then((y) => {
                    this.resolvePromise(promise2, y, resolve, reject)
                })
            })
        } else if (typeof x === "object" || this.isFunction(x)) {
            // 如果 x 为对象或者函数
            if (x === null) {
                return resolve(x);
            }

            let then = null;

            try {
                // 取 then
                then = x.then;
            } catch(e) {
                return reject(e)
            }

            if (this.isFunction(then)) {
                // 如果获取到的 then 是一个 函数
                let called = false; // 判断是否 被执行了

                try {
                    then.call(
                        x, // this
                        (y) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                            // onFulfilled
                        },
                        (r) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            reject(r);
                        }
                    )
                } catch(error) {
                    if (called) {
                        return;
                    }
                    this.reject(error)
                }
            } else {
                // 如果不是函数的话
                resolve(x);
            }
        } else {
            // 不是 Promise 不是 对象 不是函数
            resolve(x);
        }
    }

    isFunction(value) {
        return typeof value === "function"
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

    static race(promiseList) {
        return new MPromise((resolve, rejected) => {
            const length = promiseList.length;

            if (length === 0) {
                return resolve();
            } else {
                for (let i = 0; i < length; i++) {
                    MPromise.resolve(promiseList[i]).then(
                        value => {
                            return resolve(value); // 只管执行 不管返回结果哪个最好
                        },
                        reason => {
                            return rejected(reason)
                        }
                    )
                }
            }
        })
    }

    static all(promiseArr) {
        if (promiseArr instanceof Array) {
            let index = 0, result = [];
            return new MPromise((resolve, rejected) => {
                promiseArr.forEach((p, i) => {
                    Promise.resolve(p).then(val => {
                        index++;
                        result[i] = val;
                        if (index === promiseArr.length) {
                            resolve(result);
                        }
                    }, err => {
                        rejected(err);
                    })
                })
            })
        } else {
            new TypeError('需要传入数组类型的Promise 列表 不然会报错')
        }
    }
}

// const promise = new MPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(111)
//     }, 1000)
// }).then()


const test = new MPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(111)
    }, 1000)
}).then(value => {
    console.log(value);
})
