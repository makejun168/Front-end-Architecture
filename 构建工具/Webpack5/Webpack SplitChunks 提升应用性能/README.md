### SplitChunks

为此，`Webpack` 提供了 `SplitChunksPlugin` 插件，专门用于根据产物包的体积、引用次数等做分包优化，规避上述问题，特别适合生产环境使用。

不过，`SplitChunksPlugin` 的使用方法比较复杂，我们得从 Chunk 这个概念开始说起。

### 深入理解 Chunk


