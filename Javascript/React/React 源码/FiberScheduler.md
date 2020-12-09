## scheduleWork
#### 核心的知识点
1. 找到更新对应的 FiberRoot 节点
2. 如果符合条件的话 重置stack
3. 如果符合条件就请求工作调度
4. RootFiber 加入调度 更新的开始就是从 RootFiber开始的

核心逻辑代码
```js
function scheduleWorkToRoot(fiber: Fiber, expirationTime): FiberRoot | null {
  recordScheduleUpdate();
  // Update the source fiber's expiration time
  if (
    fiber.expirationTime === NoWork ||
    fiber.expirationTime > expirationTime
  ) {
    fiber.expirationTime = expirationTime;
  }
  let alternate = fiber.alternate;
  if (
    alternate !== null &&
    (alternate.expirationTime === NoWork ||
      alternate.expirationTime > expirationTime)
  ) {
    alternate.expirationTime = expirationTime;
  }
  // Walk the parent path to the root and update the child expiration time.
  let node = fiber.return;
  let root = null;
  // 判断是否是根节点
  if (node === null && fiber.tag === HostRoot) {
    root = fiber.stateNode; // root fiber
  } else {
    // 不是 根节点 root Fiber
    while (node !== null) {
      alternate = node.alternate;
      // 判断 expirationTime 优先级
      if (
        node.childExpirationTime === NoWork ||
        node.childExpirationTime > expirationTime
      ) {
        node.childExpirationTime = expirationTime;
        if (
          alternate !== null &&
          (alternate.childExpirationTime === NoWork ||
            alternate.childExpirationTime > expirationTime)
        ) {
          alternate.childExpirationTime = expirationTime;
        }
      } else if (
        alternate !== null &&
        (alternate.childExpirationTime === NoWork ||
          alternate.childExpirationTime > expirationTime)
      ) {
        // 判断 expirationTime 优先级
        // alternate expirationTime 赋值
        alternate.childExpirationTime = expirationTime;
      }
      if (node.return === null && node.tag === HostRoot) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  }
  if (root === null) {
    return null;
  }
  // 省略一部分 不是更新逻辑的内容
  return root;
}

// 进入 scheduleWork
function scheduleWork(fiber: Fiber, expirationTime: ExpirationTime) {
  const root = scheduleWorkToRoot(fiber, expirationTime); // 上面的 遍历Node节点 expirationTime赋值
  if (root === null) {
    return;
  }
  if (
    !isWorking &&
    nextRenderExpirationTime !== NoWork &&
    expirationTime < nextRenderExpirationTime
  ) {
    // 判断是否进入状态
    // This is an interruption. (Used for performance tracking.)
    interruptedBy = fiber;
    resetStack(); // 重置变量
  }
  markPendingPriorityLevel(root, expirationTime); // todo 后期再讲解
  if (
    // If we're in the render phase, we don't need to schedule this root
    // for an update, because we'll do it before we exit...
    !isWorking ||
    isCommitting ||
    // ...unless this is a different root than the one we're rendering.
    nextRoot !== root
  ) {
    const rootExpirationTime = root.expirationTime;
    requestWork(root, rootExpirationTime); // requestWork 下一个章节
  }
  // todo nestedUpdateCount 防止组件更新过程中 重复执行
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    // Reset this back to zero so subsequent updates don't throw.
    nestedUpdateCount = 0;
    invariant(
      false,
      'Maximum update depth exceeded. This can happen when a ' +
        'component repeatedly calls setState inside ' +
        'componentWillUpdate or componentDidUpdate. React limits ' +
        'the number of nested updates to prevent infinite loops.',
    );
  }
}
```

## requestWork