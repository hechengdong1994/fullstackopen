const usersRouter = require('express').Router()
const User = require('../models/user')
// 安装bcrypt软件包来生成密码散列
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        // Mongoose的连接是通过populate方法完成的
        // 使用populate参数来选择我们想从文档中包含的字段。字段的选择是通过Mongo的语法完成的。
        // Mongoose 的 populate 方法的功能基于这样一个事实：我们已经使用 ref 选项为 Mongoose 模式中的引用定义了“类型”
        // TODO 字段选择不生效，但notes-api中的字段选择生效
        .populate('notes', { content: 1, date: 1 })
    response.json(users)
})

module.exports = usersRouter