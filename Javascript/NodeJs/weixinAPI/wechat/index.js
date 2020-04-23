const Wechat = require('../wechat-lib');
const WechatOAuth = require('../wechat-lib/oauth');
const config = require('../config');
const mongoose = require('mongoose');

const Token = mongoose.model('Token');
const Ticket = mongoose.model('Ticket');

const wechatCfg = {
    wechat: {
        appID: config.wechat.appID,
        appSecret: config.wechat.appsecret,
        token: config.wechat.token,
        getAccessToken: async () => {
            const res = await Token.getAccessToken();
            return res;
        },
        saveAccessToken: async data => {
            const res = await Token.saveAccessToken(data);
            return res;
        },
        getTicket: async () => {
            const res = await Ticket.getTicket();
            return res;
        },
        saveTicket: async (data) => {
            const res = await Ticket.saveTicket(data);
            return res;
        }
    }
}

// 获取 token 数据
exports.test = async () => {
    const client = new Wechat(wechatCfg.wechat);
    const data = await client.fetchAccessToken();
    console.log('data in db', data);
}

exports.getWechat = () => new Wechat(wechatCfg.wechat);
exports.getOAuth = () => new WechatOAuth(wechatCfg.wechat);