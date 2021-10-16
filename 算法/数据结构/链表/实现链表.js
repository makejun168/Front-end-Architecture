class LinkList {
    constructor(length) {
        this.length = length; // 表示长度
        this.head = null; // 定义头部的元素
    }

    /**
     * 返回索引对应的元素
     * @param position
     * @returns {null|boolean}
     */
    getElementAt(position) {
        if (position < 0 || position > this.length) return false;

        let current = this.head;

        // position 就是链表的位置 具体位置
        for (let i = 0; i < position; i++) {
            current = current.next; // 导航守卫的样子
        }

        return current;
    }

    /**
     * 添加节点
     * @param element
     */
    append(element) {
        // 链表节点的 辅助类 Node
        let node = new Node(element);

        // 链表为空
        if (this.head === null) {
            this.head = node; // 为空的话 直接拼接到头部
        } else {
            let current = this.getElementAt(this.length - 1); // 找到最后一个
            current.next = node; // 拼接到最后一个
        }
        this.length++; // 长度改变 + 1
    }

    /**
     * 添加节点
     * @param position
     * @param element
     */
    insert(position, element) {
        if (position < 0 || position > this.length) return false;

        let node = new Node(element);

        // 判断是否为头部
        if (position === 0) {
            node.next = this.head; // 等于 null
            this.head = node;
        } else {
            let previous = this.getElementAt(position - 1); // 目标插入项的 前一位

            node.next = previous.next; // 先改变 插入 node 的 下一项 变成 前一位当前项
            previous.next = node; // 最后 目标的下一项 变成当前项
        }

        this.length++; // 长度修改
        return true;
    }

    /**
     * 删除指定位置元素
     * @param position
     */
    removeAt(position) {
        if (position < 0 || position > this.length) return false;

        let current = this.head; // 当前的元素

        // 判断是否为头部
        if (position === 0) {
            this.head = current.next;
        } else {
            let previous = this.getElementAt(position - 1); // 找到需要删除的 前一位

            current = previous.next;
            previous.next = current.next;
        }

        this.length--; // 长度修改
        return current.element;
    }

    /**
     * 查找
     * @param element
     */
    indexOf(element) {
        let current = this.head;
        let resultIdx = -1;

        for (let i = 0; i < this.length; i++) {
            if (current.element === element) {
                resultIdx = i;
                break;
            }
            current = current.next;
        }

        return resultIdx; // 如果没有 返回 -1
    }
}

/**
 * 节点构造类
 */
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}