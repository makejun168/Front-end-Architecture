const PENDING =  'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MPromise {
    FULFILLED_CALLBACK_LIST = [];
    REJECT_CALLBACK_LIST = [];

    _status = PENDING;

    constructor(fn) {
        this.value = null;
        this.reason = null;
        try {
            fn(this.resolve.bind(this), this.reject.bind(this)); // 马上执行
        } catch (err) {
            this.reject(err)
        }
    }


    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
        switch (value) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach((callback) => {
                    callback(this.value);
                })
                break;
            }
            case REJECTED: {
                this.REJECT_CALLBACK_LIST.forEach((callback) => {
                    callback(this.reason)
                })
                break;
            }
        }
    }

    resolve(value) {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value
        }
    }

    reject(reason) {
        if (this.reason === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
        }
    }

    isFunction(fn) {
        return typeof fn === 'function'
    }

    // 核心方法
    then(onFulfilled, onRejected) {
        // 先来判断传入的参数 是否为函数，不是函数包装成函数
        const realFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
        const realRejected = this.isFunction(onRejected) ? onFulfilled : (value) => value;

        // 处理 then 返回值
        const promise2 = new MPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realFulfilled(this.value);

                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        this.reject(err);
                    }
                })
            }

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realRejected(this.reason);

                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
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
        })
        return promise2
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new TypeError('Promise and the return value are same'))
        }

        if (x instanceof MPromise) {
            queueMicrotask(() => {
                x.then((y) => {
                    this.resolvePromise(promise2, y, resolve, reject)
                })
            })
        } else if (typeof x === 'object' || this.isFunction(x)) {
            // 如果 x 为对象或者函数
            if (x === null) {
                return resolve(x)
            }

            // 取 then
            let then = null;

            try {
                then = x.then;
            } catch (e) {
                return reject(e)
            }

            if (this.isFunction(then)) {
                // 如果获取到 then 是一个函数
                let called = false; // 判断是否为执行

                try {
                    then.call(
                        x, // this
                        (y) => {
                            if (called) {
                                return ;
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
                } catch (error) {
                    if (called) {
                        return ;
                    }
                    this.reject(error)
                }
            }
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
