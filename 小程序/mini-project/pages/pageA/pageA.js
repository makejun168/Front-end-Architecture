const appInstance = getApp();

console.log(appInstance.globalData)

Page({
    data: {
        message: 'Page A'
    },
    changeMessage() {
        this.setData({
            message: '123'
        })
    }
})