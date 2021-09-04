const fs = require("Node/基础模块/Example/fs");
const path = require("Node/基础模块/Example/path");
const pathToFile = path.resolve(__dirname, './text');

// fs.readFile(pathToFile, "utf-8", function (err, result) {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log(result);
// })

// const result = fs.readFileSync(pathToFile, "utf-8");
//
// console.log(result);

function promisify(func) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            args.push(function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            })
            return func.apply(func, args);
        });
    }
}

const readFileAsync = promisify(fs.readFile);

readFileAsync(pathToFile, "utf-8").then(content => {
    console.log(content)
}).catch(err => {
    console.log('e', err);
});
