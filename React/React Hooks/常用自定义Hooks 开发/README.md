![img.png](img.png)


### 1. useDebounceFn

`useDebounceFn`：用来处理防抖函数的 Hooks，我们主要通过 Lodash 来处理 [防抖](https://www.lodashjs.com/docs/lodash.debounce) 。

确定出入参：参考 Lodash 中的防抖函数中的 debounce。

```ts
 `_.debounce(func, [wait=0], [options=])`
```

可以确定入参共有 5 个，分别是：func（防抖函数）、wait（超时时间/s）、leading（是否延迟开始前调用的函数）、trailing（是否在延迟开始后调用函数）、maxWait（最大等待时间）。

出参：触发防抖的函数，官方提供的 cancel（取消延迟）和 flush（立即调用），这里只返回了触发防抖的函数即可。

优化方案： 使用 useLatest 处理对应的 func，保持函数最新值，利用 useCreation 优化整个 debounce 即可，另外，需要 useUnmount 在卸载的时候调用 cancel 方法卸载组件。

```ts
import { useLatest, useUnmount, useCreation } from "..";
import debounce from "lodash/debounce";

type noop = (...args: any[]) => any;

interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

const useDebounceFn = <T extends noop>(fn: T, options?: DebounceOptions) => {
  const fnRef = useLatest(fn);

  const debounced = useCreation(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
        options?.wait ?? 1000,
        options
      ),
    []
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return debounced;
};

export default useDebounceFn;
```

> 问：在 debounce 中使用 options?.wait ?? 1000 中的 ”??“ 是什么？

> 答：?? 是 ES11 的新语法：空值合并运算符，只会在左边的值严格等于 null 或 undefined 时起作用，一起来看看与 || 的区别：

```ts
const a = 0
const b = a || 7 //b = 7
const c = a ?? 7 // c = 0
```

### 使用方式：

```ts
const run = useDebounceFn(
    fn:(...args: any[]) => any,
    options?: Options
);
```

### 2. useDebounce

`useDebounce`：用来处理防抖值的 Hooks，既然学了处理函数的防抖，那么处理值的防抖就简单多了，我们只需要利用 `useDebounceFn` 即可。

```ts
import { useDebounceFn, useSafeState, useCreation } from "..";

import type { DebounceOptions } from "../useDebounceFn";

const useDebounce = <T,>(value: T, options?: DebounceOptions) => {
  const [debounced, setDebounced] = useSafeState(value);

  const run = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useCreation(() => {
    run();
  }, [value]);

  return debounced;
};

export default useDebounce;
```

使用方式：

```ts
const debouncedValue = useDebounce(
  value: any,
  options?: Options
);
```

### 3. useThrottleFn

useThrottleFn：用来处理节流函数的 Hooks，同样的，我们使用 Lodash 中的 [节流](https://www.lodashjs.com/docs/lodash.throttle) 来处理。

节流与防抖基本一致，只不过缺少 maxWait（最大等待时间）字段，其余的都一样，所以代码就不过多赘述了，直接看看效果即可：

### 4. useThrottle

useThrottle：用来处理节流值的 Hooks，跟 useDebounce 同理。

### 5.useLockFn

useLockFn：竞态锁，防止异步函数并发执行。

我们在表单中或者各种按钮中，都需要与后端进行交互，这个钩子的作用是防止用户重复点击，重复调取接口（特别是订单的提交），所以这个钩子适用场景非常多，也很重要。

确定出入参：入参应该是执行函数的效果，出参则是何时执行的函数。

既然 useLockFn 是防止异步函数并发执行，那么我们所接受的 fn 必然返回 Promise 形式，同时，接口也会有各种各样的情况，必须通过 try catch 包一层。

那么我们只需要一个状态来判定是否执行对应的函数即可，由于处理的是函数，直接使用 useCallback 包裹即可。

```ts
import { useRef, useCallback } from "react";

const useLockFn = <P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
) => {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return;
      lockRef.current = true;
      try {
        const ret = await fn(...args);
        lockRef.current = false;
        return ret;
      } catch (e) {
        lockRef.current = false;
        throw e;
      }
    },
    [fn]
  );
};

export default useLockFn;
```

```ts
const run = useLockFn<P extends any[] = any[], V extends any = any>(
   fn: (...args: P) => Promise<V>
): (...args: P) => Promise<V | undefined>
```

### 6. useFullscreen

`useFullscreen`：设置 DOM 元素是否全屏，有的时候，页面信息过多，我们希望去除无关的模块，更好展示所需的模块，就可以使用这个钩子。

确定出入参：这里我们使用 [screenfull](https://github.com/sindresorhus/screenfull) 库进行封装。

参数首先为：target（目标 DOM 元素），其次是进入全屏所触发的方法和退出全屏的方法。

返参提供：当前是否全屏的状态（ isFullscreen ），进入（ enterFullscreen ）/ 退出（ exitFullscreen ）触发的函数，以及是否可全屏的状态（ isEnabled ）即可。

优化手段使用：`useLatest` 和 `useCallback` 即可。

`getTarget` ： 获取 DOM 目标。在 React 中，除了使用 document.getElementById 等，还可以通过 useRef 获取节点信息，所以我们做个兼容：

```ts
import type BasicTarget from "./BasicTarget";
type TargetType = HTMLElement | Element | Window | Document;

const getTarget = <T extends TargetType>(target: BasicTarget<T>) => {
  let targetElement: any;

  if (!target) {
    targetElement = window;
  } else if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
};
export default getTarget;
```

```ts
import screenfull from "screenfull";
import { useLatest, useSafeState } from "..";
import { getTarget } from "../utils";
import type { BasicTarget } from "../utils";
import { useCallback } from "react";

interface Options {
  onEnter?: () => void;
  onExit?: () => void;
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onEnter, onExit } = options || {};

  const [isFullscreen, setIsFullscreen] = useSafeState(false);

  const onExitRef = useLatest(onExit);
  const onEnterRef = useLatest(onEnter);

  const onChange = () => {
    if (screenfull.isEnabled) {
      const ele = getTarget(target);
      if (!screenfull.element) {
        onExitRef.current?.();
        setIsFullscreen(false);
        screenfull.off("change", onChange);
      } else {
        const isFullscreen = screenfull.element === ele;
        if (isFullscreen) {
          onEnterRef.current?.();
        } else {
          onExitRef.current?.();
        }
        setIsFullscreen(isFullscreen);
      }
    }
  };

  const enterFullscreen = useCallback(() => {
    const ele = getTarget(target);
    if (!ele) return;
    if (screenfull.isEnabled) {
      screenfull.request(ele);
      screenfull.on("change", onChange);
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    const ele = getTarget(target);
    if (screenfull.isEnabled && screenfull.element === ele) {
      screenfull.exit();
    }
  }, []);

  return {
    isFullscreen,
    isEnabled: screenfull.isEnabled,
    enterFullscreen,
    exitFullscreen,
  };
};

export default useFullscreen;
```

> 注：这里要注意一点，有些浏览器在点击全屏后，背景会是黑色，而非白色，这是因为浏览器默认全屏没有背景色，所以是黑色，所以此时需要在整个项目下设置颜色，如：

`*:-webkit-full-screen { background: #fff; }`

```ts
const { 
    isFullscreen,
    isEnabled,
    enterFullscreen,
    exitFullscreen } = useFullscreen(target, {
       onEnter?: () => void,
       onExit?: () => void
    });
```

### 7. useCopy

useCopy：用于复制信息，在平常的开发中，为了用户操作方便，会设置复制按钮，将复制好的数据自动回传到选项的值，或是粘贴板，此时这个钩子就派上了用场。

使用：[copy-to-clipboard](https://github.com/sudodoki/copy-to-clipboard) 库。

确定出入参：很明显，这个钩子并不需要入参，出参是复制后的文字，以及触发复制的方法。

```ts
    import writeText from "copy-to-clipboard";
    import { useSafeState } from "..";
    import { useCallback } from "react";

    type copyTextProps = string | undefined;
    type CopyFn = (text: string) => void; // Return success

    const useCopy = (): [copyTextProps, CopyFn] => {
      const [copyText, setCopyText] = useSafeState<copyTextProps>(undefined);

      const copy = useCallback((value?: string | number) => {
        if (!value) return setCopyText("");
        try {
          writeText(value.toString());
          setCopyText(value.toString());
        } catch (err) {
          setCopyText("");
        }
      }, []);

      return [copyText, copy];
    };

    export default useCopy;
```

```ts
    const [copyText, copy] = useCopy();
```

### 8. useTextSelection

`useTextSelection`：实时获取用户当前选取的文本内容及位置。当我们要实时获取用户所选择的文字、位置等，这个钩子会有很好的效果。

确定出入参：

* 入参： 选取文本的范围，可以是指定节点下的文字，当没有指定的节点，应该监听全局的，也就是 document。 
* 出参： 首先是选取的文字，以及文字距离屏幕的间距，除此之外，还有文字本身的宽度和高度。这里推荐使用 window.getSelection() 方法。

getSelection()：表示用户选择的文本范围或光标的当前位置。

如果有值的话，getSelection() 返回的值进行 toString() 则是选取的值，否则为空。

然后使用 selection.getRangeAt(index) 来获取 Range 对象，主要包含选取文本的开始索引（startOffset）和结束索引（endOffset）。

最后通过 Range 的 getBoundingClientRect() 方法获取对应的宽、高、屏幕的距离等信息。

至于监听事件，我们可以利用 useEventListener 去监听对应的鼠标事件：mousedown（鼠标按下）、mouseup（鼠标松开）去完成。

```ts
import useEventListener from "../useEventListener";
import useSafeState from "../useSafeState";
import useLatest from "../useLatest";
import type { BasicTarget } from "../utils";

interface RectProps {
  top: number;
  left: number;
  bottom: number;
  right: number;
  height: number;
  width: number;
}

interface StateProps extends RectProps {
  text: string;
}

const initRect: RectProps = {
  top: NaN,
  left: NaN,
  bottom: NaN,
  right: NaN,
  height: NaN,
  width: NaN,
};

const initState: StateProps = {
  text: "",
  ...initRect,
};

const getRectSelection = (selection: Selection | null): RectProps | {} => {
  const range = selection?.getRangeAt(0);
  if (range) {
    const { height, width, top, left, right, bottom } =
      range.getBoundingClientRect();
    return { height, width, top, left, right, bottom };
  }
  return {};
};

const useTextSelection = (
  target: BasicTarget | Document = document
): StateProps => {
  const [state, setState] = useSafeState(initState);
  const lastRef = useLatest(state);

  useEventListener(
    "mouseup",
    () => {
      if (!window.getSelection) return;
      const select = window.getSelection();
      const text = select?.toString() || "";
      if (text) setState({ ...state, text, ...getRectSelection(select) });
    },
    target
  );

  useEventListener(
    "mousedown",
    () => {
      if (!window.getSelection) return;
      if (lastRef.current.text) setState({ ...initState });
      const select = window.getSelection();
      select?.removeAllRanges();
    },
    target
  );

  return state;
};

export default useTextSelection;
```

```ts
 const state = useTextSelection(target?)
```

### 9. useResponsive

`useResponsive`： 获取相应式信息，当屏幕尺寸发生改变时，返回的尺寸信息不同，换言之，useResponsive 可以获取浏览器窗口的响应式信息。

确定出入参：

入参： 设定屏幕的尺寸范围，这里我们使用栅格布局（bootstrap）的范围，如：

* xs：0px，最小尺寸； 
* sm：576px，设备：平板； 
* md：768px，设备：桌面显示屏； 
* lg：992px，设备：大桌面显示器； 
* xl：1200px 超大屏幕显示器

出参： 尺寸范围是否符合条件，如果符合则为 true，否则为 false。

但这里要注意下，我们默认的入参是栅格的范围，但在真实情况下，入参是允许改变，而出参根据入参的范围而来，所以我们并不知道 useResponsive 具体参数，但可以确定出入参的类型，所以我们需要 Record 的帮助。如：

```ts
// 入参
type ResponsiveConfig = Record<string, number>;

// 出参
type ResponsiveInfo = Record<string, boolean>;
```

解决了 ts 问题后，再来看看另一个问题，对于整个系统而言，所有的布局应该相同，如果把入参放入 useResponsive 中，那么每次调用 useResponsive 都要进行配置，那样会很麻烦，所以我们把入参提取出来，再额外封装个方法，用来设置 responsiveConfig。

最后，我们用 useEventListener 来监听尺寸即可。

代码演示：

```ts
import useSafeState from "../useSafeState";
import useEventListener from "../useEventListener";
import isBrowser from "../utils/isBrowser";

type ResponsiveConfig = Record<string, number>;
type ResponsiveInfo = Record<string, boolean>;

// bootstrap 对应的四种尺寸
let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

let info: ResponsiveInfo = {};

export const configResponsive = (config: ResponsiveConfig) => {
  responsiveConfig = config;
};

const clac = () => {
  const width = window.innerWidth;
  const newInfo = {} as ResponsiveInfo;
  let shouldUpdate = false;
  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width >= responsiveConfig[key];
    // 如果发生改变，则出发更新
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true;
    }
  }
  if (shouldUpdate) {
    info = newInfo;
  }
  return {
    shouldUpdate,
    info,
  };
};

const useResponsive = () => {
  if (isBrowser) {
    clac();
  }

  const [state, setState] = useSafeState<ResponsiveInfo>(() => clac().info);

  useEventListener("resize", () => {
    const res = clac();
    if (res.shouldUpdate) setState(res.info);
  });

  return state;
};

export default useResponsive;
```

在这里我们简单做个处理，用 shouldUpdate 来判断是否更新 info，如果 newInfo 和 info 不等，则证明需要更新视图，防止视图不断刷新。

```ts
 // 配置
 configResponsive({
   small: 0,
   middle: 800,
   large: 1200,
 });

 // 使用
 const responsive = useResponsive();
```

### 10. useTrackedEffect

useTrackedEffect： 可监听 useEffect 中的 deps 中的那个发生变化，用法与 useEffect 基本一致。

我们都知道， useEffect 可以监听 deps 的变化，而触发对应的函数，但如果变量值存在多个值时， useEffect 并无法监听是哪个 deps 发生了改变。

如：useEffect 同时监听了 A 和 B，我们想要的效果是 A 改变触发对应的函数，B 改变触发对应的函数，A 和 B 共同触发一个函数，针对这种情况，使用 useEffect 就会变得很麻烦，而 useTrackedEffect 可以完美地解决这个问题，并且还会记录上次的值，方便我们更好地操作。

确定出入参：useTrackedEffect 的结构应该与 useEffect 的结构保持一致，所以并不存在出参，只需要涉及入参即可。


入参参数：

1. effect：对应 useEffect 的第一个参数，执行函数；
2. deps：对应 useEffect 的第二个参数，发生改变的函数依赖；
3. type_list：增加第三个参数，对应 deps 的名称，注意，要和 deps 一一对应，否则结果会有所差异。

确定完入参，那么 useTrackedEffect 中的第一个参数 effect 应该返回哪些信息呢，一起来看看：

1. changes：改变对应 deps 的索引，通过索引去判断哪个 deps 发生改变； 
2. previousDeps：上一次改变的 deps 值； 
3. currentDeps：改变后的 deps 值； 
4. type_changes：改变对应 deps 的索引，不过对应于中文，而非索引。

```ts
import type { DependencyList } from "react";
import { useEffect, useRef } from "react";

type Effect = (
  changes?: number[], // 改变的 deps 参数
  previousDeps?: DependencyList, // 上一次的 deps 集合
  currentDeps?: DependencyList, // 本次最新的 deps 集合
  type_changes?: string[] // 返回匹配的字段名
) => void | (() => void);

// 判断改变的effect
const onChangeEffect = (deps1?: DependencyList, deps2?: DependencyList) => {
  if (deps1) {
    return deps1
      .map((_, index) =>
        !Object.is(deps1[index], deps2?.[index]) ? index : -1
      )
      .filter((v) => v !== -1);
  } else if (deps2) {
    return deps2.map((_, index) => index);
  } else return [];
};

const useTrackedEffect = (
  effect: Effect,
  deps?: DependencyList,
  type_list?: string[]
) => {
  const previousDepsRef = useRef<DependencyList>();

  useEffect(() => {
    const changes = onChangeEffect(previousDepsRef.current, deps);
    const previousDeps = previousDepsRef.current;
    previousDepsRef.current = deps;
    const type_changes = (type_list || []).filter((_, index) =>
      changes.includes(index)
    );
    return effect(changes, previousDeps, deps, type_changes);
  }, deps);
};

export default useTrackedEffect;
```

这里有个关键点是：`onChangeEffect` 函数，用来判断哪一个 `deps` 发生改变，`deps1` 为旧的 `deps`， `deps2` 为新的 `deps`，但要注意，`deps1` 和 `deps2` 应该一一对应，总共分为三种情况。

1. dep1 不存在：第一次，改变的应该是 deps2，所以改动点为 deps2 的索引； 
2. dep1 存在：说明存在旧值，然后依次比较 dep1 和 deps2 的值，如果不想等，则更新最新值的索引，想等的话，则返回 -1， 之后再整体过滤一遍不等于 -1 的值，所得到的就是更新的索引； 
3. 特别要注意，useEffect 存在为空数组的情况，说明 dep1 、dep2 都不存在。

```ts
useTrackedEffect(
  effect: (changes: [], previousDeps: [], currentDeps: [], type_changes: [) => (void | (() => void | undefined)),
  deps?: deps,
  type_list?: string[]
)
```

在入参的时候，多加入了一个 type_list，其实这个加不加并没有多大的必要，毕竟我们可以通过索引去判断，没有必要再多设置一个参数去维护。

假设我们不加入 type_list，但我获取的时候仍然想要字段，而不是索引，此时该如何做？

以上述的案例来说，我们可不可以这样更改：

```ts
 useTrackedEffect(() => {           useTrackedEffect(() => {
     ...                      =>     ...
 },[count, count1],                 },[{count}, {count1}],
```

我们把 deps 变成对象，这样我们就可以拿到对应的名称和值，也不需要再去维护一个字段了。

实际上，这种方式确实可以，但这种方式却打破了 useEffect 常用的规则，因为 useTrackedEffect 本来就是 useEffect 的扩展，使用上应该尽量保持一致，对使用者来说并不友好。

其次，我们改变结构，也就意味着 useTrackedEffect 的内部也要将结构转化，而转化的目的仅仅是为了更好的区分，这种行为非常“多此一举”。所以这种行为的价值不大。


