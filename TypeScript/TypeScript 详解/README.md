## TypeScript 详解

### TS 基础概念

a. 对比原理
* JS的超集，在原有的基础上，添加

可选静态类型
基于类的面向对象编程

1. 编写项目 - 更加利于架构的维护
2. 自主检测 - 编译期间检测
3. 类型检测 - 动态和静态类型检测
4. 运行流程 - 依赖编译
5. 复杂特性 - 模块化，泛型，接口
6. 

### 2. TS基础类型与写法

* boolean string number array null undefined

```ts
// es
let isEnabled = true
let class = 'ts'
let classNum = 2
let classArr = ['basis', 'execute']

// ts
let isEnabled: boolean = true
let class: string = 'ts'
let classNum: number = 2
let classArr: string[] = ['basis', 'execute']
let classArr2: Array<string> = ['basis', 'execute']
```

* tuple 元祖

数组搭配比较多样

```ts
let tupleType: [string, boolean]
tupleType = ['ts', true]
```

* enum 枚举

```ts
// 数字类枚举 从 0 开始 依次递增的
enum Score {
    BAD,
    NG,
    GOOD,
    PERFECT
}

let score: Score = Score.BAD // 0

// 字符串枚举
enum Score {
    BAD = 'BAD',
    NG = 'NG',
    GOOD = 'GOOD',
    PERFECT = 'PERFECT'
}

let score: Score = Score.BAD // BAD

// 反向映射
enum Score {
    BAD,
    NG,
    GOOD,
    PERFECT
}
let scoreName = Score[0]; // 'BAD'
let scoreName = Score['BAD']; // '0'

// 异构
// 字符串 依次 
enum Score {
    A, // 0
    B, // 1
    C = 'C',
    D = 'D',
    E = 6
    F // 7
}


```



