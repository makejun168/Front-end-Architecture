# Redis

#### Redis 服务启动
1. 启动 Redis 服务 redis-cli
2. 关闭 Redis 服务 redis-cli -h 127.0.0.1 -p 6379 shutdown
3. 使用默认配置文件配置  redis-server /path/to/redis.conf
4. 关闭 warning 警告 注释  \# bind 127.0.0.1
5. C:\Program Files\Redis>redis-server.exe redis.windows.conf 使用 Windows.config 文件

#### Redis 基础使用
1. 支持多种数据结构
2. 使用密码登录的步骤
3. redis.windows.conf 配置文件 设置密码 requirepass 123456
4. 端口 port 修改成 6378 原来的是 6379
5. 登录 redis-cli redis-cli -p 6378
6. auth 123456 配置文件中对应密码

#### Redis 基础数据操作
1.  setex key seconds value
2.  set key value [EX seconds] [PX milliseconds] [NX|XX]
3.  get key 获取 key打印出来
4.  key value 的存储形式
5.  set session: sessionId 123 get session:sessionId
6.  KEYs * 获取所有已经存储的数据库信息
7.  DEL key 删除某个key 值

#### NodeJS 链接 Redis 数据库


#### Koa 链接 Koa 数据库
```javascript
const session = require('koa-generic-session');
const Redis = require('koa-redis');

app.keys = ['kobe', 'gigi'];
app.use(session({
  store: new Redis({
    // keys: 'mt',
    // prefix: 'mtPrefix' // 修改前缀
  })
}))
```

#### 利用 Redis CRUD
1. 新增数据
```javascript
const Redis = require('koa-redis');
// 获取 Redis 的客户端
const Store = new Redis().client;

router.get('/fix', async function(ctx, next) {
  const st = await Store.hset('fix', 'name', Math.random());
  ctx.body = {
    code: 0
  }
});
```