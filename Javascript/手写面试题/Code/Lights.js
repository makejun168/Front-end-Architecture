class TrafficLight {
    constructor(name) {
        this.name = name;
    }

    red() {
        console.log('red');
    }

    yellow() {
        console.log('yellow');
    }

    green() {
        console.log('green');
    }
}

const traffic = new TrafficLight(); // 交通灯功能

// 具体实现的方法是 睡眠方法更新
const sleep = async (delay) => {
    let start = new Date().getTime();
    while (new Date().getTime() - start < delay) {
        continue
    }
}

// 主进程功能
async function Main() {
    while (true) {
        // 3 秒 红灯
        await sleep(3000);
        traffic.red();
        // 1 秒 黄灯
        await sleep(1000);
        traffic.yellow();

        // 3 秒 绿灯 循环往复
        await sleep(3000);
        traffic.green();

        continue;
    }
}

Main();