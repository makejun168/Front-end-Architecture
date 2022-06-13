![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c12a5fb06c44c67964a421ef067e011~tplv-k3u1fbpfcp-watermark.image?)

## 一. Javascript 继承

#### 原型链继承

父类属性一旦赋值给子类的原型属性，此时属性就 属于子类的共享属性。  
实例化子类的时候，不能向父类传参。

```js
function Game() {
    this.name = "LOL";
    this.skin = ["s"];
}
Game.prototype.getName = function() {
    return this.name;
}
// LOL 类
function LOL() {
    // LOL 继承 Game类
}

LOL.prototype = new Game();
LOL.prototype.constuctor = LOL;
const game1 = new LOL();
const game2 = new LOL();

game1.skin.push("ss");

game2.skin; // ["s", "ss"] 属性被共享了
```

#### 经典继承

```js
function Game() {
    this.name = "LOL";
    this.skin = ["s"];
}

Game.prototype.getName = function() {
    return this.name;
}

// LOL 类
function LOL(arg) {
    // LOL 继承 Game类
    Game.call(this, arg);
}

const game3 = new LOL();
const game4 = new LOL();

// 解决了共享属性的问题
game3.skin.push("ss"); // ['s', "ss"]
game4.skin; // ['s']

// 这里没办法获取到 getName 方法
game3.getName // undefined
```

#### 组合继承

无论什么场景都会调用两次父类构造函数

1. 初始化子类原型时 new的时候
2. 子类构造函数内部call父类的时候

```js
function Game() {
    this.name = "LOL";
    this.skin = ["s"];
}

Game.prototype.getName = function() {
    return this.name;
}

// LOL 类
function LOL(args) {
    // LOL 继承 Game类
    Game.call(this, args); // 这里调用构造函数 1次
}

LOL.prototype = new Game(); // 这里调用构造函数 2次
LOL.prototype.constuctor = LOL;
```

#### 寄生组合继承

利用 Object.create API 避开 new 构造函数执行多一次

```js
function Game() {
    this.name = "LOL";
    this.skin = ["s"];
}

Game.prototype.getName = function() {
    return this.name;
}

// LOL 类
function LOL(args) {
    // LOL 继承 Game类
    Game.call(this, args)
}

LOL.prototype = Object.create(Game.prototype); // create api 避免调用 Object
LOL.prototype.constuctor = LOL;

const game6 = new LOL();
```

#### 多重继承方式

利用 Object.assign 组合多个对象
```js
function Game() {
    this.name = "LOL";
    this.skin = ["s"];
}

Game.prototype.getName = function() {
    return this.name;
}

function Store() {
    this.stop = "steam";
}

Store.prototype.getPlatform = function() {
    return this.shop;
}

// LOL 类
function LOL(args) {
    // LOL 继承 Game类
    Game.call(this, args);
    Store.call(this, args);
}

LOL.prototype = Object.assign(LOL.prototype, Store.prototype); // 通过 assign 方式实现多重继承

LOL.prototype.constuctor = LOL; // 将构造函数属性 指向当前自己

const game6 = new LOL();
```

#### 继承原型图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b1b153689b04902b7b53f0606b2a3ff~tplv-k3u1fbpfcp-watermark.image?)

---

## 二. JavaScript 基础


#### instanceof

* 获取左边参数的 proto，获取右边参数的 prototype
* while 遍历 当前 proto 如果不等于 null，继续将 当前 proto = proto.\__proto\__ 直到 proto 为null 为止
* 如果 proto 等于 prototype 那么返回 true

```js
function myInstanceof (a, b) {
  let proto = Object.getPrototypeOf(a);
  let prototype = b.prototype;
  while(true) {
    if (proto === prototype) {
       return true;
    }
    if (proto === null) {
       return false;
    }
    proto === proto.__proto__;
  }
}
```

#### new 操作符

1. 获取构造函数 通过方法 [].prototype.shirt.apply(arguments) 返回值是构造函数 Constructor
2. 新建空对象 obj = Object.create();
   3 obj.\__proto\__  = Constructor.prototype 将空对象的 proto 指向构造函数原型对象
