// 所有的路由都是为路由器对象定义的
// 一个路由器对象是一个孤立的中间件和路由实例。你可以把它看作是一个 "小型应用"，只能够执行中间件和路由功能。每个Express应用都有一个内置的应用路由器。
// 路由器实际上是一个中间件，它可以用来在一个地方定义 "相关的路由"，它通常被放在自己的模块中。
const notesRouter = require('express').Router()
const Note = require('../models/note')

// notesRouter.get('/', (request, response) => {
//     Note.find({}).then(notes => {
//         response.json(notes)
//     })
// })
notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    // 使用 async/await 时，处理异常的推荐方式是古老而熟悉的 try/catch 机制。
    try {
        const savedNote = await note.save()
        response.status(201).json(savedNote)
    } catch (exception) {
        next(exception)
    }
})

// notesRouter.delete('/:id', async (request, response, next) => {
//     try {
//         await Note.findByIdAndDelete(request.params.id)
//         response.status(204).end()
//     } catch (exception) {
//         next(exception)
//     }
// })
// 引入express-async-errors后
// 因为有了这个库，我们不再需要next(exception)的调用。
// 库处理了引擎盖下的一切。如果在async路由中发生异常，执行会自动传递给错误处理中间件。
notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter