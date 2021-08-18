class MediaCenter {
    constructor() {
        this.state = '';
        this.observers = [];
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
        this.notifyAllObservers();
    }

    notifyAllObservers() {
        let _observers = this.observers || [];
        _observers.forEach(observer => {
            observer.update();
        })
    }

    attach(observers) {
        this.observers.push(observers);
    }
}

// 观察者
class Observer {
    constructor(name, center) {
        this.name = name;
        this.center = center;
        this.center.attach(this);
    }

    update() {
        console.log(`${this.name} is Update, state: ${this.center.getState()}`);
    }

}

let center = new MediaCenter();
let ps = new Observer('ps', center);
let tv = new Observer('tv', center);

center.setState('on');
