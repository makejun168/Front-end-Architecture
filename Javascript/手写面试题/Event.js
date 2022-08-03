class EventEmitter {
  constructor() {
    this.events = {}; // 存放事件的列表
  }

  // 监听事件
  on(event, fn) {
    // 判断当前的事件管理中是否存在当前
    if (!this.events[event]) {
      this.events[event] = []; // 值为 空数组
    }
    this.events[event].push(fn);

    return this;
  }

  // 触发事件
  emit(event, ...args) {

    const cbs = this.events[event];

    if (!cbs) {
      console.log('当前事件没有被注册')
      return this
    }

    cbs.forEach(cb => cb.apply(this, args))
    
    
    return this;
  }

  // 移除事件监听
  off(event, cb) {
    const currentCbs = this.events[event]
    this.events[event] = currentCbs.filter(fn => fn && fn !== cb);

    return this;
  }

  // 只监听一次事件
  once(event, fn) {
    let func = (...args) => {
      this.off(event, fn);
      fn.apply(this, [args]);
    }
    this.on(event, func);
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
event.emit('msg', 11111); // 触发监听事件 同步遍历 111 这里就没有 产生数据了
console.log(2222); // 222
