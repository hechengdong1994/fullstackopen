// 应用导入了 Node 的内置 网络服务器 模块。这实际上就是我们在浏览器端代码中已经在做的事情，但语法略有不同。
// import http from 'http'
// Node.js 使用所谓的 CommonJS 模块。
// 其原因是，早在 JavaScript 在语言规范中支持模块之前，Node 生态系统就有了对模块的需求。
// Node 现在也支持使用 ES6 模块，但由于支持还 不是很完善，我们将坚持使用 CommonJS 模块。
// const http = require('http')

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
// 事实上，无论 URL 的后半部分是什么，服务器的工作方式都是一样的。同样，地址 http://localhost:3001/foo/bar 将显示相同的内容。

// npm 中使用的版本管理模式被称为 语义版本管理。
// ^4.17.2 前面的圆点意味着如果项目的依赖关系被更新，所安装的 express 版本将至少是 4.17.2。
// 安装的 express 版本也可以是具有更大的 patch 号（最后一个数字），或者更大的 minor 号（中间的数字）。第一个 major 数字所表示的库的主要版本必须是相同的。
const express = require('express')
const app = express()

const generateId = () => {
    const maxId = notes.length > 0
        // notes.map(n => n.id) 是一个 数组 ，所以它不能直接作为一个参数给 Math.max。
        // 数组可以通过使用 " 三点 "spread 语法 ... 转换为单个数字。
        // 实际上不需要...，该方法可以接收一个数组
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}
// 为了方便地访问数据，我们需要 express json-parser 的帮助，它可以通过命令 app.use(express.json()) 来使用。
app.use(express.json())
app.post('/api/notes', (request, response) => {
    // console.log(request.headers)

    const body = request.body
    if (!body.content) {
        // 注意，调用 return 是至关重要的，因为否则代码会执行到最后，错误的笔记会被保存到应用中。
        return response.status(400).json({
            error: 'content missing'
        })
    }
    // 如果没有 json-parser，body 属性将是未定义的。
    // json-parser 的功能是将请求的 JSON 数据转化为 JavaScript 对象，然后在调用路由处理程序之前将其附加到 request 对象的 body 属性。
    console.log(body)

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => {
        // "triple equals " 比较 === 认为所有不同类型的值默认是不相等的
        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
    })
    console.log(note)
    // 所有的 JavaScript 对象都是 truthy，意味着它们在比较操作中计算为真。然而，undefined 是 falsy，这意味着它将被计算为假。
    if (note) {
        response.json(note)
    } else {
        // 使用 end 方法来响应请求
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// 交互式 node-repl 中完成的。你可以通过在命令行中输入 node 来启动交互式 node-repl。
// 在你写应用代码的时候，这个副本对于测试命令如何工作特别有用。我强烈建议这样做 !

// nodemon 将观察 nodemon 启动时所在目录中的文件，如果有任何文件发生变化，nodemon 将自动重启你的 node 应用
// 用命令将 nodemon 定义为一个 开发依赖项 来安装它。
// npm install --save-dev nodemon
// 开发依赖，指的是只在应用的开发过程中需要的工具，例如用于测试或自动重启应用，如 nodemon。
// 当应用在生产服务器（如 Heroku）上以生产模式运行时，不需要这些开发依赖性。
// 可以像这样用 nodemon 启动我们的应用。
// node_modules/.bin/nodemon index.js
// 现在对应用代码的修改会导致服务器自动重新启动。
// 值得注意的是，即使后端服务器自动重启，浏览器仍然需要手动刷新。这是因为与在 React 中工作时不同，我们没有自动重新加载浏览器所需的 hot reload 功能。
// 在 package.json 文件中为它定义一个专门的 npm 脚本 。
// "dev": "nodemon index.js",
//在脚本中不需要指定 nodemon 的 node/modules/.bin/nodemon 路径，因为 _npm 自动知道从该目录中搜索该文件。
// 我们现在可以用命令在开发模式下启动服务器。
// npm run dev
// 与 start 和 test 脚本不同，我们还必须在命令中加入 run。

// Representational State Transfer，又称 REST，于 2000 年在 Roy Fielding 的 论文 中提出。REST 是一种架构风格，旨在建立可扩展的网络应用。
// 在 RESTful 思想中，单一的东西，如我们应用中的笔记，被称为 资源 。每个资源都有一个相关的 URL，这是资源的唯一地址。
// 一个惯例是通过结合资源类型的名称和资源的唯一标识符来创建资源的唯一地址。