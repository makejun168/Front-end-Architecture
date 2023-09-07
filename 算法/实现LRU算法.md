LRU（最近最少使用）算法是一种用于缓存管理的常见算法，它用于维护一个有限大小的缓存，当缓存达到最大容量时，会根据最近的访问情况来淘汰最不常用的数据。以下是用 JavaScript 实现 LRU 算法的示例：

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; // 缓存的最大容量
    this.cache = new Map(); // 使用 Map 数据结构来存储缓存数据
  }

  // 获取缓存数据
  get(key) {
    if (this.cache.has(key)) {
      // 如果缓存中有数据，先删除再重新插入，表示最近使用
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1; // 如果缓存中没有数据，返回 -1
  }

  // 添加缓存数据
  put(key, value) {
    if (this.cache.has(key)) {
      // 如果缓存中已经有数据，删除旧数据
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 如果缓存已满，淘汰最不常用的数据（最近没有访问的数据）
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value); // 插入新数据
  }
}

// 示例用法
const lruCache = new LRUCache(2); // 创建容量为 2 的缓存

lruCache.put(1, 1); // 缓存数据 1: 1
lruCache.put(2, 2); // 缓存数据 2: 2
console.log(lruCache.get(1)); // 输出 1
lruCache.put(3, 3); // 缓存数据 3: 3，此时 2 被淘汰
console.log(lruCache.get(2)); // 输出 -1，因为 2 已经被淘汰
```

在上述示例中，我们使用 `Map` 来存储缓存数据，并在 `get` 方法中根据访问情况调整数据的位置，保证最近使用的数据总是在前面。在 `put` 方法中，我们首先检查缓存是否已满，如果已满则淘汰最不常用的数据，然后插入新的数据。这样就实现了基本的 LRU 缓存算法。