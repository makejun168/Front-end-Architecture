当在浏览器端使用 POST 请求上传图片和其他字段时，请求头（headers）通常会包含以下重要的信息：

1. **Content-Type**：这是请求体的类型，对于文件上传，通常为 `multipart/form-data`。这告诉服务器请求体的内容将采用多部分表单数据的形式。

2. **Content-Length**：这是请求体的长度，以字节为单位，用于服务器读取请求体的数据。

3. **Content-Disposition**：这个头部字段通常用于指示服务器如何处理请求体中的文件。它通常包含一个 `form-data` 参数，以及 `name` 和 `filename` 参数，用于指定字段名称和文件名。

   例如，对于一个包含上传文件和其他字段的表单，HTTP 请求头可能如下所示：

   ```http
   POST /upload HTTP/1.1
   Host: example.com
   Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryABC123
   Content-Length: 12345
   ```

在 Koa 中，如果你不使用 `body-parser` 中间件，你可以手动解析这种类型的请求体。以下是一个简单的示例，演示如何手动解析 `multipart/form-data` 请求体：

```javascript
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.request.is('multipart/form-data')) {
    // 获取表单数据和文件上传信息
    const { fields, files } = await koaBody({ multipart: true })(ctx);
    
    // 打印表单字段
    console.log('表单字段：', fields);

    // 处理上传的文件
    for (const file of Object.values(files)) {
      const { path, name, type } = file;
      // 保存文件到服务器或进行其他操作
      fs.renameSync(path, `uploads/${name}`);
      console.log(`上传的文件名：${name}, 类型：${type}`);
    }
  }
  
  await next();
});

app.listen(3000);
```

在这个示例中，我们首先使用 `koa-body` 中间件来处理 `multipart/form-data` 类型的请求体。然后，我们可以从 `fields` 对象中获取表单字段的数据，并从 `files` 对象中获取上传的文件信息。最后，我们可以将文件保存到服务器或进行其他操作。

请注意，这只是一个简单的示例，实际应用中可能需要更多的错误处理和验证来确保上传的数据是有效的。