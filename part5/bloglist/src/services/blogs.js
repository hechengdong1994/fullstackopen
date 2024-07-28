const blogs = [
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
  blogs.push(blog)
  return {...blog}
}

export default { getAll, create }