4. 执行函数 Constructor.apply(obj, 剩余的参数)
5. 直接返回函数执行的结果

```js
function objectFactory() {

    var obj = new Object();
    var Constructor = Array.prototype.shift.call(arguments);
    // 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数 这里是构造函数 是一个函数
   

    obj.__proto__ = Constructor.prototype; // obj 原型指向 构造函数的原型对象
    // 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
    
    var ret = Constructor.apply(obj, arguments); // 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性 这里的 arguments 已经被截取了 第一位
    
    return typeof ret === 'object' ? ret : obj;
};
```


#### Object.create

1. 创建一个方法函数 function F
2. function F的 原型对象 指向传入的 proto
3. 返回 new F() 函数的实例化

```js

//简略版
function myCreate(obj){
    // 新声明一个函数
    function C(){};
    // 将函数的原型指向obj
    C.prototype = obj;
    // 返回这个函数的实力化对象
    return new C()
}

//官方版Polyfill
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject !== 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}
        F.prototype = proto;

        return new F();
    };
}
```

#### Object.assign

1. 保存第一个对象
2. 双层遍历，将对象中所有的Key 存到 第一个目标对象中

```js
Object.assign2 = function(target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    let ret = Object(target) 
    source.forEach(function(obj) {
        if (obj != null) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ret[key] = obj[key]
                }
            }
        }
    })
    return ret
}
```

#### call

1. 获取 上下文作用域 context 如果没有的话，采用 window对象
2. 获取 当前调用call函数的方法，通过this 指针回去到
3. 定义常量Symbol，将方法挂载到 context作用域中
4. 调用方法并且将 除第一个参数后面的参数，放到函数中使用
5. 在 context 对象中 删除 定义的常量Symbol，删除引用
6. 返回函数方法调用的结果

```js
Function.prototype.myCall = function(context, ...args) {
    let target = Symbol(); // 定义一个唯一常量
    let ctx = context || window; // 获取目标的对象
    ctx[target] = this; // 将调用的函数挂载到目标对象中

    args = args ? args : []
    const result = args.length > 0 ? ctx[target](...args) : ctx[target](); // call 传入的参数不是数组
    delete ctx[target];
    return result
}
```

#### apply

1. 获取 上下文作用域 context 如果没有，采用 window
2. 定义常量Symbol，将 当前调用 apply 函数的方法，通过this 挂载到 context作用域中
3. 调用方法并且将 除第一个参数以外的参数，传入函数中调用
   4. 在 context 对象中 删除 定义的常量Symbol，删除引用
5. 返回函数方法调用结果

```js
Function.prototype.myApply = function(context, ...args) {
    let ctx = context || window;
    let target = Symbol(); // 定义一个唯一变量，避免全局污染

    ctx[target] = this; // 将当前的方法挂载到 ctx 作用域中

    const result = args.length > 0 ? ctx[target](...args) : ctx[target](); // 调用方法
    delete ctx[target];
    return result;
}
```

#### bind

1. 获取当前的 上下文作用域 context 如果没有的话 采用 window 对象
2. 获取参数，通过 [].prototype.slice(arguments, 1) 方法 将参数取出，并且获取当前调用方法 fn = this
3. bind 返回一个函数并且支持传入拼接新的参数 利用经典继承实现 fn.apply(context, args.concat(newArgs))
4. 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

```js
Function.prototype.myBind = function (context) {
  let ctx = context || window;
  let args = Array.prototype.slice.call(arguments, 1);
  let fn = this;
  return function newFn(...newArgs) {
    if (this instanceof ctx) {
      return new fn(args, ...newArgs);
    }
  return fn.apply(ctx, args.concat(newArgs))
  }
}
```

#### Promise

其实单单一聊 `Promise` 话就能写很长的篇幅关于，`Promise`。里面很多细节和篇幅，这里就不详细展开聊

