import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  // const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)

  useEffect(() => refreshBlogs(), [])

  useEffect(() => {
    const loginedJSON = window.localStorage.getItem('loginedBlogUser')
    if (loginedJSON) {
      const logined = JSON.parse(loginedJSON)
      setUser(logined.username)
      // setToken(logined.token)
    }
  }, [])

  const refreshBlogs = async () => setBlogs(await blogService.getAll())

  const createBlog = async (blog) => {
    const newBlog = await blogService.create(blog)
    await refreshBlogs()
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    await refreshBlogs()
  }

  const likeBlog = async (id) => {
    await blogService.like(id)
    await refreshBlogs()
  }

  const onLoginSubmit = async (username, password) => {
    const logined = await loginService.login({ username, password })
    window.localStorage.setItem('loginedBlogUser', JSON.stringify(logined))
    setUser(logined.username)
    // setToken(logined.token)
  }

  const onLogoutSubmit = () => {
    window.localStorage.removeItem('loginedBlogUser')
    setUser(null)
    // setToken(null)
  }

  if (user === null) {
    return (
      <Login
        onSubmit={(username, password) => onLoginSubmit(username, password)}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message ? (<div>{message}</div>) : null}
      <div>
        {user} logged in
        <button type='button' onClick={onLogoutSubmit}>logout</button>
      </div>
      <Togglable message='new note'>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App