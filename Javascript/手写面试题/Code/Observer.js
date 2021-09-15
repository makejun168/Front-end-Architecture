class Subject {
    constructor(name) {
        this.name = name;
        this.state = 'ok';
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer)
    }

    getState() {
        return this.state;
    }

    // 更新的时候 更新全部的观察者的 方法
    setState(state) {
        this.state = state;
        this.notifyAllObserves();
    }

    // 更新的时候 更新全部的观察者的 方法
    notifyAllObserves() {
        let obs = this.observers || [];
        obs.forEach(observer => {
            observer.update(); // 调用通知 观察者 全部更新
        })
    }
}


// 观察者 可以有多个
class Observer {
    constructor(name, center) {
        this.name = name;
        this.center = center;
        this.center.attach(this);
    }

    update() {
        console.log(`${this.name} 在观察更新，最新的值是 ${this.center.getState()}`);
    }
}

const s1 = new Subject('s1');

const o1 = new Observer('kobe', s1);
const o2 = new Observer('polo', s1);

s1.setState('success');