#!/usr/bin/env node

const inquirer = require("inquirer"); // 图形化接受指令
const commander = require("commander"); // 提供程序指令
const runImage = require("./image.handle");

console.log(runImage);

// 写问题

const initQuestions = [
    {
        type: 'checkbox',
        name: 'channels',
        message: '请选择想要搜索的渠道',
        choices: [
            {
                name: '百度图片',
                value: 'images'
            },
            {
                name: '百度视频',
                value: 'video'
            }
        ]
    },
    {
        type: 'input',
        name: 'keyword',
        message: '请输入想要搜索的关键词'
    },
    {
        type: 'number',
        name: 'counts',
        message: '请输入需要获取的数量, 最小数量30'
    },
]

inquirer.prompt(initQuestions).then(result => {
    const { channels, keyword, counts } = result;

    for (let channel of channels) {
        switch(channel) {
            case 'images': {
                runImage(keyword, counts);
                break
            }
        }
    }
})