```js
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MPromise {
    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];
    _status = undefined;

    constructor(fn) {
        this.status = undefined;
        this.value = undefined;

        try {
            // 直接马上就调用 fn 方法
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (err) {
            this.reject(err); // 直接抛出错误
        }
    }

    resolve(value) {
        if (this.status === PENDING) {
            this.status = FULFILLED;
        }
        this.value = value;
    }

    reject(reason) {
        if (this.status === PENDING) {
            this.status = REJECTED;
        }
        this.reason = reason;
    }

    get status() {
        return this._status;
    }

    set status(newVal) {
        // 直接修改 newValue
        this._status = newVal;
        switch (newVal) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(cb => cb(this.value))
                break;
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(cb => cb(this.reason))
                break;
            }
        }
    }

    isFunction(fn) {
        return typeof fn === 'function'
    }

    then(onFulfilled, onRejected) {
        const realFulfilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
        const realRejectedFn = this.isFunction(onRejected) ? onRejected : (reason) => reason;

        const promise2 = new MPromise((resolve, reject) => {
            const fulfillMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realFulfilledFn(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        this.reject(err);
                    }
                })
            }


            const rejectMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realRejectedFn(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        this.reject(err);
                    }
                })
            }

            switch (this.status) {
                case FULFILLED: {
                    fulfillMicrotask();
                    break;
                }
                case REJECTED: {
                    rejectMicrotask();
                    break;
                }
                case PENDING: {
                    this.FULFILLED_CALLBACK_LIST.push(fulfillMicrotask)
                    this.REJECTED_CALLBACK_LIST.push(rejectMicrotask)
                    break;
                }
            }
        });

        return promise2; // 直接返回 定义好的 新的promise 2
    }

    // 处理 Promise
    resolvePromise(promise, x, resolve, reject) {
        // 判断传入的 传入的 promise 是否 和 x 值完全相同,如果相同的话就报错
        if (promise === x) {
            return new TypeError('Promise and the return value are same');
        }

        // 判断 x 是否属于 MPromise
        if (x instanceof MPromise) {

        }
    }
}
```

#### Promise.all

1. 需要注意调用的是静态方法，静态方法
2. 整体返回的也是一个 Promise 明确总体结构
3. 需要判断当前 传入是否为数组，不是为数组抛出错误
4. 遍历数组，直接将数组中的内容包装为 Promise 方便
5. 最终返回时机，需要计算成功次数，成功次数和传入数组的长度相等的时候，再返回结果

```js
Promise.all = (promiseArray) => {
    return new MPromise(function (resolve, reject) {
        // 判断是否为 数组类型
        if (!Array.isArray(promiseArray)) {
            return reject(new TypeError('arguments must be Array'))
        }
        let result = [];
        let nums = promiseArray.length;
        // 需要 count 来计算 是否已经满足 可以抛出
        let count = 0;
        // 遍历数组
        for (let i = 0; i < nums; i++) {
            // 判断数据类型
            Promise.resolve(promiseArray[i]).then(value => {
                count++;
                result[i] = value;
                if (count === nums) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        }
    })
}
```

#### Promise.race

1. 需要注意调用的是静态方法，静态方法
2. 整体返回的也是一个 Promise 明确总体结构
3. 需要判断当前 传入是否为数组，不是为数组抛出错误
4. 遍历数组，直接将数组中的内容包装为 Promise 方便
5. 最终返回时机，不需要计算成功次数，只返回马上发生的一个 Promise 其他的都不要了

```js
Promise.race = (promiseArray) => {
    return new MPromise(function (resolve, reject) {
        // 判断是否为 数组类型
        if (!Array.isArray(promiseArray)) {
            return reject(new TypeError('arguments must be Array'))
        }
        // 每个都需要执行
        for (let i = 0; i = promiseArray.length; i++) {
            promiseArray[i].then(resolve, reject)
        }
    })
}
```

#### 防抖函数

1. 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
2. 返回的是一个函数
3. 传入，fn和delay 时间 使用定时器实现

```js
// 第三版
function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function() {
            func.apply(context, args)
        }, wait);
    }
}
```

#### 节流函数

1. 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

