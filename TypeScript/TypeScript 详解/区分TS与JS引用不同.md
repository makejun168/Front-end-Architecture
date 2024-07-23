```ts
let arr: number[] = [1,2,3]
let ro: ReadonlyArray<number> = arr;

ro[0] = 12; // Error - 赋值
ro.push(5); // Error - 增加
ro.length = 500 // Error - 长度
arr = ro // Error - 覆盖
```

