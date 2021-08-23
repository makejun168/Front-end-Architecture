class BaseRouter {
    constructor() {
        this.routes = {}
        this.refresh = this.refresh.bind(this); // 存储 path 以及 callback 对应关系

        window.addEventListener('load', this.refresh); // 处理页面首次加载
        window.addEventListener('hashchange', this.refresh);
    }

    route(path, callback) {
        this.routes[path] = callback || function() {}
    }

    refresh() {
        const path = `/${location.hash.slice(1) || ''}`;
        console.log(location.hash, path);

        const cb = this.routes[path];
        cb && cb();
    }
}

const body = document.querySelector('body');

function changeBgColor(color) {
    body.style.background = color;
}

const Router = new BaseRouter();

Router.route('/', function() {
    changeBgColor('white')
});

Router.route('/green', function() {
    changeBgColor('green')
});

Router.route('/gray', function() {
    changeBgColor('gray')
});