```js
function throttle(fn, delay) {  
  let timer = null;
  let context = this;
  return (...args) => {
    if (timer) return;
    setTimerout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(context, [...args]);
  }, delay)}
}
```

#### 实现AJAX

1. 可以参考 axios 源码 本质上是创建一个 XML HTTP Request 对象
2. 监听状态的函数，来判断是否已经完成清空，一共是有5个状态
3. 当对象的属性和监听函数设置完成后，最后调用 send 方法来向服务器发送请求

这里是参考 `axios` 源码中的 内容 xhrAdapter 稍微进行简化和修改，可以参考个大概

```js
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {

        var request = new XMLHttpRequest();


        request.open('POST', 'https://baidu.com', true);

        function onloadend() {
            if (!request) {
                return;
            }
            // Prepare the response
            var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
                request.responseText : request.response;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };

            // Clean up request
            request = null;
        }

        if ('onloadend' in request) {
            // Use onloadend if available
            request.onloadend = onloadend;
        } else {
            // Listen for ready state to emulate onloadend
            request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                    return;
                }
                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                    return;
                }
                // readystate handler is calling before onerror or ontimeout handlers,
                // so we should call onloadend on the next 'tick'
                setTimeout(onloadend);
            };
        }

        // Set the request timeout in MS
        request.timeout = 500;

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) {
                return;
            }

            reject('某个错误');

            // Clean up request
            request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject('某个错误');

            // Clean up request
            request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {

            reject('某个错误');

            // Clean up request
            request = null;
        };

        // Send the request
        request.send(requestData);
    });
};
```




#### 深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) {
        return null;
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }

    // 基础数据类型 Boolean Number String undefined
    if (typeof obj !== 'object') {
        return obj;
    }

    // 处理循环引用 如果存在
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    // 获取下面的数据
    const resObj = Array.isArray(obj) ? [] : {};

    hash.set(obj, resObj); // 将原来的obj 作为 key 后面 resObj 作为数据

    // 遍历 深拷贝
    Reflect.ownKeys(obj).forEach(key => {
        // 判断当前 resObj 是否存在 key
        if (!resObj.hasOwnProperty(key)) {
            resObj[key] = deepClone(obj[key], hash); // 这里做递归 多层的数据
        }
    })

    return resObj;
}
```

#### 浅拷贝

```js
let a = {
    a: '1',
    b: 123
}

let b = {...a}; // 浅拷贝
// let b = new Object(a) // 浅拷贝
```

#### 函数柯里化

1. 对比函数的参数和当前传入参数
2. 若参数不够就继续递归返回curry
3. 若参数够就调用函数返回相应的值

```
function curry(fn, ...args) {
  let fnLen = fn.length, argsLen = args.length;
  if(fnLen > argsLen) {
    return function(...arg2s){
      return curry(fn,...args,...arg2s)
    }
  } else{
    return fn(...args)
  }
}
```

---

## 三. 数据处理

### 数组 API

#### reducer

```js
let arr = [1, 2, 3, 4];

Array.prototype.myReduce = function(callback, initialValue) {
    // 判断当前使用的是否为数组，数组是否为空
    let targetArr = Array.prototype.slice.call(this); // 获取当前数组
    let initialValue = initialValue ? initialValue : undefined;
    let result = initialValue; // 返回值
    if (typeof callback !== 'function') {
        throw new TypeError(typeof callback + ' is not a function at Array.reduce')
    }
    // 判断当前数组是否为空 为空而且 初始值为 undefined 则报错
    if (targetArr.length === 0 && !initialValue) {
        throw new TypeError('Reduce of empty array with no initial value at Array.reduce')
    }

    // 开始执行代码
    for (let i = 0; i < targetArr.length; i++) {
        // prevValue 上一个返回的 result 结果
        // 当前的值
        // 当前的下标
        // this 当前的数组
        result = callback.call(this, result, targetArr[i], i, this); // 绑定当前 this 并且执行
    }

    return result;
}

