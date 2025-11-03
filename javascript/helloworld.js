#! /usr/bin/env node
console.log('hello world')

const key = '你好'
var keyReg = eval('/^' + key + '$/g')
console.log(keyReg) // /^你好$/g

/**
 * js 代码混淆工具 javascript-obfuscator
 * 1.安装：npm install javascript-obfuscator -g
 * 2.查看版本号：javascript-obfuscator -v
 * 3.默认不使用参数混淆加密：javascript-obfuscator input.js --output output.js
 * 或者直接加密：javascript-obfuscator helloworld.js // 输出：helloworld-obfuscated.js文件
 */