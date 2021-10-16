// '{}[]' true '{{}[]' false '[{()}]'

class Stack {
    constructor() {
        this.items = []; // 用数组进行模拟
    }

    /**
     * 添加新元素到栈中
     * @param element
     */
    push(element) {
        this.items.push(element)
    }

    /**
     * 移出栈
     */
    pop() {
        return this.items.pop(); // 移除出最后一个元素 所以也是最靠前一个 最上面一个
    }

    /**
     * 获取栈顶元素
     */
    peek() {
        return this.items[this.items.length - 1];
    }

    /**
     * 判断为空
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * 清空栈
     */
    clear() {
        this.items = [];
    }

    size() {
        return this.items.length;
    }
}

const isValid = (s) => {
    const stack = new Stack();
    const map = {
        '}': '{',
        ']': '[]',
        ')': '(',
    }

    for (let i = 0; i < s.length; i++) {
        const char = s[i]

        stack.push(char)

        if (stack.size < 2) continue

        const theLastOne = stack[stack.size - 1]
        const theLastTwo = stack[stack.size - 2]

        if (map[theLastOne] === map[theLastTwo]) {
            stack.pop();
            stack.pop();
        }
    }

    return stack.size === 0; // 代表传入的字符串有效自闭合
}