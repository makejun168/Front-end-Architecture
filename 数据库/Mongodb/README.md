# Mogodb

### Mogodb 概念 安装环境

Mogodb 非关系型数据库，mysql 关系型数据库，collection 集合
Mogodb collection 表
Mogodb document 行

1. 判断 Mogodb 是否安装成功

```shell
 which mongod
```

2. 启动 Mogodb 服务

```shell
mongod
```

### 可视化数据库管理工具

1. 启动可视化工具之前需要 启动 Mogodb 服务
2. 链接数据库需要使用账号密码
3. 可视化

### mongoose 作用

> mongoose 是用来操作 mongodb

#### schemas

Mongoose 的一切都始于一个 Schema。每个 schema 映射到 MongoDB 的集合(collection)和定义该集合(collection)中的文档的形式。
通俗理解是等于 建表

```javascript
import mongoose from "mongoose";
let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

export default mongoose.model("Person", personSchema);
```

#### models

从我们的 Schema 定义模型的构造函数编译。实例这些模型代表文档可以从我们的数据库中保存和检索。从数据库中依靠这些模型来操作所有文档创建和检索。
通俗一点 通过 Schema 新建成为 Model 模型赖操作文档创建和检索

数据库配置文件

```javascript
const config = {
  dbs: "mongodb://127.0.0.1:27017/dbs",
};

module.exports = config;
```

链接数据库

```javascript
const mongoose = require("mongoose");

// 链接数据库
mongoose.connect(dbConfig.dbs, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
```

#### 测试接口的方法

```shell
curl -d 'name=james&age=25' http://localhost:3000/users/getPerson
```

### mongoose 应用

1. 新增数据

```javascript
const router = require("koa-router")();

const Person = require("../dbs/models/Person");

router.post("/addPerson", async function (ctx) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age,
  });
  let code;
  try {
    await person.save();
    code = 0;
  } catch (error) {
    code = -1;
  }
  ctx.body = {
    code: code,
  };
});
```

2. 读取数据

```javascript
// 读取
router.post("/getPerson", async function (ctx) {
  const result = await Person.findOne({ name: ctx.request.body.name });
  const results = await Person.find({ name: ctx.request.body.name });
  ctx.body = {
    code: 0,
    result,
    results,
  };
});
```

3. 修改数据

```javascript
// 修改数据
router.post("/updatePerson", async function (ctx) {
  const result = await Person.where({ name: ctx.request.body.name }).update({
    age: ctx.request.body.age,
  });
  ctx.body = {
    code: 0,
    result,
  };
});
```

4. 删除数据 **严重禁止删除数据 仅限于模拟操作**

```javascript
// 删除数据 删除数据 会删除多条数据 remove
router.post("/remvoePerson", async function (ctx) {
  const result = await Person.where({ name: ctx.request.body.name }).remove();
  ctx.body = {
    code: 0,
    result,
  };
});
```
