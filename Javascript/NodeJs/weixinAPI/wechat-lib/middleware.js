const sha1 = require('sha1');
const getRawBody = require('raw-body');
const util = require('../util');

// 加载认证的中间件
// ctx 是koa 的应用上下文
// next 是串联中间件的钩子函数
module.exports = (config, reply) => {
    return async (ctx, next) => {
        const {signature, timestamp, nonce, echostr} = ctx.query;
        const token = config.token;
        let str = [token, timestamp, nonce].sort().join('');
        const sha = sha1(str);

        if (ctx.method === 'GET') {
            if (sha === signature) {
                ctx.body = echostr;
            } else {
                ctx.body = 'wrong';
            }
        } else if (ctx.method === 'POST') {
            if (sha !== signature) {
                return (ctx.body = 'Failed');
            }
            const data = await getRawBody(ctx.req, {
                // length: ctx.length,
                limit: '1mb',
                encoding: ctx.charset
            });
    
            const content = await util.parseXML(data);
            // console.log('content', content);
            const message = util.formatMessage(content.xml);
            // console.log('messgae', message);
    
            ctx.weixin = message;
            await reply.apply(ctx, [ctx, next]);
            const msg = ctx.weixin;
            const replyBody = ctx.body;
            const xml = util.tpl(replyBody, msg);
            
            ctx.status = 200;
            ctx.type = 'application/xml';
            ctx.body = xml;
        }
    }
}