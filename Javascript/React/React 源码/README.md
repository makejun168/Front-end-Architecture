### JSX 到 JavaScript的转换
1. 自定义的节点必须要大写开头，并不是强制性规定，但是jsx 转化为 js的时候 组件如果是小写的话，转化就会是字符串，导致报错等问题
2. React.createElement
3. React 本身 只是定义数据的类型 返回的大部分 都是对象 $$typeof 是 Symbol，并没有什么逻辑在里面
4. React DOM 逻辑 显示展示 DOM 等操作

### ReactElement
1. ReactElement 是一个 对象 包括 $$typeof  类型是 REACT_ELEMENT_TYPE 的 Symbols 唯一标识
2. type 是 creatElement 传入的第一个参数 是 字符串 或者是 一个 方法组件
3. config 是第二个参数 键值对 判断当前是否合法的键值对 propsName 不能是预定义的关键词
key，ref，__self，__source
4. 剩下的参数如果长度 大于 2 剩下的参数就会挂载到children中
5. type 组件的默认参数defaultProps 会挂载到 props中
### ReactComponent
1. 只是定义好这个组件。关键的逻辑 setState 都在ReactDOM中
2. Component PureComponent PureComponent 继承了
3. 通常我们extends Component的时候只会用到前两个参数 props content，但是updater 实际上是他的逻辑所在

#### 源码
```javascript
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
```

### React-Ref
1. React-Ref 三种使用方法 String Ref
2. ref 方法 function Ref <p ref={ele = console.log(ele) }>span</p>
3. createRef() this.objRef = React.createRef()
4. 返回的就是一个简单的对象 refObject = { current: null }

#### 源码
```javascript
import type {RefObject} from 'shared/ReactTypes';

export function createRef(): RefObject {
  const refObject = {
    current: null,
  };
  if (__DEV__) {
    Object.seal(refObject);
  }
  return refObject;
}
```

### forwardRef
1. 使用场景是 PureComponent 也可以使用得到 ref，因为pureComponent 是没有 this的实例的
2. 使用第三方的组件库时候，也需要使用这个拿到这个 ref 的时候，在React.forwardRef(props, ref) 第二个参数可以获得 ref
3. 这样就可以帮忙传递 ref 的属性，传递给接下来的内容，不会违法开发者的意图

#### 源码
```javascript
export default function forwardRef<Props, ElementType: React$ElementType>(
  render: (props: Props, ref: React$Ref<ElementType>) => React$Node,
) {
return {
    $$typeof: REACT_FORWARD_REF_TYPE, // symbol forwardRef 返回的对象是 type 而不是 $$typeof 这个对象会传入React.createElement 方法中 所以这个对象的类型 依然是 ReactElements
    render,
  };
}
```

### Context
Context 两种实现方式
1. childContextType
2. createContext (React 16版本以上) Provider Consumer


```javascript
//  getChildContext 
import { Component } from "react";

class Parent extends Component {
    getChildContext() {
        return { value: this.state.childContext, a: 'aaaaa' } // 子组件当中能够获得的数据值
    }
}

Parent.childContextTypes = {
    value: PropTypes..string
}

Child.contextTypes = {
    value: PropTypes.string
}
```


```javascript
const { Provider, Consumer } = React.createContext('default');

class Parent extends Component {
    render() {
        return (
            <Provider value={this.state.newContext}>{this.props.children}</Provider>
        )
    }
}

function Child1() {
    return <Consumer>{value => <p>newContext: {value}</p>}</Consumer>
}
```

#### 源码
```javascript
const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // These are circular
    Provider: (null: any),
    Consumer: (null: any),
};

context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
};

context.Consumer = context;

return context
```

### ConcurrentMode

```js
import React from 'react'
import { flushSync } from 'react-dom'

class Parent extends React.Component {
    updateNum = () => {
        flushSync(() => {
            this.setState({
                num: newNum,
            })
      })
    }
}

export default () => (
  <ConcurrentMode>
    <Parent />
  </ConcurrentMode>
)
```

#### 源码
```js
React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE; // 是一个 ReactSymbols 类型的 值
```

