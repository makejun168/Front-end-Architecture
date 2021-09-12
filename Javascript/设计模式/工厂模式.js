

class Game {
    constructor(name) {
        this.name = name;
    }

    init() {
        console.log('init');
    }

    run() {
        console.log('run');
    }
}


const LOL = new Game('lol');
LOL.init();
LOL.run();