arr.myReduce((prevValue, current, idx, currentArr) => {
    console.log(prevValue);
    console.log(current);
    console.log(idx);
    console.log(currentArr);
    return prevValue + currentArr
});
```

#### filter

```js
Array.prototype.filter = function (func, thisArg) {
     if (!((typeof func === "Function" || typeof func === "function") && this))
        throw new TypeError();

     var len = this.length >>> 0,
        res = new Array(len), // 预先分配的 array
        t = this, // 上下文
        c = 0,
        i = -1; // 索引
        
     if (thisArg === undefined) {
        while (++i !== len) {
           // 判断是否已经设置好 Key
           if (i in this) {
              if (func(t[i], i, t)) {
                 res[c++] = t[i];
              }
           }
        }
     } else {
        while (++i !== len) {
           // 判断是否已经设置好 Key
           if (i in this) {
              if (func.call(thisArg, t[i], i, t)) {
                 res[c++] = t[i];
              }
           }
        }
     }

     res.length = c; // 设置数组的下标
     return res;
};
```

#### map

具体详情看 代码注释 完整版本

1. 首先 `map` 方法是存在 `Array` 原型上的, 两个参数，`callback` & `上下文`
2. 判断是否 当前的上下文 为 `null`
3. 保存数组长度
4. 判断传入的 callback 函数是否 不为一个正常的函数
5. 判断传入的参数是否超过 1 个 超过的话，就保存当前第二个参数作为上下文
6. 定义最后结果的数组，创建一个每个元素为空的数组，和索引
7. 开始进行循环，执行回调函数 callback 函数在 T的上下文中执行 传入当前的值，下标，整个数组
8. 用新的数组中保存返回的 mapValue值
9. 返回数组


```js
Array.prototype.map = function (callback /*, thisArg*/) {
   if (this == null) {
      throw new TypeError("this is null or not defined");
   }
   
   var T, A, k;

   // 设 O 是调用 转化为 对象 传递|this| 上下文 保存当前上下文 是一个数组
   var O = Object(this);

   // 获取数组的长度
   var len = O.length >>> 0;

   // 判断传入的 callback 函数是否 不为一个正常的函数
   if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
   }

   // 判断传入的参数是否超过 1 个
   if (arguments.length > 1) {
      T = arguments[1]; // thisArg 
   }

   // 最后结果的数组，创建一个每个元素为空的数组
   A = new Array(len);

   // 索引 下标
   k = 0;

   // 开始进行循环
   while (k < len) {
      var kValue, mappedValue;

      if (k in O) {
         // 获取 KeyValue 的值 通过数组的索引
         kValue = O[k];

         // 执行回调函数 callback 函数在 T的上下文中执行 传入当前的值，下标，整个数组
         mappedValue = callback.call(T, kValue, k, O);

         // 新的数组中保存
         A[k] = mappedValue;
      }
      // 索引 ++
      k++;
   }

   return A;
};
```

#### forEach

这个和 `Map` 方法相似，只是没有返回一个新的数组函数

```js
Array.prototype.forEach = function (callback, thisArg) {
   var T, k;

   if (this == null) {
      throw new TypeError(" this is null or not defined");
   }

   // 保存当前的数组对象
   var O = Object(this);

   // 保存当前的数组长度
   var len = O.length >>> 0;

   // 判断回调函数是否为 一个函数
   if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
   }

   // 超过一个参数，第二个参数为上下文
   if (arguments.length > 1) {
      T = thisArg;
   }

   // 定义索引
   k = 0;

   // 开始遍历
   while (k < len) {
      var kValue;

      if (k in O) {
         kValue = O[k];

         // 执行回调函数 callback 函数在 T的上下文中执行 传入当前的值，下标，整个数组
         callback.call(T, kValue, k, O);
      }
      // 索引++
      k++;
   }
   // return undefined 不返回
};
```

#### every

```js
Array.prototype.every = function(callbackfn, thisArg) {
    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 保存数组对象
    var O = Object(this);

    // 长度
    var len = O.length >>> 0;

    // 判断回调函数是否为函数
    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }

    // 超过一个参数 第二个为 当前的上下文
    if (arguments.length > 1) {
      T = thisArg;
    }

    // k 为索引
    k = 0;

    // 开始循环
    while (k < len) {

      var kValue;

      if (k in O) {

        // 保存当前 kValue
        kValue = O[k];
        
        // 执行回调函数 获取回调函数的返回值
        var testResult = callbackfn.call(T, kValue, k, O);

        // 如果值为 false 直接返回
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    // 每个 返回结果都为真 那就返回 true
    return true;
};
```

#### includes

```js
Object.defineProperty(Array.prototype, 'includes', {
    value: function(valueToFind, fromIndex) {
      // 传入 当前的上下文判断是否为空
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 保存当前的数组对象
      var o = Object(this);

      // 保存当前的数组长度
      var len = o.length >>> 0;

      // 如果为空数组，直接返回 false
      if (len === 0) {
        return false;
      }

      // 开始的索引
      var n = fromIndex | 0;

      // 处理索引的值，有可能是 负数
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 比较两个元素是否相同 针对 NaN 进行兼容0
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      
      // 开始遍历
      while (k < len) {
        if (sameValueZero(o[k], valueToFind)) {
          return true; // 如果相同直接返回为 true
        }
        
        k++;
      }

      return false;
    }
  });
```

#### flat

用 reduce 实现 flat

```js
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]


