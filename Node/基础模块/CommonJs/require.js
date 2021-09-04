const vm = require("vm"); // vm 模块是执行 字符串的代码
const path = require("path");
const fs = require("fs");

function r(filename) {
    const pathToFile = path.resolve(__dirname, filename); // 通过传入文件名 获取绝对路径
    const content = fs.readFileSync(pathToFile, 'utf-8'); // 读取文件

    // 定义一个容器 将读取到
    const wrapper = [
        '(function(require, module, exports) {',
        '})'
    ];

    const wrappedContent = wrapper[0] + content + wrapper[1]; // 包裹 拼装函数字符串


    const script = new vm.Script(wrappedContent, {
        filename: 'index.js'
    }); // 将字符串变成是可以执行的代码

    const module = {
        exports: {}
    }

    const result = script.runInThisContext();
    result(r, module, module.exports);
    return module.exports; // 返回值
}


global.r = r;
