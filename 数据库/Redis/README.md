# Redis

#### Redis 服务启动
1. 启动 Redis 服务 redis-cli 
2. 关闭 Redis 服务 redis-cli -h 127.0.0.1 -p 6379 shutdown
3. 使用默认配置文件配置  redis-server /path/to/redis.conf
4. 关闭 warning 警告 注释  \# bind 127.0.0.1

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