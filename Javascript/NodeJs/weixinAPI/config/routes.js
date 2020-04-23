const Wechat = require('../app/controllers/wechat');

module.exports =  router => {

    router.get('/sdk', Wechat.sdk);
    // 进入微信消息中间件
    router.get('/wx-hear', Wechat.hear)
    router.post('/wx-hear', Wechat.hear)

    router.get('/wx-oauth', Wechat.oauth)
    router.get('/userinfo', Wechat.userinfo)
}