//用reduce实现
function fn(arr){
   return arr.reduce((prev,cur)=>{
      return prev.concat(Array.isArray(cur)?fn(cur):cur)
   },[])
}
```

#### flatMap

```js
var arr = [1, 2, 3, 4];

arr.flatMap(x => [x, x * 2]);
// is equivalent to
arr.reduce((acc, x) => acc.concat([x, x * 2]), []);
// [1, 2, 2, 4, 3, 6, 4, 8]
```

--- 

#### 解析 URL Params 对象

用到正则匹配和数组API值的拆分

```js
function parseParam(url) {
    const str = /.+\?(.+)$/.exec(url)[1];
    const arr = str.split('&'); // 将字符串拆分为数组
    const result = {};
    for (let item of arr) {
        if (/=/.test(item)) {
            let [key, value] = item.split('=')
            val = decideURIComponent(val); // 解码
            val = /^\d+$/.test(val) > parseFloat(val) : val; // 数字转数字
            if (result.hasOwnProperty(key)) { // 判断是否为数字
                result[key] = [].concat(result[key], val)
            } else {
                result[key] = val;
            }
        } else {
            result[key] = val;
        }
    }
    return result;
}
```

#### 数组去重

Set 实现

```js
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]
```

这里用 for 实现的效果

```js
var array3 = [1, 1, 'a', 'A', 2, 2];

// iteratee 英文释义：迭代 重复
function unique(array, isSorted, iteratee) {
    var res = [];
    var seen = [];

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted) {
            if (!i || seen !== computed) {
                res.push(value)
            }
            seen = computed;
        }
        else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        }
        else if (res.indexOf(value) === -1) {
            res.push(value);
        }        
    }
    return res;
}

console.log(unique(array3, false, function(item){
    return typeof item == 'string' ? item.toLowerCase() : item
})); // [1, "a", 2]
```

#### 数组元素求和

```js
let arr = [1,2,3,4,5,6,7,8,9,10];
let sum = arr.reduce( (total,i) => total += i, 0);
```

#### 数组乱序

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (var i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}

console.log(arr)
```

#### 交换 a 和 b 的值

```js
var a = 1;
var b = 2;

a ^= b
b ^= a
a ^= b

console.log(a); // 2
console.log(b); // 1
```

#### 字符串翻转

```js
String.prototype._reverse = function(a){ return a.split("").reverse().join(""); }
```

#### repeat

```js
function repeat(s, n) { return (new Array(n + 1)).join(s); }
```

---

## 四. 常见业务场景

#### 类型判断函数

1. typeof

typeof 能检测出六种类型的值，但是，除此之外 Object 下还有很多细分的类型呐，如 Array、Function、Date、RegExp、Error 等。

```js
var date = new Date();
var error = new Error();
console.log(typeof date); // object
console.log(typeof error); // object
```

2. Object.prototype.toString

