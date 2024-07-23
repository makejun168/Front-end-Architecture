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

* any unknow void

```ts
// any 绕过所有的检测
// 类型检测和编译筛查 全部失效

let anyValue: any = 123;

anyValue = 'anyValue'

// unknow 绕过赋值检测 => 禁止更改传递

let unKnowValue: unknow

unKnowValue = 'null'

let value1: unknow = unKnowValue // OK
let value2: any = unKnowValue // OK
let value3: boolean = unKnowValue // NOK

// void - 声明函数的返回值

function voidFunction(): void {
    console.log('no Return')
}

// never - 声明
function errorFunction(msg: string): never {
    console.log('no return')
    throw new Error
}


function longlongloop(): never {
    while(true) {

    }
}
```

* object | Object | {} - 对象

```ts
// object - 非原始类型
// interface ObjectConstrutor {
//     create(o: object | null): any {

//     }
// }

const proto = {
    a: 1
}

Object.create(proto); // 包含了对象本身 OK

// Object

// Object.prototype 上属性
// interface Object {
//     constructor: Function;
//     toString(): string;
//     valueOf(): Object
// }

// 空对象 {} ，没有成员
const a = {} as A; // 断言 没有 as 的话是不能进行赋值的

a.class = 'es'; //NOK
a.age = 36; //NOK

```

### interface

对行为的抽象，具体行为由类来实现的

```js
interface Class {
    name: string
    time: number
}

let course: Class = {
    name: 'ts',
    time: 2
}

// 只读的
interface Class {
    readonly name: string
    time: number
}

// 任意的
interface Class {
    name: string
    time: number
    [propName: string]: any
}


```

### 交叉类型

```ts
// 合并
interface A {
    x: D
}
interface B {
    x: E
}
interface A {
    x: F
}
interface D {
    d: boolean
}
interface E {
    e: string
}
interface F {
    f: number
}

type ABC = A & B & C

let abc: ABC = {
    x: {
        d: false,
        e: 'class',
        f: 5
    }
}

interface A {
    c: string
    d: string
}

interface B {
    c: string
    d: string
}

type AB = A & B; // c never
```

### 断言 - 类型声明,转换

告知和交流 编译器

```ts
// 尖括号
let anyValue: any = 'hi ts'
let anyLength: number = (<string>anyValue).length; // 阶段性声明

// as 声明
let anyLength: number = (anyValue as string).length; // as 声明

// 非空判断
type ClassTime = () => number;

const start = (classTime: ClassTime | undefined) => {
    let num = classTime!(); // 确定不是为空
}

```

#### 面试题

告知编辑器，运行的时候的是会被赋值的

```ts
const tsClass: number | undefined = undefined
const course: number = tsClass!;

// 使用意义
// 确保使用的时候是正常的
```


### 类型守卫

保障语法的基础上，类型的确认

```ts
interface Teacher {
    name: string;
    courses: string[]
}

interface Student {
    name: string;
    courses: string[]
}

type Class = Teacher | Student;

function startCourse(cls: Class) {
    if ('courses' in cls) {
        // 老师逻辑
    }

    if ('startTime' in cls) {
        // 学生逻辑
    }
}

function startCourse(cls: Class) {
    if (cls instanceof Teacher) {
        // 老师逻辑
    }

    if (cls instanceof Student) {
        // 学生逻辑
    }
}

function startCourse(name: string, score: string | number) {
    if (typeof score === 'number') {
        // 老师逻辑
    }

    if (typeof score === 'string') {
        // 学生逻辑
    }
}
```