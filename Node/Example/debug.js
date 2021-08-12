let index = 0;
let cache = {
    method: function() {
        console.log('this is cache', index);
    }
}

debugger;

function cacheInfo(info) {
    index += 1;
    const prevCache = cache;
    const method = function() {
        if (prevCache) {
            prevCache.method();
        }
    }

    cache = {
        info: info,
        method() {
            method();
            console.log('this is method', index)
        }
    }
}

for (let i = 0; i < 1000; i++) {
    const info = new Array(1000000);
    cacheInfo(info);
}

// node --inspect --inspect-brk debug.js
// 在谷歌里面 debug Chrome://inspect