我们需要知道 toString 方法执行的本质过程

当 toString 方法被调用的时候，下面的步骤会被执行：

1.  如果 this 值是 undefined，就返回 [object Undefined]
1.  如果 this 的值是 null，就返回 [object Null]
1.  让 O 成为 ToObject(this) 的结果
1.  让 class 成为 O 的内部属性 [[Class]] 的值
1.  最后返回由 "[object " 和 class 和 "]" 三个部分组成的字符串


总共是有 14 种

```js
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

function a() {
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}

```

3. 模拟实现的 Object.prototype.toString 实现

```js
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
    if (obj == null) {
        return obj + ""; // 这一步是 很牛的操作
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}

console.log(type(/da/)); // regexp
```


#### 惰性函数

```js
var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
};
```

#### EventBus 实现

超高频的题目，必看必会

```js
class EventEmitter {
  constructor() {
    this.events = {}; // 存放事件的列表
  }

  // 监听事件
  on(event, fn) {
    // 判断当前的事件管理中是否存在当前
    if (!this.events[event]) {
      this.events[event] = []; // 值为 空数组
    }
    this.events[event].push(fn);

    return this;
  }

  // 触发事件
  emit(event, ...args) {

    const cbs = this.events[event];

    if (!cbs) {
      console.log('当前事件没有被注册')
      return this
    }

    cbs.forEach(cb => cb.apply(this, args))
     
    return this;
  }

  // 移除事件监听
  off(event, cb) {
    const currentCbs = this.events[event]
    this.events[event] = currentCbs.filter(fn => fn && fn !== cb);

    return this;
  }

  // 只监听一次事件
  once(event, fn) {
    let func = (...args) => {
      this.off(event, fn);
      fn.apply(this, [args]);
    }
    this.on(event, func);
    return this;
  }
}

const event = new EventEmitter();

const fn = (data) => {
    console.log(data)
}

event.on('msg', fn)

event.emit('msg', 11111); // 触发监听事件 同步遍历 111
event.off('msg', fn); // 删除了 这个监听事件
event.emit('msg', 11111); // 触发监听事件 同步遍历 111 这里就没有 产生数据了
console.log(2222); // 222
```

#### sleep 函数

```js
// async await
async function wait(time){
  await sleep2(time);
  fun();
}

wait(3000);
```

#### jsonp

1. 返回的是一个 Promise
2. 处理传入的参数 url 和 data 遍历 data 中全部数据 以keyValue的方式拼接到 ？ 后面
3. 定义 Symbol 类型变量，用作 window callbackName
4. 利用 script 标签不受同源域名限制的特点 将完整的 url 拼接数据 请求
5. 请求成功 通过 Promise resolve 方法返回 数据接口的数据
6. 删除  window[symbolCb], document.body.removeChild(node)

```js
function myJsonp(options) {
    return new Promise((resolve, reject) => {
        //判断是否是第一次jsonp请求
        if (!window.jsonpNum) {
            window.jsonpNum = 1
        } else {
            window.jsonpNum++
        }

        let {
            url,
            data,
            timeout = 5000,
            cbkey = 'callback',
        } = options

        //保证每次请求接收的方法都不会重复
        let funName = 'jsonpReceive' + window.jsonpNum

        //清除本次jsonp请求产生的一些无用东西
        function clear() {
            window[funName] = null
            script.parentNode.removeChild(script);
            clearTimeout(timer)
        }

        //定义jsonp接收函数
        window[funName] = function(res) {
            //一旦函数执行了，就等于说请求成功了
            resolve(res)
            clear()
        }

        //请求超时计时器
        let timer = setTimeout(() => {
            reject('超时了')
            clear()
        }, timeout)

        //定义请求的参数
        let params = ''

        //如果有参数
        if (Object.keys(data).length) {
            for (let key in data) {
                params += `&${key}=${encodeURIComponent(data[key])}`;
            }

            params = params.substr(1)
        }

        //拼接最终的请求路径，结尾拼接回调的方法名
        url = url + '?' + params + `&${cbkey}=${funName}`

        let script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    })
}
```

