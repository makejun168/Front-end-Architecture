// 因为是静态方法，所以这样写

Promise.all = function (promiseArray) {
    return new Promise(function (resolve, reject) {
        // 判断是否为 数组类型
        if (!Array.isArray(promiseArray)) {
            return reject(new TypeError('arguments must be Array'))
        }
        let result = [];
        let nums = promiseArray.length;
        // 需要 count 来计算 是否已经满足 可以抛出
        let count = 0;
        // 遍历数组
        for (let i = 0; i < nums; i++) {
            // 判断数据类型
            Promise.resolve(promiseArray[i]).then(value => {
                count++;
                result[i] = value;
                if (count === nums) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        }
    })
}
