// const EventEmitter = require('events');

// const event = new EventEmitter();

// 手写实现 EventBus

class EventEmitter {
    constructor() {
        this.events = {}; // 数据结构存储 map
    }

    // 触发监听事件
    emit(event, ...args) {
        const cbs = this.events[event];

        if (!cbs) {
            console.log('当前事件没有被注册')
            return this
        }

        cbs.forEach(cb => cb.apply(this, args))
        return this;
    }

    // 创建监听事件
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(cb);

        return this; // 链式调用
    }

    // 创建监听一次的事件
    once(event, cb) {
        const func = (...args) => {
            this.off(event, func); // 语义上的写代码
            cb.apply(this, args); // 直接执行当的 互调函数
        }
        this.on(event, func);
        return this;
    }

    // 移除监听
    off(event, cb) {
        let currentCb = this.events[event];
        this.events[event] = currentCb && currentCb.filter(fn => fn !== cb);
        return this;
    }
}

const event = new EventEmitter();

const fn = (data) => {
    console.log(data)
}

event.on('msg', fn)

event.emit('msg', 11111); // 触发监听事件 同步遍历 111
event.off('msg', fn); // 删除了 这个监听事件
event.emit('msg', 11111); // 触发监听事件 同步遍历 111
console.log(2222); // 222


