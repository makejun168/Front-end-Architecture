class Receiver {
    execute() {
        console.log('run')
    }
}

class Command {
    constructor(receiver) {
        this.receiver = receiver;
    }
    executeCommand() {
        this.receiver.execute()()
    }
}

class Operator {
    constructor(command) {
        this.command = command;
    }

    run() {
        this.command.executeCommand();
    }
}

// Role
let soldier = new Receiver();

// 命令
let order = new Command(soldier);

let player = new Operator(order);

player.run();// 执行命令
