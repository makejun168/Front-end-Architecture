
![图怪兽_c73add45cd5c340387c354cdeab5bd18_83849.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6dbc96f424e43a193e5fe58d54957d2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=383&s=164604&e=png&b=ee6b32)

### 背景

今天借此机会分享一个在在日常开发的过程中，处理一个一直困扰我很久的BUG问题，突然收到开发商发来的一个邮件，关于工具上传图片失败的报错提醒，我马上打起十二分精神一次次排查起这个问题

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/358de1b715dd4164b2470fab1ea1b46c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=508&h=159&s=5655&e=png&b=ffffff)

经过分析发现原来是 保存在本地 `Cookie` 的用户数据在上传的时候获取失败，导致整个上传过程发生错误，直接影响到后续工作的进展了（PS：因为文件上传是必填项）

下面开始重头戏，关于我写这个代码的例子，一步步分析，我是发现 `useRef` 的妙用的。

### 分析出现问题的过程

下面是代码的实例

```js
import React from 'react';
import Cookies from '某Cookies第三方库';

export const uploadData = {
    memberNo: Cookies.get('xxxx'), // 直接调用方法
    url: 'https://upload.make.com'
}
```

```ts
import React from 'react';
import UploadImage from './UploadImage';
import { uploadData } from './uploadData';

cosnt App = () => {
  return (
    <div>
      // Upload 组件中直接传入 UploadData的变量
      <UploadImage uploadData={uploadData} />
    </div>
  );
}

export default App;
```

初步分析感觉看起来完全没问题的代码，其实暗藏玄机，这里的获取的变量 `uploadData` 在函数组件的生命周期中，只执行了在挂载的时候一次，而且获取的数据的时候是一个静态的对象，并不会去读取 `Cookies.get('xxxx')`这个方法的！！！

针对这样的问题，我们正好合理利用上我们本文的重点 `useRef` 钩子, 保证在我们函数组件的生命周期内，能够正常读取到 `Cookie` 中的信息，下面请看代码

```ts
import React from 'react';
import Cookies from '某Cookies第三方库';

// 这里我们改成一个方法，调用方法返回函数值
export const getUploadData = () => ({
    memberNo: Cookies.get('xxxx'),
    url: 'https://upload.make.com'
})
```

```ts
import React, { useRef } from 'react';
import UploadImage from './UploadImage';
import { getUploadData } from './uploadData';

cosnt App = () => {
  const data = useRef(getUploadData());// 这里我们包装一层数据
  return (
    <div>
      // Upload 组件中直接传入 UploadData Ref 数据
      <UploadImage uploadData={data.current} />
    </div>
  );
}

export default App;
```

重点就是，我们在 `React` 函数式组件中，使用一些不需要渲染到页面上的变量的时候，我们建议使用 `useRef` 钩子来包裹，这样既保证了数值不会被修改，保证了数据的安全性，而且不受其他生命周期的影响，使用起来也很方便

### 正式介绍 useRef

`useRef` 是 React 中的一个钩子，用于创建一个可以持有对DOM元素或React元素的引用的对象。它的主要作用是允许您访问组件中的 `DOM` 元素 或 其他 `React` 元素，而不需要触发 **重新渲染**。

下面是如何使用 `useRef` 的基本步骤：

1. **导入 `useRef` 钩子：** 首先，在组件文件中导入 `useRef` 钩子。

   ```javascript
   import { useRef } from 'react';
   ```

2. **创建一个 `ref` 对象：** 在组件内部，使用 `useRef` 创建一个 `ref` 对象。通常，您会在函数组件的顶部声明 `ref`。

   ```javascript
   const myRef = useRef();
   ```

   这将创建一个名为 `myRef` 的 `ref` 对象。

3. **将 `ref` 与元素或组件关联：** 您可以将 `ref` 对象与渲染的DOM元素或React元素相关联。这通常是通过将 `ref` 属性分配给元素或组件完成的。

   例如，将 `ref` 分配给一个 `input` 元素：

   ```javascript
   <input ref={myRef} />
   ```

   现在，`myRef` 将引用这个 `input` 元素，您可以使用 `myRef.current` 来访问它。

