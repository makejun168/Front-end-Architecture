const path = require("path");

const resolvePath = path.resolve("a", "..", "b", "c"); // E:\github\makejun168\Front-end-Architecture\Node\Example\b\c 返回决定路径
const joinPath = path.join("a", "..", "b", "c"); // a 目录的上一层的 /b/c

console.log(resolvePath);
console.log(joinPath);

// 文件系统中绝对路径比较安全

// __dirname 文件夹名称
// __filename 文件名称

console.log(__dirname); // E:\github\makejun168\Front-end-Architecture\Node\Example
console.log(__filename); // E:\github\makejun168\Front-end-Architecture\Node\Example\path.js

// 获取文件名的后缀
console.log(path.extname(__filename)) //.js
console.log(path.basename(__filename)) // path.js
console.log(path.dirname(__filename)) // E:\github\makejun168\Front-end-Architecture\Node\Example