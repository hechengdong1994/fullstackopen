const { beforeEach, test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')

const Blog = require('../models/blog')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

let authorization

beforeEach(async () => {
    await Blog.deleteMany({})

    const initialBlogs = [
        {
            "title": "Go To Statement Considered Harmful",
            "author": "Edsger W. Dijkstra",
            "url": "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
            "likes": 5
        }
    ]

    await Promise.all(initialBlogs.map(b => new Blog(b)).map(b => b.save()))

    const login = await api
        .post('/api/login')
        .send({ username: 'root', password: 'admin' })

    authorization = 'Bearer ' + JSON.parse(login.text).token
})
after(() => {
    mongoose.connection.close()
})

test('init', () => {
    assert(true)
})

test('blog can be added', async () => {
    const newBlog = {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        "likes": 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', authorization)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const allBlogs = await api.get('/api/blogs')
    assert.strictEqual(allBlogs.body.length, 2)
})

test('blog without likes can be added', async () => {
    const newBlog = {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf"
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', authorization)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    assert.strictEqual(response.body.likes, 0)
})

test('blog without title or url can not be added', async () => {
    const newBlog = {
        "author": "Edsger W. Dijkstra"
    }

    await api
        .post('/api/blogs')
        .set('Authorization', authorization)
        .send(newBlog)
        .expect(400)
        .expect({ 'error': 'Blog validation failed: url: Path `url` is required., title: Path `title` is required.' })
})

// test('blog can be deleted', async () => {
//     const response = await api.get('/api/blogs')
//     const id = response.body[0].id

//     await api
//         .delete(`/api/blogs/${id}`)
//         .set('Authorization', authorization)
//         .expect(204)
// })

test('blog can be updated', async () => {
    const newBlog = {
        "title": "new title",
        "author": "new author",
        "url": "new url",
        "likes": 6
    }
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    const updatedBlogResponse = await api
        .put(`/api/blogs/${id}/likes`)
        .send(newBlog)
        .expect(200)
    const updatedBlog = updatedBlogResponse.body

    delete updatedBlog.id

    assert.deepStrictEqual(updatedBlog, newBlog)
})


test('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect("Content-Type", /application\/json/)

    assert.strictEqual(response.body.length, 1)
})

test('blogs are returned with id field', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect("Content-Type", /application\/json/)

    assert(response.body[0].id)
})