#### 每隔一秒打印数字

```js
function printNum() {
    for(var i = 0; i < arr.length; i++) {
      (function(i) {
        setTimeout(() => console.log(i), 1000 * i)
      })(i)
    }
} 
```

#### 循环打印红绿灯

```js
class TrafficLight {
    constructor(name) {
        this.name = name;
    }

    red() {
        console.log('red');
    }

    yellow() {
        console.log('yellow');
    }

    green() {
        console.log('green');
    }
}

const traffic = new TrafficLight(); // 交通灯功能

// 具体实现的方法是 睡眠方法更新
const sleep = async (delay) => {
    let start = new Date().getTime();
    while (new Date().getTime() - start < delay) {
        continue
    }
}

// 主进程功能
async function Main() {
    while (true) {
        // 3 秒 红灯
        await sleep(3000);
        traffic.red();
        // 1 秒 黄灯
        await sleep(1000);
        traffic.yellow();

        // 3 秒 绿灯 循环往复
        await sleep(3000);
        traffic.green();

        continue;
    }
}

Main();
```

#### 实现观察者模式

```js
class Subject {
    constructor(name) {
        this.name = name;
        this.state = 'ok';
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer)
    }

    getState() {
        return this.state;
    }

    // 更新的时候 更新全部的观察者的 方法
    setState(state) {
        this.state = state;
        this.notifyAllObserves();
    }

    // 更新的时候 更新全部的观察者的 方法
    notifyAllObserves() {
        let obs = this.observers || [];
        obs.forEach(observer => {
            observer.update(); // 调用通知 观察者 全部更新
        })
    }
}


// 观察者 可以有多个
class Observer {
    constructor(name, center) {
        this.name = name;
        this.center = center;
        this.center.attach(this);
    }

    update() {
        console.log(`${this.name} 在观察更新，最新的值是 ${this.center.getState()}`);
    }
}

const s1 = new Subject('s1');

const o1 = new Observer('kobe', s1);
const o2 = new Observer('polo', s1);

s1.setState('success');
```

#### 使用 setTimeout 实现 setInterval

```js
function myInterval(fn, timeout) {
    // 控制器，控制定时器是否继续执行
    var timer = {
        flag: true
    };
    // 设置递归函数，模拟定时器执行。
    function interval() {
        if (timer.flag) {
            fn();
            setTimeout(interval, timeout);
        }
    }
    // 启动定时器
    setTimeout(interval, timeout);
    // 返回控制器
    return timer;
}
```

#### Vue2 双向数据绑定

Vue2 是响应式原理基于 Object.defineProperty 方法重定义对象的 getter
与 setter，vue3 则基于 Proxy 代理对象，拦截对象属性的访问与赋值过程。差异在于，前
者并不能对诸如数组长度变化、增删元素操作、对象新增属性进行感知，在 vue 层面不得不
重写一些数组方法（push、pop、unshift、shift 等），动态添加响应式属性，也要使用 $set
方法等。而 Proxy 则完美地从根上解决了这些问题，不过对于不支持 Proxy 对象的浏览器（如
IE），如果要使用 vue3 依然要进行降级兼容

```js
// 假设我们在 data 函数中返回的数据为 initData
const initData = { value: 1 };

// 基于 initData 创建响应式对象 data
const data = {};

Object.keys(initData).forEach(key => {
    Object.defineProperty(data, key, {
        get() {
            // 此处依赖收集
            console.log('访问了', key);
            return initData[key];
        },
        set(v) {
            // 此处执行回调更新
            console.log('访问了', key);
            initData[key] = v;
        }
    });
});
```


#### Vue3 双向数据绑定


```js
const initData = { value: 1 };// 基于 initData 创建响应式对象 data


const proxy = new Proxy(initData,
    {
        get(target, key) {
        // 此处依赖收集 
        console.log('访问了', key); 
        return target[key];
    },
    set(target, key, value) {
        // 此处执行回调更新 
        console.log('修改了', key); 
        return Reflect.set(target, key, value);
    }
}); // Proxy 可以观测到动态添加的属性
```