### Suspense
```js
import React, { Suspense, lazy } from 'react'

let data = ''
let promise = ''

function requestData() {
  if (data) return data
  if (promise) throw promise
  promise = new Promise(resolve => {
    setTimeout(() => {
      data = 'Data resolved'
      resolve()
    }, 2000)
  })
  throw promise
}

function SuspenseComp() {
  const data = requestData()
  return <p>{data}</p>
}

export default () => (
  <Suspense fallback="loading data">
    <SuspenseComp />
    <LazyComp />
  </Suspense>
)

// 在异步子组件抛出结果的之前，都会显示fallback 的值
// 所有的组件都加载好，才会取代fallback里面的值
```

#### 源码
```js
Suspense: REACT_SUSPENSE_TYPE, // 同样也是一个 ReactSymbols 值
```

```js
import type {LazyComponent, Thenable} from 'shared/ReactLazyComponent';
import {REACT_LAZY_TYPE} from 'shared/ReactSymbols';
// 接收 一个  ctor的 Promise方法 .then 方法 返回一个 LazyComponent
export function lazy<T, R>(ctor: () => Thenable<T, R>): LazyComponent<T> {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1, // 状态 reject pending
    _result: null, // 返回出来的属性 
  };
}
```

### Hooks
#### 源码
```js
if (enableHooks) {
  React.useCallback = useCallback;
  React.useContext = useContext;
  React.useEffect = useEffect;
  React.useImperativeMethods = useImperativeMethods;
  React.useLayoutEffect = useLayoutEffect;
  React.useMemo = useMemo;
  React.useMutationEffect = useMutationEffect;
  React.useReducer = useReducer;
  React.useRef = useRef;
  React.useState = useState;
}


var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null,
  currentDispatcher: null
};


function resolveDispatcher() {
  var dispatcher = ReactCurrentOwner.currentDispatcher;
  !(dispatcher !== null) ? invariant(false, 'Hooks can only be called inside the body of a function component.') : void 0;
  return dispatcher;
}


function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}

```

### Children
#### 源码
```js
var React = {
    Children: {
        map,
        forEach,
        count,
        toArray,
        only,
    }
};

function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  const result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

// forEach 方法没有 return 数据
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  const traverseContext = getPooledTraverseContext(
    null,
    null,
    forEachFunc,
    forEachContext,
  );
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

// mapIntoWithKeyPrefixInternal 就是一个大的递归 保证传入的多维数组 变成是 一维的 数组

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  let escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  const traverseContext = getPooledTraverseContext(
    array,
    escapedPrefix,
    func,
    context,
  );// 在对象池中获取，保存属性
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext); // 核心方法
  releaseTraverseContext(traverseContext); // 返回到对象池中
}

// 核心方法
function traverseAllChildrenImpl(
  children,
  nameSoFar,
  callback,
  traverseContext,
) {
  const type = typeof children;
  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }
  // 判断是否可以 使用 callBack 渲染单个节点
  let invokeCallback = false;
  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }
  // 执行 mapSingleChildIntoContext 生成单个节点
  if (invokeCallback) {
    callback(
      traverseContext,
      children,
      // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows.
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar,
    );
    return 1;
  }
  
  let child;
  let nextName;
  let subtreeCount = 0; // Count of children found in the current subtree.
  const nextNamePrefix =
    nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
    // 如果是一个 数组 那个将每个元素都 执行刚刚的方法
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(
        child,
        nextName,
        callback,
        traverseContext,
      );
    }
  } else {
    const iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      if (__DEV__) {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(
            didWarnAboutMaps,
            'Using Maps as children is unsupported and will likely yield ' +
              'unexpected results. Convert it to a sequence/iterable of keyed ' +
              'ReactElements instead.',
          );
          didWarnAboutMaps = true;
        }
      }
      const iterator = iteratorFn.call(children);
      let step;
      let ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          callback,
          traverseContext,
        );
      }
    } else if (type === 'object') {
      let addendum = '';
      if (__DEV__) {
        addendum =
          ' If you meant to render a collection of children, use an array ' +
          'instead.' +
          ReactDebugCurrentFrame.getStackAddendum();
      }
      const childrenString = '' + children;
      invariant(
        false,
        'Objects are not valid as a React child (found: %s).%s',
        childrenString === '[object Object]'
          ? 'object with keys {' + Object.keys(children).join(', ') + '}'
          : childrenString,
        addendum,
      );
    }
  }
  return subtreeCount;
}

```

