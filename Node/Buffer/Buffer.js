// const buffer = new ArrayBuffer(8); // 8个字节的内存缓存

// console.log(buffer); // ArrayBuffer { byteLength: 8 }

// const initBuffer = new Int16Array(4)

// console.log(initBuffer); // Int16Array [ 0, 0, 0, 0 ]

// const unit8 = new Uint8Array(2);

// unit8[0] = 42;

// console.log(unit8[0]); // 42
// console.log(unit8.length); // 2

// // 一个字节 等于 8位 8位等于一个字节 所以这里占用了一个字节
// console.log(unit8.BYTES_PER_ELEMENT); 

const arr = new Uint8Array([21, 31])

console.log(arr[1]);

console.log(arr.BYTES_PER_ELEMENT);