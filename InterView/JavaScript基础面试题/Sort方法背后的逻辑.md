JavaScript的`Array.prototype.sort()`方法是用来对数组的元素进行排序的。这个方法首先将数组的每个元素转换为字符串，然后基于字符的UTF-16代码单元值的序列进行排序。不过，您也可以为`sort()`方法提供一个可选的比较函数来自定义排序规则。

1. **默认排序行为**:
    - 没有提供比较函数时，数组元素被转化为字符串，然后根据其字符的UTF-16代码单元值的序列进行排序。
    - 这种默认行为可能会导致一些意外的结果，特别是在排序数字数组时。例如，数组`[10, 5, 40]`将被排序为`[10, 40, 5]`，因为字符串形式的"10"在"40"之前。

2. **使用比较函数**:
    - 您可以提供一个比较函数来告诉`sort()`如何排序数组元素。
    - 这个函数应该接收两个参数，通常命名为`a`和`b`。
    - 如果`a`应该位于`b`之前，则返回一个小于0的数值。
    - 如果`a`和`b`相等，则返回0。
    - 如果`a`应该位于`b`之后，则返回一个大于0的数值。

**背后的排序算法**:

至于背后具体使用的排序算法，这实际上取决于浏览器和它的JavaScript引擎。V8（Chrome的JavaScript引擎）在过去使用了多种排序算法，包括插入排序和快速排序的组合。

V8对小数组使用插入排序，因为在小数组上，插入排序可能比其他复杂的算法更快。对于更大的数组，V8使用快速排序。

但是，这只是V8的实现，并不是ECMAScript标准的规定。其他浏览器的JavaScript引擎可能会使用不同的排序算法。

总之，如果您需要确切的排序行为或特定的性能特性，最好自己实现排序算法或使用经过良好测试的第三方库。