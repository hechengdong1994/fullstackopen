const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(b => b.likes).reduce((sum, item) => sum + item)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favoriteBlog, item) => favoriteBlog.likes > item.likes ? favoriteBlog : item)
}

const mostBlogs = (blogs) => {
    return (Object
        .entries(_.groupBy(blogs, 'author'))
        .map(entry => { return { author: entry[0], blogs: entry[1].length } })
        .sort((a, b) => b.blogs - a.blogs))[0]
}

const mostLikes = (blogs) => {
    return (Object
        .entries(_.groupBy(blogs, 'author'))
        .map(entry => { return { author: entry[0], likes: totalLikes(entry[1]) } })
        .sort((a, b) => b.likes - a.likes))[0]
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