4. **访问 `ref` 中的当前值：** 通过 `ref.current` 属性，您可以访问 `ref` 中关联的元素或组件的当前值。这是 `ref` 的主要用途之一。

   ```javascript
   const element = myRef.current;
   ```

   您可以对 `element` 进行各种操作，例如读取其属性、修改其样式或执行其他DOM操作。

5. **在需要时使用 `ref`：** 通常，您会在某些生命周期函数、事件处理程序或其他需要访问元素或组件引用的地方使用 `ref`。

下面是一个简单的示例，演示了如何使用 `useRef`：

```javascript
import React, { useRef } from 'react';

function MyComponent() {
  // 创建一个 ref 对象
  const myRef = useRef();

  // 在按钮点击时，将输入框中的值输出到控制台
  const handleClick = () => {
    const inputElement = myRef.current;
    console.log('Input Value:', inputElement.value);
  };

  return (
    <div>
      <input ref={myRef} type="text" />
      <button onClick={handleClick}>输出输入框的值</button>
    </div>
  );
}

export default MyComponent;
```

在上面的示例中，我们创建了一个 `ref` 对象 `myRef` 并将其分配给了 `input` 元素。当用户点击按钮时，我们通过 `myRef.current` 访问输入框的值并将其输出到控制台。

### 其他概念 & 补充

当使用 `useRef` 时，还有一些重要的概念和用法需要补充：

#### 1. 初始值

`useRef` 的初始值通常是 `null`，但您也可以为其提供一个初始值。例如：

```javascript
const myRef = useRef(initialValue);
```

在某些情况下，提供初始值可能会有帮助，但通常情况下，`useRef` 会根据关联的DOM元素或React元素自动设置初始值。

#### 2. 非受控组件

`useRef` 通常与非受控组件一起使用。非受控组件是指其值不由React状态管理的组件，而是通过DOM属性（例如`value`或`checked`）直接控制。通过 `useRef` 访问这些非受控组件的值非常方便，因为它不会触发重新渲染。

```js
import React, { useRef } from 'react';

function UncontrolledInputExample() {
  // 创建一个 ref 对象
  const inputRef = useRef();

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    // 通过 inputRef.current 获取输入框的当前值
    alert(`Submitted value: ${inputRef.current.value}`);
  };

  return (
    <div>
      <h1>非受控输入示例</h1>
      <form onSubmit={handleSubmit}>
        {/* 使用 ref 分配给非受控输入元素 */}
        <input type="text" ref={inputRef} />
        <button type="submit">提交</button>
      </form>
    </div>
  );
}

export default UncontrolledInputExample;
```

#### 3. 实时性和限制

请注意，`useRef` 的值是实时的，不会触发重新渲染。这意味着当您通过 `ref.current` 访问元素或组件时，它的状态可能已经改变，但不会引发新的渲染。

此外，`useRef` 的主要用途之一是绕过React的限制。这意味着可以在 `useRef` 中存储任何类型的数据，而不仅仅是DOM元素或React元素的引用。这对于存储和维护组件的持久状态非常有用。这一点就是本文开头提到的那个作用了！！

#### 4. 清理工作

当组件卸载时，`useRef` 中的引用仍然存在。如果您在组件卸载后访问了 `ref.current`，它将返回 `null`，这可能导致错误。为了避免这种情况，您可以在组件卸载时手动清理 `ref`，例如使用 `useEffect`：

```javascript
useEffect(() => {
  return () => {
    // 在组件卸载时清理 ref
    myRef.current = null;
  };
}, []);
```

这可以确保在组件卸载后不会意外访问 `ref`。

#### 5. 常见用途

`useRef` 在React中有多种常见用途，包括：

- 获取和操作DOM元素。
- 在动画中保存元素的位置信息。
- 与第三方库集成，例如Chart.js 或 D3.js。
- 保存上一个渲染周期的值，以进行比较。
- 跟踪焦点管理
- 与`setInterval`或`setTimeout`等定时器一起使用。

### 总结

总之，`useRef` 是React中强大的工具，用于访问和操作 DOM 元素或其他 React 元素的引用，以及绕过React的限制，执行一些不会触发重新渲染的操作。根据需求，它可以在组件中提供方便和灵活性。

