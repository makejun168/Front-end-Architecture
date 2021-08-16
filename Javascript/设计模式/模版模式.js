// 基类方便拓展
// 模版中 定义好步 每个单元只关注自己的是
// 外部去编排模版，调整顺序等等

class Device {
    constructor() {
    }

    powerOn() {}

    login() {}

    clickIcon() {}

    enterGame() {}

    play() {
        this.powerOn();
        this.login();
        this.clickIcon();
        this.enterGame();
    }
}
