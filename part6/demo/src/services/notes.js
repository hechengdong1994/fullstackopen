const setToken = newToken => {
}

let blogs = [
  {
    id: 10000,
    content: 'This note is not saved to server',
    important: true
  }
]

const getAll = async () => {
  return blogs
}

const createNew = async (content) => {
  const object = { content, important: false, id: Date.now() }
  blogs = [...blogs, object]
  return object
}

const update = async (id, newObject) => {
  const data = { ...newObject, id: id }
  blogs = blogs.map(blog => blog.id === id ? data : blog)
  return data
}

export default { getAll, createNew, update, setToken }