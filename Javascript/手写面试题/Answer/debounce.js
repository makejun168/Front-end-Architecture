// 防抖 在一定时间内 只执行一次回调函数

function debounce(cb, time) {
    const context = this; // 保存好当前的 this
    let timer = null;
    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                cb.apply(context, [...args]);
                clearTimeout(timer);
            }, time)
        }
    }
}

// 防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，
// 如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，
// 总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行

function debounce(fn, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(fn, delay)
    }
}

export default debounce


