# 学习算法和刷题的框架思维

### 一，数据结构的存储方式

数据结构的存储方式只有两种：数组（顺序存储）和链表（链式存储）。

#### 数组

数组由于是紧凑连续存储,可以随机访问，通过索引快速找到对应元素，而且相对节约存储空间。但正因为连续存储，内存空间必须一次性分配够，所以说数组如果要扩容，需要重新分配一块更大的空间，再把数据全部复制过去，时间复杂度 **O(N)**；
而且你如果想在数组中间进行插入和删除，每次必须搬移后面的所有数据以保持连续，时间复杂度 **O(N)**。

#### 链表

链表因为元素不连续，而是靠指针指向下一个元素的位置，所以不存在数组的扩容问题；如果知道某一元素的前驱和后驱，操作指针即可删除该元素或者插入新元素，时间复杂度 **O(1)**。
但是正因为存储空间不连续，你无法根据一个索引算出对应元素的地址，所以不能随机访问；而且由于每个元素必须存储指向前后元素位置的指针，会消耗相对更多的储存空间。

### 数据结构的基本操作

对于任何的数据无非就是 CRUD 增删查改
**数据结构种类很多，但它们存在的目的都是在不同的应用场景，尽可能高效地增删查改。**

1. 数组遍历框架，典型的线性迭代结构

```js
void traverse(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        // 迭代访问 arr[i]
    }
}
```

2. 链表遍历，兼具迭代和递归结构

```js
/* 基本的单链表节点 */
class ListNode {
    int val;
    ListNode next;
}
void traverse(ListNode head) {
    for (ListNode p = head; p != null; p = p.next) {
        // 迭代访问 p.val
    }
}
void traverse(ListNode head) {
    // 递归访问 head.val
    traverse(head.next)
}
```

3. 二叉树遍历框架，典型的非线性递归遍历结构：

```js
/* 基本的二叉树节点 */
class TreeNode {
    int val;
    TreeNode left, right;
}
void traverse(TreeNode root) {
    traverse(root.left)
    traverse(root.right)
}
```

N 叉树遍历

```js
/* 基本的 N 叉树节点 */
class TreeNode {
    int val;
    TreeNode[] children;
}
void traverse(TreeNode root) {
    for (TreeNode child : root.children)
        traverse(child);
    }
}
```

**二叉树是最容易培养框架思维的，而且大部分算法技巧，本质上都是树的遍历问题**

二叉树的套路框加

```js
void traverse(TreeNode root) {
    // 前序遍历
    traverse(root.left)
    // 中序遍历
    traverse(root.right)
    // 后序遍历
}
```

## 动态规划

目标： 动态规划问题的一般形式就是求最值

1. 求解动态规划的核心问题是穷举
2. 动态规划问题一定会具备「最优子结构」，才能通过子问题的最值得到原问题的最值
3. 正确的「状态转移方程」才能正确地穷举。

```js
// 初始化 base case
dp[0][0][...] = base
// 进行状态转移
  for 状态1 in 状态1的所有取值：
    for 状态2 in 状态2的所有取值：
      for ...

dp[状态1][状态2][...] = 求最值(选择1，选择2...)
```
