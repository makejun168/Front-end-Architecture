// 代理模式
// 使用代理人来替代原始的对象
// 需求 游戏防沉迷

class Game {
    play() {
        return 'play'
    }
}

class Player {
    constructor(age) {
        this.age = age;
    }
}

class GameProxy {
    constructor(player) {
        this.player = player;
    }

    play() {
        return this.player.age < 16 ? "too young to play" : new Game().play()
    }
    
}

let yy = new Player(18);
let game = new GameProxy(yy);

game.play();
// 隐藏真实的使用的人
