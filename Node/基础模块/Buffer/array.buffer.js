// const buf1 = Buffer.alloc(10); // 创建一个 长度是 10，填充位 0 的 buffer

// console.log(buf1);

// const buf1 = Buffer.alloc(10, 1); // 长度为 10 内容为 1

// console.log(buf1);

// const buf2 = Buffer.allocUnsafe(10); // 存在一些旧的数据 fill write 重写 需要重写

// console.log(buf2);


const buf = Buffer.from('How long should I stay dedicated? How long til opportunity meetpreparation', 'ascii')

// console.log(buf);

// console.log(buf.toString('base64'));

const result = buf.toString('base64');

console.log(decodeURIComponent(result));

