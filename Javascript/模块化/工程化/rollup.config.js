// #!/usr/bin/env node

module.exports = {
    input: "./src/index.js",
    output: [
        {
            dir: './dist/cjs',
            // file: './dist/index-cjs.js',
            format: 'cjs'
        },
        {
            dir: './dist/amd',
            // file: './dist/index-amd.js',
            format: 'amd'
        },
        {
            dir: './dist/esm',
            // file: './dist/index-esm.js',
            format: 'es'
        },
        // 不支持 code split
        // {
        //     dir: './dist/iife',
        //     // file: './dist/index-iife.js',
        //     format: 'iife'
        // },
        // {
        //     dir: './dist/umd',
        //     // file: './dist/index-umd.js',
        //     format: 'umd',
        //     name: 'res'
        // },
    ]
}
