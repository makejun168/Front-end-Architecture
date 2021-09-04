// 防抖 在一定时间内 只执行一次回调函数

function debounce(cb, time) {
    const context = this; // 保存好当前的 this
    let timer = null;
    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                cb.apply(context);
                clearTimeout(timer);
            }, time)
        }
    }
}

export default debounce
