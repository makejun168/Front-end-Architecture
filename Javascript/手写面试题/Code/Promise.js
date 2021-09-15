const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MPromise {
    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];
    _status = undefined;

    constructor(fn) {
        this.status = undefined;
        this.value = undefined;

        try {
            // 直接马上就调用 fn 方法
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (err) {
            this.reject(err); // 直接抛出错误
        }
    }

    resolve(value) {
        if (this.status === PENDING) {
            this.status = FULFILLED;
        }
        this.value = value;
    }

    reject(reason) {
        if (this.status === PENDING) {
            this.status = REJECTED;
        }
        this.reason = reason;
    }

    get status() {
        return this._status;
    }

    set status(newVal) {
        // 直接修改 newValue
        this._status = newVal;
        switch (newVal) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(cb => cb(this.value))
                break;
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(cb => cb(this.reason))
                break;
            }
        }
    }

    isFunction(fn) {
        return typeof fn === 'function'
    }

    then(onFulfilled, onRejected) {
        const realFulfilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
        const realRejectedFn = this.isFunction(onRejected) ? onRejected : (reason) => reason;

        const promise2 = new MPromise((resolve, reject) => {
            const fulfillMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realFulfilledFn(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        this.reject(err);
                    }
                })
            }


            const rejectMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realRejectedFn(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        this.reject(err);
                    }
                })
            }

            switch (this.status) {
                case FULFILLED: {
                    fulfillMicrotask();
                    break;
                }
                case REJECTED: {
                    rejectMicrotask();
                    break;
                }
                case PENDING: {
                    this.FULFILLED_CALLBACK_LIST.push(fulfillMicrotask)
                    this.REJECTED_CALLBACK_LIST.push(rejectMicrotask)
                    break;
                }
            }
        });

        return promise2; // 直接返回 定义好的 新的promise 2
    }

    // 处理 Promise
    resolvePromise(promise, x, resolve, reject) {
        // 判断传入的 传入的 promise 是否 和 x 值完全相同,如果相同的话就报错
        if (promise === x) {
            return new TypeError('Promise and the return value are same');
        }

        // 判断 x 是否属于 MPromise
        if (x instanceof MPromise) {

        }
    }
}