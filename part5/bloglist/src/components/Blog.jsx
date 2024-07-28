import { useState } from "react"

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [detail, setDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const switchDetail = () => setDetail(!detail)

  const onClickLike = () => {
    likeBlog(blog.id)
  }

  const onClickDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  if (detail) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} <button onClick={switchDetail}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} <button onClick={onClickLike}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          <button onClick={onClickDelete}>remove</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={switchDetail}>view</button>
      </div>
    )
  }
}

export default Blog