#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOs 系统下还需要修改此文件的读写权限为 755， 具体就是通过 chmod 755 cli.js 实现修改  （sudo chmod -R 755 文件名称 ）

/**
 * 脚手架的工作过程
 * 1、通过命令行交互询问用户问题
 * 2、根据用户回答的结果生成相应的文件
 * */ 
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Project name?'
}])
.then(anwsers => {
    // 根据用户的回答生成相应的文件

    // 模版目录
    const tempDir = path.join(__dirname, 'templates')

    // 目标目录
    const destDir = process.cwd()

    // 将模版下的文件全部转换到目标目录
    fs.readdir(tempDir, (err, files) => {
        if (err) throw err
        // 遍历每一个文件
        files.forEach(file => {
            // 通过模版引擎渲染文件
            // 第一个是文件绝对路径，第二个是输入的结果，第三个是回调函数
            ejs.renderFile(path.join(tempDir, file), anwsers, (err, result) => {
                if(err) throw err 
                // 将结果写入到目标目录
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})