// 先入后出

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