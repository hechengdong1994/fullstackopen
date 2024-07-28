let blogs = [
  {
    "id": 10000,
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    "likes": 5
  }
]

const getAll = async () => {
  // 重要！！！
  // 这里不能直接把数组引用返回，而应该返回一个新数组
  // 否则在blogs的state引用会和这个引用关联
  return [...blogs]
}

const create = async (blog) => {
  const result = { id: Date.now(), likes: 0, ...blog }
  blogs.push(result)
  return { ...result }
}

const like = async (id) => {
  blogs.map(blog => blog.id === id ? { likes: ++blog.likes, ...blog } : blog)
}

const deleteBlog = async (id) => {
  blogs = blogs.filter(blog => blog.id !== id)
}

const blogService = { getAll, create, like, deleteBlog }

export default blogService