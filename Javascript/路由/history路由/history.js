class BaseRouter {
    constructor() {
        this.routes = {}
        this.bindPopState();
        this.bindExecCallbackByPath = this.execCallbackByPath(bind(this);
        init(location.pathname);
    }

    init(path) {
        window.history.replaceState({ path }, null, path);

        this.bindExecCallbackByPath(path);
    }

    // pushState 和 replaceState 不会触发到 history popstate 方法
    go(path) {
        window.history.pushState({ path }, null, path);

        this.bindExecCallbackByPath(path);
    }

    route(path, callback) {
        this.routes[path] = callback || function() {}；
    }

    bindPopState() {
        window.addEventListener('popstate', (e) => {
            const path = e.state && e.state.path;
            console.log(`in popstate listener path=${path}`);

            this.bindExecCallbackByPath(path);
        })
    }

    execCallbackByPath(path) {
        const cb = this.routes[path];
        cb && cb();
    }
}