### memo
#### 源码
16.6版本 让 Function Component 也可以使用 PureComponent 的功能 智能更新
```js
export default function memo<Props>(
  type: React$ElementType,
  compare?: (oldProps: Props, newProps: Props) => boolean,
) {
// 同样是返回 一个 对象 $$typeof 是 Symbol 对象
  return {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  };
}
```

### Fragment
#### 使用
React.Fragment

### StrictMode
提示信息 提示哪些功能不能使用 例如 ComponentWillMounted 过期方法

### CloneElement
#### 源码
```js
function cloneElement(element, config, children) {
  invariant(
    !(element === null || element === undefined),
    'React.cloneElement(...): The argument must be a React element, but you passed %s.',
    element,
  );
  let propName;
  // Original props are copied
  const props = Object.assign({}, element.props);
  // Reserved names are extracted
  let key = element.key;
  let ref = element.ref;
  // Self is preserved since the owner is preserved.
  const self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  const source = element._source;
  // Owner will be preserved, unless ref is overridden
  let owner = element._owner;
  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    // Remaining properties override existing props
    let defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }
  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
  return ReactElement(element.type, key, ref, self, source, owner, props);
}
```

### createFactory
JSX 开发的时候 很少使用这种模式
```js
export function createFactory(type) {
  const factory = createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook: remove it
  factory.type = type;
  return factory;
}
```

## React DOM
#### 创建更新方法
1. ReactDOM.render || hydrate
2. setState ( 调度的过程 )
3. forceUpdate

#### React DOM render
1. 创建 ReactRoot
2. 创建 FiberRoot 和 RootFiber (重点)
3. 创建更新 更新调度阶段

#### 大概流程
1. reactDOM render 方法 创建了 ReactRoot 对象
2. 创建了 FiberRoot 同时创建了 Fiber对象 加入 expirationTime 更新对象
3. scheduleWork

#### FiberRoot
1. 整个应用的起点
2. 包含挂载的目标节点
3. 记录整个应用更新过程的各种信息

```js
// createFiberRoot 返回的对象
root = ({
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,
      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,
      didError: false,
      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null,
      interactionThreadID: unstable_getThreadID(),
      memoizedInteractions: new Set(),
      pendingInteractionMap: new Map(),
}: FiberRoot);
```

#### Fiber
1. 每一个ReactElement 对应一个Fiber对象
2. 记录节点的各种状态
3. 串联整个应用形成树结构

