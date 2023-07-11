// 给定两个字符串 s 和 t ，编写一个函数来判断它们是不是一组变位词（字母异位词）。
// 注意：若 s 和 t中每个字符出现的次数都相同且字符顺序不完全相同，则称 s 和 t互为变位词（字母异位词）。
// 示例 1:
// 输入: s = "anagram", t = "nagaram"
// 输出: true
// 示例 2:
// 输入: s = "rat", t = "car"
// 输出: false
// 示例 3:
// 输入: s = "a", t = "a"
// 输出: false
// 提示:
// 1 <= s.length, t.length <= 5 * 104
// s and t 仅包含小写字母


var test = (s, t) => {
  if (s == t) {
    return true;
  }
  if (s.length !== t.length) {
    return false;
  }
  // 遍历
  let dataMap1 = new Map();
  let dataMap2 = new Map();
  var map1 = formatData(s, dataMap1);
  var map2 = formatData(t, dataMap2);

  for (let item of s) {
    if (map1.get(item) !== map2.get(item)) {
      return false
    }
  }

  return true;
}

var formatData = (data, map) => {
  for (let item of data) {
    if (!map.has(item)) {
      map.set(item, 1);
    } else {
      map.set(item, map.get(item) + 1)
    }
  }
  return map
}