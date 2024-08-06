function findDuplicatesByKey(key, array) {
    // 使用reduce方法来遍历数组并构建一个以key为键，value为值的对象
    const keyMap = array.reduce((map, obj) => {
        const value = obj[key];
        if (!map[value]) {
            map[value] = obj;
        }
        return map;
    }, {});

    // 找到重复的数据
    const duplicates = Object.values(keyMap);

    return duplicates;
}

// 示例用法
const array = [
    { ugcId: "123", name: "Kobe" },
    { ugcId: "123", name: "Kobe" },
    { ugcId: "1234", name: "Kobe" }
];
const key = "ugcId";
const filteredArray = findDuplicatesByKey(key, array);
console.log(filteredArray);
