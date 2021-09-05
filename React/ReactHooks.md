# Hooks
让函数组件具有类组件的能力


### Hooks 基础功能实现
Components 组件，function组件是没有 this 没办法保存状态
```javascript
import React from "react";

class MyCount extends React.Component {
  state = {
    count: 0,
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
  }
  componentWillMount() {
    clearInterval(this.interval);
  }
  render() {
    return <span>{this.state.count}</span>;
  }
}
export default MyCount;
```

1.引入 React16版本以上的 useState，useEffect
2. 定义 state 显示状态，state 配对操作state的方法，起名随意修改，可以定义多个状态
3. useEffect 方法中执行 函数组件挂载好以后执行的功能，等价于component组件的 componentDidMounted
4. useEffect 方法中返回方法 约等于 componentWillMounted 生命周期
5. 整体函数返回 return HTML template 返回需要渲染的功能

```javascript
function MyCountFunc() {
  // 默认值
  const [count, setCount] = useState(0); // [a, b]
  // 多个状态的情况
  const [name, setName] = useState("poloma");
  useEffect(() => {
    // componentsDidmounted
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    // 返回的时候 等于函数的结束 就 等于 componentWillMounted
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <p>{name}</p>
      <span>{count}</span>
    </>
  );
}
export default MyCountFunc;
```

### State-Hooks

#### useState

* useState
* useReducer

* count 定义的值 是初始化时候定义的 就只会在第一次初始化时候会使用到
* count的值 执行过 setCount 以后 会直接使用新的值 覆盖原来的值
* 组件更新以后的值 将会是 setCount后的值 而不是初始化时候的值
* 建议使用 setCount(c => c+1) 保证每次使用的 值都是新

```javascript
const [count, setCount] = useState(0); // [a, b]

setCount(1); // 传入的参数是什么 Count的值就是什么

setCount(c => c+1); // 上一次修改后返回的值 然后可以拿到进行下一步的操作

// 这里的 Count 将会永远是 是 1 这里就是闭包陷阱问题
const interval = setInterval(() => {
  setCount(count + 1) // 这里 count 会一直在内存中; 内层函数中 一直在引用外层函数第一次生成的值 count 形式了 闭包
}, 1000);
```

#### useReducer

1. 好处修改对象的时候适用，不需要使用Object.assign 修改对象属性中的某个值，不用担心将对象传给子组件 props 无法渲染
2. 管理起来更加方便和独立 操作数据都在Reducer中管理

```javascript
import React, { useState, useReducer, useEffect } from "react";

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state
  }
}

function MyCountFunc() {
  // 默认值
  const [count, dispatchCount] = useReducer(countReducer, 0); // 第一个参数 reducer 第二个 0
  useEffect(() => {
    // componentsDidMounted
    const interval = setInterval(() => {
      dispatchCount({type: 'add'});
    }, 1000);
    // 返回的时候 等于函数的结束 就 等于 componentWillMounted
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <span>{count}</span>
    </>
  );
}

export default MyCountFunc;
```

### Effect-Hooks

* 当 useEffect 不传入第二个参数数组
1. 进入函数就会先执行 return Effect deteched
2. 更新数据的话就会重新执行 Effect invoked

* 当 useEffect 传入第二个参数是一个 空数组 [] 时候
1. 只会在第一次执行的 执行 Effect invoked
2. 切换页面的时候将会 执行 Effect deteched
2. 传入空数组的话 类似 Component 组件的 生命周期
3. 第二个参数数组中 传入 state的参数 name 时候，将会重新执行当前的 effect invoked 和 effect deteched
4. 如果在数组中传入的项，在本次更新中是没有变化的，将不会执行Effect，也不会卸载当前的 Effect
5. 传入数组的内容 发现他有变化的时候 将会执行渲染和卸载的 函数功能
6. 根据传入的依赖判断 到底是否需要重新Effect函数方法

#### useLayoutEffect

* useLayoutEffect 是在dom的内容更新到HTML里面的时候执行
* useEffect 是dom已经更新到 HTML 里面的时候执行
* useLayoutEffect 数据更新完成以后 才会挂载，所以一般很少使用

```javascript
import React, { useState, useReducer, useEffect, useLayoutEffect } from "react";

function MyCountFunc() {
  // 默认值
  const [count, dispatchCount] = useReducer(countReducer, 0); // 第一个参数 reducer 第二个 0
  const [name, setName] = useState("poloma");
  
    // layoutEffect 永远 useEffect 先执行
   useLayoutEffect(() => {
    console.log("layoutEffect invoked");
    return () => console.log("layoutEffect deteched");
  }, []);
  
  // state 修改 组件重新渲染 useEffect 就会被重新去调用
  useEffect(() => {
    // componentsDidmounted
    console.log("effect invoked");
    return () => console.log("effect deteched");
  });
 
  return (
    <div>
      <input value={name} onChange={(e) => {setName(e.target.value)}} />
      <button onClick={() => dispatchCount({type: "add"})}>{count}</button>
    </div>
  );
}

export default MyCountFunc;
```

### Context-Hooks

* 在父组件传入数据 test 在里面的组件中可以获取到 父组件传入的 数据 test
* value的值 传给了 Context 在下面的组件中 任何使用 useContext 中都可以拿到 他的 value 值

```javascript
import React from "react";
export default React.createContext("");
```

```javascript
<MyContext.Provider value="test"><Component {...pageProps}/></MyContext.Provider>
```

```javascript
import React, { useState, useContext } from "react";
import MyContext from '../../lib/my-context';

function MyCountFunc() {  
  const [name, setName] = useState("poloma");
  const context = useContext(MyContext);

  return (
    <>
      <p>{context}</p>
    </>
  );
}

export default MyCountFunc;
```

### Ref Hooks

```javascript
import React, { useState, useRef, useEffect } from "react";
import MyContext from '../../lib/my-context';

function MyCountFunc() {
  const inputRef = useRef();
  
  useEffect(() => {
    console.log(inputRef);
  }, [])
  
  return <input ref={inputRef}/>
}

export default MyCountFunc;
```

### 优化 Hooks

```javascript
import React, {
  useState,
  useReducer,
  useEffect,
  memo,
  useMemo,
  useCallback
} from "react";

function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}

// 子组件 核心通过 meno 判断当前传入的props 参数发生修改 再去更新 return html
const MyChild = memo(function Child({ onButtonClick, config }) {
  console.log("child render");
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  );
});

// 父组件
function MyCountFunc() {
  // 默认值
  const [count, dispatchCount] = useReducer(countReducer, 0); // 第一个参数 reducer 第二个 0
  const [name, setName] = useState("poloma");
  
  // 保证每次生成的都是 同一个对象
  // 注意这里 需要传入 depend count 当 count发生变化的时候 需要修改 config的 对象
  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? "red" : "blue",
    }),
    [count]
  );
  
  // 通过 useMemo 记忆当前的方法 保证使用是同一个方法
  const handleButtonClick = useMemo(
    () => () => dispatchCount({ type: "add" }),
    []
  );
  // 另外一种写法
  // const handleButtonClick = useCallback(() => dispatchCount({ type: "add" }), []);
  return (
    <>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <MyChild config={config} onButtonClick={handleButtonClick} />
    </>
  );
}

export default MyCountFunc;
```
