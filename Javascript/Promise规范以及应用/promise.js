const PENDING = "pending";
const FULFLLED = "fulfilled";
const REJECTED = "rejected";

/**
 * @param {Function} fn {resolve, reject}
 */
class MPromise {
    FULFLLED_CALLBACK_LIST = [];
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
            case FULFLLED: {
                this.FULFLLED_CALLBACK_LIST.forEach(callback => {
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
            this.status = FULFLLED;
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
        const realOnfulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value;
        }

        const realOnRejected = this.isFunction(onRejected) ? onRejected : (value) => {
            return value
        }

        // .then 返回值 整体就是一个 Promise
        const promise2 = new MPromise((resolve, reject) => {
            // 6.2 如果是报错的话 执行rejected
            const fufilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        // 6.1 如果 执行结果是x 
                        const x = realOnfulfilled(this.value);
                        // 这里是规范要求的
                        this.resolvePromise(promise2, x, resolve, rejected);
                    } catch(e) {
                        reject(e);
                    }
                })
            }

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        realOnfulfilled(this.reason)
                    } catch(e) {
                        reject(e);
                    }
                })
            
            }


            switch(this.status) {
                case FULFLLED: {
                    fufilledMicrotask();
                    break;
                }
                case REJECTED: {
                    rejectedMicrotask();
                    break;
                }
                case PENDING: {
                    this.FULFLLED_CALLBACK_LIST.push(fufilledMicrotask);
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

    resolvePromise(promise2, x, resolve, rejected){
        if (promise2 === x) {
            return reject(new TypeError('The promise and the return value are the same'));
        }

        if (x instanceof MPromise) {
            queueMicrotask(() => {
                x.then((y) => {
                    this.resolvePromise(promise2, y, resolve, rejected)
                })
            })
        } else if (typeof x === "object" || this.isFunction(x)) {
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
                            return resolve(value)
                        },
                        reason => {
                            return rejected(reason)
                        }
                    )
                }
            }
        })
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