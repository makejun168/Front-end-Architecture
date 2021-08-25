## Webpack配置环境变量

#### 1. Node环境传入环境变量
```javascript
const chalk = require('chalk');
// 获取进程中的环境变量
const { SERVER } = process.env;
const server = SERVER ? SERVER.toLowerCase() : "shitawudev",
  serverConfig = require(`./server/${server}.js`)
console.log(chalk`
{bold SERVER}: {blue ${server}}
`)
// 传出环境变量
module.exports = {
  server,
  serverConfig
};
```

#### 2. 组装数据
```javascript
const { server, serverConfig } = require('./now');
const { NODE_ENV } = process.env;
const {mapValues} = require('lodash/object');
const merge = require('webpack-merge');
const envFile = NODE_ENV === 'production' ? require('./prod.env') : require('./dev.env');
const stEnv = {
  SERVER: server,
  SERVER_CONFIG: serverConfig,
  NODE_ENV: envFile.NODE_ENV
}
// 注意传入变量需要格式化
const asStringEnv = (env = stEnv) => mapValues(stEnv, value => JSON.stringify(value));
const envars = merge(asStringEnv());

module.exports = {
  stEnv,
  envars
}
```

#### 3. 通过 webpack DefinePlugin 传入数据
```javascript
const webpack = require("webpack");

// 通过 webpack.DefinePlugin 定义变量
plugins: [
    new webpack.DefinePlugin({
      ENV: config.envars,
    }),
    ...
],
```

#### 4. 在开发环境中引用
```javascript
// ENV 对应 webpack 中配置的变量名
export const { NODE_ENV, SERVER, SERVER_CONFIG } = ENV;
```

#### 总结
