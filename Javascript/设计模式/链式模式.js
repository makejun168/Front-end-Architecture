// 有点像 jQuery 的 链式模式 调用

class Action {
    constructor(name) {
        this.name = name;
        this.nextAction = null; // 下一步步骤
    }

    setNextAction(action) {
        this.nextAction = action;
    }

    handle() {
        console.log(`${this.name}请审批，是否可以打游戏`)
        if (this.nextAction !== null) {
            this.nextAction.handle();
        }
    }
}

let dad = new Action('Dad')
let mom = new Action('Mom')
let wife = new Action('Wife')

dad.setNextAction(mom);
mom.setNextAction(wife);
dad.handle();

// 表单的提交和反显
// 第一行，第二行

// 迭代器
// iterator
// generator
// co
