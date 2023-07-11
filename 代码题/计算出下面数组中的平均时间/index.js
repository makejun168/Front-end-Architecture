const arr = ["8:15", "6:35", "11:22"]

// 获取时间的平均值
const totalMinutes = arr.reduce((pre, cur) => {
  const [h, m] = cur.split(':');
  return pre + Number(h) * 60 + Number(m)
}, 0)

// 总分钟数除以时间数量,得到平均分钟值
const totalP = totalMinutes / arr.length

// 将平均分钟值，转换成时分
const hours = Math.floor(totalP / 60) // 取整，小时

const minutes = totalP % 60 // 取余，分钟

// 修改分钟数的格式
const fm = minutes < 10 ? `0${minutes}` : minutes

// 拼接最后结果
const averageTime = `${hours}:${fm}`;

console.log(averageTime); // 输出 "8:44"