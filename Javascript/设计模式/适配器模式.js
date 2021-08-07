// 结构型
// 优化结构实现方案

// 适配器模式
// 适配 独立模板，保证业务模块独立解耦，并且连接兼容
// 需求 港行 PS 插座是国标的


class HKDevice {
    getPlug() {
        return `圆柱头`
    }
}

class Target {
    constructor() {
        this.plug = new HKDevice();
    }

    getTargetPlug() {
        return this.plug.getPlug() + '+圆柱头转换器'; // 这里进行转换 实际代码很多
    }
}

let target = new Target();
target.getTargetPlug();