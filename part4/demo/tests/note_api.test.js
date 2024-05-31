const { test, after, beforeEach } = require('node:test')
const Note = require('../models/note')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

// 如果服务器还没有监听连接，那么它就会为你绑定一个短暂的端口，所以不需要跟踪端口。
// 换句话说，supertest注意到被测试的应用是在它内部使用的端口启动的。
const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    console.log('cleared')
    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()
    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()

    // forEach循环的每个迭代都会产生自己的异步操作，而 beforeEach 不会等待它们执行完毕。
    // 换句话说，在 forEach 循环内部定义的 await 命令不在 beforeEach 函数中，而是在 beforeEach 不会等待的独立函数中。
    // helper.initialNotes.forEach(async (note)=>{
    //     let noteObject = new Note(note)
    //     await noteObject.save()
    //     console.log('saved')
    // })

    // 解决这个问题的一个方法是用Promise.all方法来等待所有的异步操作执行完毕。
    // Promise.all方法可用于将 promise 数组转换为单个 promise，一旦解析作为参数传递给它的数组中的每个 promise，该 promise 就会被 fulfilled。
    // 最后一行代码await Promise.all(promiseArray)等待每个 promise 完成
    // 使用 Promise.all 方法时，数组中每个 promise 的返回值仍然可以被访问。
    // const noteObjects = helper.initialNotes
    //     .map(note => new Note(note))
    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray)

    // Promise.all以并行方式执行它收到的promise。如果这些promise需要以特定的顺序执行，这将是有问题的。
    // 在这样的情况下，可以在for...of块内执行操作，这样可以保证一个特定的执行顺序。
    for (let note of helper.initialNotes) {
        let noteObject = new Note(note)
        await noteObject.save()
    }

    console.log('done')
})
after(async () => {
    await mongoose.connection.close()
})


test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
    const contents = notesAtEnd.map(n => n.content)
    assert(contents.includes(newNote.content))
})
test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const notesAtEnd = await helper.notesInDb()
    // strictEqual 使用方法 Object.is 来比较相似性，即它比较对象是否相同。
    // 在我们的例子中，检查对象的內容（即其字段的值）是否相同就足够了。为此，deepStrictEqual 是合适的。
    assert.deepStrictEqual(notesAtEnd.length, helper.initialNotes.length)
})


test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const notesAtEnd = await helper.notesInDb()

    const contents = notesAtEnd.map(r => r.content)
    assert(!contents.includes(noteToDelete.content))

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})


test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
})


test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/) //正则表达式。regex 以斜杠/开始和结束。
})
test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
})
test('the first note is about HTTP methods', async () => {
    // 使用async/await语法的好处开始变得明显了。
    // 通常情况下，我们必须使用回调函数来访问由 promise 返回的数据，但有了新的语法，事情就好办多了。
    const response = await api.get('/api/notes')

    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    const contents = response.body.map(e => e.content)
    // assert.strictEqual(contents.includes('HTML is easy'), true)
    assert(contents.includes('HTML is easy'))
})
