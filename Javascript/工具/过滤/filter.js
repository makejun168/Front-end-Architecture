function findDuplicatesByKey(key, array) {
    // 使用reduce方法来遍历数组并构建一个以key为键，value为值的对象
    const keyMap = array.reduce((map, obj) => {
        const value = obj[key];
        if (map[value]) {
            map[value].push(obj);
        } else {
            map[value] = [obj];
        }
        return map;
    }, {});

    // 过滤出重复的数据
    const duplicates = Object.values(keyMap).filter(arr => arr.length > 1);

    // 将重复的数据展平为一个数组
    const result = duplicates.reduce((acc, arr) => acc.concat(arr), []);

    return result;
}

// 示例用法
const array = [
    { ugcId: "123", name: "Kobe" },
    { ugcId: "123", name: "Kobe" },
    { ugcId: "1234", name: "Kobe" }
];
const key = "ugcId";
const duplicates = findDuplicatesByKey(key, array);
console.log(duplicates);

