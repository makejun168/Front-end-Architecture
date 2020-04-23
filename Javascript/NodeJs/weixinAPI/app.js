// 微信验证测试号
// 成为微信开发者
const Koa = require('koa');
const moment = require('moment');
const Router = require('koa-router');
const config = require('./config');
const {resolve} = require('path');
const {initSchemas, connect} = require('./app/database/init');

(async () => {
    await connect(config.db);

    initSchemas();
    
    // const {test} = require('./wechat');
    // // 测试token 数据库存储
    // test();

    const app = new Koa();

    const router = new Router();

    const views = require('koa-views');

    // Must be used before any router is used
    app.use(views(resolve(__dirname + '/app/views'), {
        extension: 'pug',
        options: {
            moment: moment
        }
    }));
    
    // app.use(async function (ctx) {
    //     ctx.state = {
    //         session: this.session,
    //         title: 'app'
    //     };
    
    //     await ctx.render('user', {
    //         user: 'John'
    //     });
    // });

    // 接入微信消息中间件
    require('./config/routes')(router);
    app.use(router.routes()).use(router.allowedMethods())
    app.listen(3000);

    console.log('Listen' + 3000);
})();