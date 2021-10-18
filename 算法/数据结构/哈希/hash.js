// 哈希 快速匹配定位
// 密码 罗马文，回文
// 字符 数值
// I
// V
// X 10
// L 50

const MAP = {
    "I" : 1,
    "V" : 5,
    "X" : 10,
    "L" : 50,
    "C" : 100,
    "D" : 500,
    "M" : 1000,
}

const romanToInt = function (s) {
    let len = s.length;
    let res = 0;
    let max = 0;

    while (len--) {
        let num = MAP[s[len]];

        // 特殊情况 IV 值 用大 减去小的
        if (max > num) {
            res -= num
            continue
        }

        max = num;
        res += num;
    }

    console.log(res);
    return res;
}

romanToInt('VI');