```js

export type Fiber = {|
  // These first fields are conceptually members of an Instance. This used to
  // be split into a separate type and intersected with the other Fiber fields,
  // but until Flow fixes its intersection bugs, we've merged them into a
  // single type.
  // An Instance is shared between all versions of a component. We can easily
  // break this out into a separate object to avoid copying so much to the
  // alternate versions of the tree. We put this on a single object for now to
  // minimize the number of objects created during the initial render.
  // Tag identifying the type of fiber.
  tag: WorkTag,
  // Unique identifier of this child.
  key: null | string,
  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.
  elementType: any,
  // The resolved function/class/ associated with this fiber.
  type: any,
  // The local state associated with this fiber.
  stateNode: any,
  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.
  // Remaining fields belong to Fiber
  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null,
  // Singly Linked List Tree Structure.
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,
  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref: null | (((handle: mixed) => void) & {_stringRef: ?string}) | RefObject,
  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any, // This type will be more specific once we overload the tag.
  memoizedProps: any, // The props used to create the output.
  // A queue of state updates and callbacks.
  updateQueue: UpdateQueue<any> | null,
  // The state used to create the output
  memoizedState: any,
  // A linked-list of contexts that this fiber depends on
  firstContextDependency: ContextDependency<mixed> | null,
  // Bitfield that describes properties about the fiber and its subtree. E.g.
  // the ConcurrentMode flag indicates whether the subtree should be async-by-
  // default. When a fiber is created, it inherits the mode of its
  // parent. Additional flags can be set at creation time, but after that the
  // value should remain unchanged throughout the fiber's lifetime, particularly
  // before its child fibers are created.
  mode: TypeOfMode,
  // Effect
  effectTag: SideEffectTag,
  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null,
  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,
  // Represents a time in the future by which this work should be completed.
  // Does not include work found in its subtree.
  expirationTime: ExpirationTime,
  // This is used to quickly determine if a subtree has no pending changes.
  childExpirationTime: ExpirationTime,
  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  alternate: Fiber | null,
  // Time spent rendering this Fiber and its descendants for the current update.
  // This tells us how well the tree makes use of sCU for memoization.
  // It is reset to 0 each time we render and only updated when we don't bailout.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualDuration?: number,
  // If the Fiber is currently active in the "render" phase,
  // This marks the time at which the work began.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualStartTime?: number,
  // Duration of the most recent render time for this Fiber.
  // This value is not updated when we bailout for memoization purposes.
  // This field is only set when the enableProfilerTimer flag is enabled.
  selfBaseDuration?: number,
  // Sum of base times for all descedents of this Fiber.
  // This value bubbles up during the "complete" phase.
  // This field is only set when the enableProfilerTimer flag is enabled.
  treeBaseDuration?: number,
  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean,
|};
```

#### Update
1. 记录组件状态的改变的
2. 存放在UpdateQueue
3. 多个Update可以同时存在
4. enqueueUpdate 初始化Fiber上的Updatequeue 更新Updatequeue
5. 多次 setState 创建完Update后放在UpdateQueue 里面 统一再进行更新 对应 setState 非同步的执行
6. Current 的概念 可以对应是Fiber

#### expirationTime
```js
function computeExpirationBucket(
  currentTime,
  expirationInMs,
  bucketSizeMs,
): ExpirationTime {
  return (
    MAGIC_NUMBER_OFFSET +
    ceiling(
      currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE,
      bucketSizeMs / UNIT_SIZE,
    )
  );
}
```
1. 实际上是按照 UNIT_SIZE 单元向上叠加的, 2个不一样的 expirationTime 肯定是 UNIT 单元的倍数
2. 计算ExpirationTime目的是 为了在 多次调用 setState的场景 前后多次调用的 即便差距很少，从毫秒级别的来说，他们的expirationTime 是不一样的
3. ExpirationTime 不一样 意味着 React 执行的优先级 不一样 导致 React 更新多次，影响到性能
4. bucketSize 用处 很少时间间隔内 算出来ExpirationTime 结果是一样 优先级也会一样

#### different-expirtation-time
##### 种类
1. Sync 模式 fiber.mode & ConcurrentMode fiber.mode 中不包含 ConcurrentMode
2. 异步模式 (复杂操作)
3. 指定context 模式  当前的 expirationTime = expirationContext 外部强制的情况 

##### 二进制设计模式
```js
export type TypeOfMode = number;

export const NoContext = 0b000;
export const ConcurrentMode = 0b001;
export const StrictMode = 0b010;
export const ProfileMode = 0b100;

// 默认情况下 mode 等于 NoContext
var mode = NoContext;
mode |= ConcurrentMode; // 将 ConcurrentMode 并入到 mode
mode & ConcurrentMode; // 判断是否 在 mode中 如果返回 1 代表 true 返回 0 代表 false

// 目的是方便融合和判断
```

#### setState forceUpdate
class Component 更新组件的过程 setState forceUpdate 过程，只有这两个更新是合理的操作

1. 给节点的Fiber创建更新 针对某一个Component 更新
2. 更新的类型不同
3. 创建了root节点的fiber对象，并创建了fiber对象上的update，计算了fiber对象上的expirationTime，然后进入调度


## 整体任务调度流程
1. Scheduler 整体流程概览
2. 调度过程中 各种全局变量一览
3. 构建任务调度都概念
4. 利用 浏览器比较新的API requestIdleCallback
5. window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。