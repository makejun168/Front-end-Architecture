// 树结构
// 前序中序后序遍历 方式

// 中 左右
const PreOrder = function (node) {
    if (node !== null) {
        console.log(node.val)
        PreOrder(node.left);
        PreOrder(node.right);
    }
}

// 左中右
const InOrder =function (node) {
    if (node !== null) {
        PreOrder(node.left);
        console.log(node.val)
        PreOrder(node.right);
    }
}

// 左右中
const PostOrder =function (node) {
    if (node !== null) {
        PreOrder(node.left);
        PreOrder(node.right);
        console.log(node.val);
    }
}

// 查找最大值，偶数层，拍平 树拍平成一个数组, parent,left,right


