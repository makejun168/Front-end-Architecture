let arr = [1, 2, 3, 4];

Array.prototype.myReduce = function(callback, initialValue) {
    // 判断当前使用的是否为数组，数组是否为空
    let targetArr = Array.prototype.slice.call(this); // 获取当前数组
    let initialValue = initialValue ? initialValue : undefined;
    let result = initialValue; // 返回值
    if (typeof callback !== 'function') {
        throw new TypeError(typeof callback + ' is not a function at Array.reduce')
    }
    // 判断当前数组是否为空 为空而且 初始值为 undefined 则报错
    if (targetArr.length === 0 && !initialValue) {
        throw new TypeError('Reduce of empty array with no initial value at Array.reduce')
    }

    // 开始执行代码
    for (let i = 0; i < targetArr.length; i++) {
        // prevValue 上一个返回的 result 结果
        // 当前的值
        // 当前的下标
        // this 当前的数组
        result = callback.call(this, result, targetArr[i], i, this); // 绑定当前 this 并且执行
    }

    return result;
}

arr.myReduce((prevValue, current, idx, currentArr) => {
    console.log(prevValue);
    console.log(current);
    console.log(idx);
    console.log(currentArr);
    return prevValue + currentArr
});