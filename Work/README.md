# 前端工作总结

# 2018年6月
## (1) Mini Project JS Error Tracking

· Model  
1. Model 使用 No-SQL MongoDb  
2. 开发一个错误检测的Model

· Server  
1. 基于NodeJS 使用 Express 框架开发  
2. 以Restful API的形式进行开发  

· Client  
1. 采用VueJs 开发前端  
2. 列出所有的所及的错误信息  
3. 通过列表可以浏览详情  

## (2) Code priview
### nodeJS + mongodb + express
### 数据库设计

```javascript
interface buglist {
    _id?: string | any
    network: string | any
    metadata: string | any
    environment: object
    window: string | any
    navigator: string | any
    uservehavior: string | any
}

interface account {
    _id?: string | any
    account: string | any
    password: string | any
}

```

### Request API

```javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var DB = null
mongodb.MongoClient.connect(DB_CONN_STR, function (err, client) {
  if (err === null) {
    DB = client.db(dbName);
    // return client.db(dbName)
    // require('./routes');
    // app.use('/getbuglist', getbuglist);
  } else {
    console.error(err)
  }
})

app.use('/test', indexRouter);
app.use('/users', usersRouter);
app.use('/upload-bug', uploadRouter);
app.use('/getbuglist', getbuglist);
app.use('/del-bug', delBug);
app.use('/login', userlogin);
```

### Response

```javascript
const getResObj = (errCode, result) => {
    return {
        code: errCode,
        result: result,
        description: getDescription(errCode)
    }

    function getDescription(errCode) {
        switch (errCode) {
            case 0: return 'success';
            case 1: return 'failed';
            case 2: return 'unauthorized';
            case 3: return 'points not enough';
            case 4: return 'server_error';
        }
    }
}
```

## (3)Optimization stove page

### Target
1. 减少Javascript 代码体积  
2. 加快首屏渲染时的速度  
3. 节省SDK页面使用的流量  

### Way
1. 统计汇总各大游戏平台（腾讯游戏，网易游戏等）网页加载速度，首屏渲染速度，实现方法等技术细节  
2. 优化Webpack打包方式减少代码体积  
3. 参考腾讯，网易等游戏内容官网社区，比较技术差异，提出优化改进的方案  
4. vue 实现SSR  

# 2018年7月

### (1) Xk5-page sdk Ranking UI 开发
1. SDK UgcDetail Ranking UI Table  
2. SDK UgcDetail Ranking UI Select  
3. SDK UgcDetail Ranking UI RankingInfo  
4. SDK UgcDetail Ranking UI i18n  
5. SDK UgcDetail Ranking API  
6. SDK UgcDetail Ranking  

### (2) 了解 Xk5-page 代码架构 根据 platform service server 开启不同的Xk5页面服务
1. vscode 添加快捷打开项目的快捷方式 set Platform service server  
2. vscode 快捷键设置  
3. 平台中复用组件，BoardDetail, UgcDetail, InfiniteList等可复用组件 逻辑研究  
4. xk5-page 路由route map 逻辑研究  
5. 开发InfiniteList demo 滚动加载更多数据  
6. 了解Xk5项目当中 community encyclopedia workshop myhome 模块 熟悉XK5 page的架构内容  
7. XK5 page的开发代码规范 熟悉代码规范和命令规范等  

### (3) 开发前准备
1. 在开发电脑 搭建开发所需的软件等，为开发做准备  
2. 阅读开发商的开发者文档  

### (4) 小程序技术需求分析和建议
1. 针对策划给的小程序开发方案 评估开发难度很需要的时间  
2. 游戏方面的开发难度评估（黄金矿工，砍树游戏等）  
3. 小程序手工星球游戏社区开发，技术目前可以支持  
4. 小程序的开发时的应用方向等，提供建议等  

### (5) 构建简单的代码仓库gogs  
http://ui-git.tenvine.net/  
1. 环境 centos_7_04_64_20G  
2. 安装的模块 nginx git Mysql Node 等依赖模块  

3. 构建Gogs数据库 需要root权限  

```javascript
SET GLOBAL storage_engine = 'InnoDB';
CREATE DATABASE gogs CHARACTER SET utf8 COLLATE utf8_bin;
GRANT ALL PRIVILEGES ON gogs.* TO ‘root’@‘localhost’ IDENTIFIED BY 'YourPassword';
FLUSH PRIVILEGES;
QUIT;
```


4. 创建用户git 代表地址信息等  
5. 切换成git用户登陆 在git用户的权限下操作  
6. 安装Gogs  

```javascript
wget https://dl.gogs.io/0.11.4/linux_amd64.zip
unzip linux_amd64.zip
```

7. 运行Gogs命令 在网页中配置Gogs的选项等  

8. 配置在Linux下自动运行Gogs 切换成root权限 在root根目录下  

```javascript
sudo cp /home/git/gogs/scripts/init/centos/gogs /etc/init.d/
```

9. 增加执行权限  

```javascript
sudo chmod +x /etc/init.d/gogs
```

10. 复制service  

```javascript
cp /home/git/gogs/scripts/systemd/gogs.service /etc/systemd/system/
```

11. 启动Gogs  

```javascript
sudo service gogs start
```

# 2018年8月

### (1) ui-zhibo.tenvine.net 开发

1. 根据市场部门提供的虎牙的 appId 和 huyaKey 对接Request Api  

