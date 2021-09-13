function throttle(fn, delay) {
    let timer = null;
    let context = this;
    return (...args) => {
        if (timer) return

        timer = setTimeout(() => {
            timer = null; // 清空 timer
            clearTimeout(timer); // 清空 定时器
            fn.apply(context, [...args])
        }, delay);
    }
}

export default throttle