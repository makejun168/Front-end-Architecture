`useEffect` 钩子函数的第二个参数是一个依赖数组，它控制了 `useEffect` 的执行时机。具体来说：

1. **传空数组 `[]`**：
   - 如果将空数组作为 `useEffect` 的第二个参数传递，意味着 `useEffect` 只在组件的**挂载阶段**执行一次（即在 `componentDidMount` 时执行）。
   - 这意味着 `useEffect` 不会有任何依赖项，它不会对组件的状态或属性变化作出反应。因此，任何在 `useEffect` 中注册的副作用将只在组件第一次渲染时执行，并且不会在之后的渲染中再次执行。

   ```javascript
   useEffect(() => {
     console.log('这个副作用只在组件挂载时执行一次');
   }, []);
   ```

2. **传递依赖数组**：
   - 如果你传递一个包含依赖项的数组，`useEffect` 将会在**每次渲染时**都被调用，但只有当依赖项发生变化时才会执行副作用。
   - 这意味着 `useEffect` 会对数组中列出的依赖项进行监测，当其中任何一个依赖项发生变化时，`useEffect` 中的副作用将被触发。

   ```javascript
   const [count, setCount] = useState(0);

   useEffect(() => {
     console.log('这个副作用在每次渲染时执行');
   }, [count]);
   ```

3. **返回函数的执行时机**：
   - 无论是否传递依赖数组，`useEffect` 中的返回函数都会在组件卸载时执行。
   - 如果 `useEffect` 传递了依赖数组，返回函数还会在下一次副作用执行前执行（即下次渲染之前执行）。

   ```javascript
   useEffect(() => {
     console.log('这个副作用在每次渲染时执行');
     
     return () => {
       console.log('这个返回函数在组件卸载和下一次副作用执行前执行');
     };
   }, [count]);
   ```

总结：
- 传递空数组 `[]` 表示 `useEffect` 只在组件挂载时执行一次，不会对依赖项做出反应。
- 传递依赖数组表示 `useEffect` 在每次渲染时都会执行，但只在依赖项变化时才执行副作用。
- 返回函数在组件卸载时始终执行，并且如果有依赖数组，还会在下一次副作用执行前执行。