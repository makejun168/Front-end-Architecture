const jsonp = function (url, data) {
    return new Promise((resolve, reject) => {
        // 返回一个 Promise

        // 初始化 url
        let dataString = url.indexOf('?') === -1 ? '?' : ''; // 处理当前是否存在 ?
        let callbackName = `jsonCB_${Date.now()}`
        let requestUrl = ''
        requestUrl += `${dataString}callback=${callbackName}`

        // 处理请求参数
        if (data) {
            for (let key in data) {
                requestUrl += `${key}=${data[key]}`
            }
        }

        let jsNode = document.createElement('script');
        jsNode.src = requestUrl

        // 触发callback，触发后删除js标签和绑定在window上的callback
        window[callbackName] = result => {
            delete window[callbackName]

            document.body.removeChild(jsNode)

            if (result) {
                resolve(result)
            } else {
                reject('error')
            }
        }

        // js加载异常的情况
        jsNode.addEventListener('error', () => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            reject('JavaScript资源加载失败')
        }, false)

        // 添加js节点到document上时，开始请求
        document.body.appendChild(jsNode) // 将 Script 标签 加入到 document 最后
    })
}
