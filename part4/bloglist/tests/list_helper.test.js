const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite one', () => {
  const oneBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }


  test('when list has only one blog, equals that', () => {
    const result = listHelper.favoriteBlog(new Array(oneBlog))
    assert.deepStrictEqual(result, oneBlog)
  })
})

describe('most blogs author', () => {
  test('when list has only one author, equals that', () => {
    const blogs = [{
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }]
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 })
  })

  test('when list has many authors, return the correct answer', () => {
    const blogs = [{
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }, {
      title: "Canonical string reduction",
      author: "Robert C. Martin",
      likes: 12
    }]
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 2 })
  })
})

describe('most likes author', () => {
  test('when list has only one author, equals that', () => {
    const blogs = [{
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }]
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 12 })
  })

  test('when list has many authors, return the correct answer', () => {
    const blogs = [{
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }, {
      title: "Canonical string reduction",
      author: "Robert C. Martin",
      likes: 12
    }]
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 24 })
  })
})