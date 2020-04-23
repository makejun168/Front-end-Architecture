// 1. 用户访问网页 a
// 2. 服务器构建二跳网页地址 /b? 各种参数追加
// 3. 跳转到微信授权，用户主动授权，跳回来到 /a?code
// 4. 通过 code 换取 token code => wechat => access_token openid
// 5. 通过 access_token token => 用户的详细资料
const request = require('request-promise');
const baseUrl = 'https://api.weixin.qq.com/sns'
const api = {
    oauth: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
    accessToken: '/oauth2/access_token?',
    getUserInfo: '/userinfo?'
};

module.exports = class WechatOAuth {
    constructor (opts) {
        this.appID = opts.appID;
        this.appSecret = opts.appSecret;
    }

    async request (options) {
        options = Object.assign({}, options, {json: true});

        try {
            const res = await request(options);
            return res;
        } catch (err) {
            console.log('err', err);
        }
    }

    // 详细信息/主动授权 snsaoi_userinfo
    // 基本信息/静默授权 snsapi_base
    getAuthorizeURL (scope = 'snsapi_base', target, state) {
        const url = `${api.oauth}appid=${this.appID}&redirect_uri=${encodeURIComponent(target)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
        console.log(url);
        return url;
    }

    async fetchAccessToken (code) {
        const url = `${baseUrl + api.accessToken}appid=${this.appID}&secret=${this.appSecret}&code=${code}&grant_type=authorization_code`;
        const res = await this.request({url});
        return res;
    }

    async getUserInfo (token, openID, lang = 'zh_CN') {
        const url = `${baseUrl + api.getUserInfo}access_token=${token}&openid=${openID}&lang=${lang}`;
        const res = await this.request({url});
        return res;
    }
}