```javascript
import axios from 'axios';
import md5 from 'md5';
import { appId, huyaKey, huyaJsonServer, huyaServer, huyaDanmuServer } from '../../config/huya';
export default class HuyaResquest {
    constructor() {
        this.key = huyaKey;
        this.huyaId = appId;
    }
    /**
     *
     * @param {Number} page
     */
    async getlist(page) {
        try {
            let timestamp = Math.round(new Date().getTime() / 1000);
            const {data} = await axios.get(`${huyaJsonServer}/${page}.json?${timestamp}`);
            return data;
        } catch (e) {
            console.log(`douyu api: getlist = ${page}`);
        }
    }

    /**
     *
     * @param {Obj} params
     */
    getDanmuParams(params) {
        let timestamp = Math.round(new Date().getTime() / 1000);
        const sign = md5(`${this.key}${timestamp}`);
        let obj = {
            partner_id: this.huyaId,
            report_stamp: timestamp,
            sign: sign
        };
        if (params) {
            obj[Object.keys(params)[0]] = params[Object.keys(params)[0]];
        }
        return obj;
    }

    /**
     *
     * @param {Obj} params
     */
    getBaseParams(params) {
        if (params) {
            let key = Object.keys(params)[0];
            const data = `{"${key}":${params[key]}}`;
            const sign = md5(`data=${data}&key=${this.key}`);
            return {
                data: data,
                appId: this.huyaId,
                sign: sign
            };
        }
    }



    /**
     *
     * @param {String} url
     * @param {String}} type
     * @param {Object get 请求参数} params
     * @param {Object post 请求参数} data
     */
    async danmu(url, type, params, formData) {
        try {
            const {data} = await axios({
                method: type,
                baseURL: huyaDanmuServer,
                url: url,
                params: this.getDanmuParams(params),
                data: formData
            });
            return data;
        } catch (e) {
            console.log(`huya api: danmu = ${url}`);
        }
    }

    /**
     *
     * @param {String} url
     * @param {Object 请求参数} params
     */
    async get(url, params) {
        try {
            const {data} = await axios({
                baseURL: huyaServer,
                url: url,
                params: this.getBaseParams(params),
            });

            return data;
        } catch (e) {
            console.log(`huya api: methods get, url = ${url}`);
        }
    }
}
```
2. 根据API实现直播的接受弹幕，发送弹幕，直播列表，直播详情等功能

3. Infinite Scroll组件开发

```javascript
//初始化滚动列表数据
_initScroll() {
    if (!this.$refs.wrapper) {
        return false;
    }
    // better-scroll的初始化
    this.loadingUpHeight = this.$refs.loadingUp.getBoundingClientRect().height;
    this.scroll = new BScroll(this.$refs.wrapper, {
        bounce: {
            bottom: false
        },
        probeType: this.probeType,
        click: true,
        scrollY: true,
        pullUpLoad: this.pullUpLoadOpt,
        pullDownRefresh: this.pullDownRefreshOpt,
    });
    this._listenScroll();
    this._listenPullingUp();
    this._listenPullingDown();
    this.touchEnd();
},

_listenScroll() {
    this.scroll.on('scroll', pos => {
        if (this.status !== 'end') {
            pos.y > this.loadingUpHeight * 1.2 && (this.maxUp = true);
        }
    });
},

// 监听 Better Scroll 滚动到底部位置
_listenPullingUp() {
    if (this.listenPullingUp) {
        this.scroll.on('pullingUp', () => {
            this.$emit('loadMore');
        });
    }
},

//监听Better Scroll 下拉刷新
_listenPullingDown() {
    if (this.listenPullingDown) {
        this.scroll.on('pullingDown', () => {
            // this.$emit('loadingRefresh', true);
        });
    }
},

touchEnd() {
    this.scroll.on('touchEnd', pos => {
        this.status = 'end';
        if (pos.y > 0) {
            this.direction = 0;
            if (pos.y > this.loadingUpHeight) {
                this.$emit('loadingRefresh');
            }
        } else {
            this.direction = 1;
        }
    });
},

// 刷新better scroll
refresh() {
    this.scroll && this.scroll.refresh();
},

// 通知BS 组件上拉完成
finishPullUp(){
    this.scroll && this.scroll.finishPullUp();
},

// 通知BS 组件下拉刷新完成
finishPullDown(){
    this.scroll && this.scroll.finishPullDown();
    this.scroll.scrollTo(0, 0, 1000);
    this.status = 'waiting';
    this.maxUp = false;
},

// 解绑
destroy() {
    this.scroll && this.scroll.destroy();
}
```

4. 图片懒加载 lazyload

```javascript
/**
* inView 是否进入可视区域
* @param ele
* @returns {boolean}
*/
inView (ele) {
    let isInView = false,
        rect = ele.getBoundingClientRect(), // 当获取当前元素
        parentRect = this.container === window ? {left: 0, top: 0} : this.container.getBoundingClientRect(),
        viewWidth = this.container === window ? window.innerWidth : this.container.clientWidth, // 视图宽度
        viewHeight = this.container === window ? window.innerHeight : this.container.clientHeight; // 视图高度
    if (rect.bottom > this.threshold + parentRect.top
        && rect.top + this.threshold < viewHeight + parentRect.top
        && rect.right > this.threshold + parentRect.left
        && rect.left + this.threshold < viewWidth + parentRect.left) {
        isInView = true;
    }
    return isInView;
}
``` 

5. 开发可复用的Vue组件 直播聊天室 滚动加载组件等
6. 调试虎牙直播API，项目的类目是3853，目前获取英雄联盟的数据内容
7. 参考借鉴主流的Vue组件，开发组件

### (2)针对开发环境中需要访问一些开发相关的网站，为开发环境提供白名单
1. 查看项目当中需要请求到的域名  
2. 获取域名对应的IP地址  
3. 查看域名需要开放的端口，查看请求的域名是http或是https，根据开头 开放不同端口号443/80  
4. 关于stove 手工星球的各个环境 以及 不同平台的 域名和ip地址 对应的服务器添加到白名单  