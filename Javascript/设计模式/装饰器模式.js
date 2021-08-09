// 装饰器模式
// 动态地将功能附加在对象上
// 需求 ps Phone

class Device {
    create() {
        console.log('playstation4');
    }

}

class Phone {
    create() {
        console.log('iPhone12');
    }
}

class Decorator {
    constructor(device) {
        this.device = device;
    }

    create() {
        this.device.create();
        this.update(device);
    }

    update() {
        console.log('pro');
    }
}


let device = new Device();
device.create();

let newDevice = new Decorator(device);
newDevice.create(); // 设备的 update方法 更新好一次

