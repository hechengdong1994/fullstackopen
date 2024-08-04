import React, { useState } from 'react'
import {
  Routes, Route, Link,
  Navigate,
  useMatch,
  useNavigate
} from 'react-router-dom'

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

// Note组件接收所有的笔记作为propnotes，它可以通过React Router的useParams函数访问url参数（要显示的笔记的id）。
const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const Login = (props) => {
  // 使用了React Router的useNavigate函数。有了这个函数，浏览器的url可以以编程方式改变。
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:<input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  // 路由，或者说在浏览器中基于url的组件的有条件渲染，是通过将组件作为Router组件的子代，也就是在Router标签中使用。
  // BrowserRouter是一个Router，使用HTML5历史API（pushState、replaceState和popState事件）来保持你的UI与URL同步。
  // 通常情况下，当地址栏中的URL发生变化时，浏览器会加载一个新页面。
  // 然而，在HTML5历史API的帮助下，BrowserRouter使我们能够在React应用中使用浏览器地址栏中的URL进行内部 "路由"。
  // 因此，即使地址栏中的URL发生变化，页面的内容也只是使用Javascript进行操作，浏览器不会从服务器上加载新的内容。
  // 使用后退和前进的动作，以及做书签，仍然像在一个传统的网页上那样合乎逻辑。

  // 在Router内部，我们定义了Link，在Link组件的帮助下修改地址栏。
  // 用一个Routes组件来包装要根据网址渲染的组件
  // Routes的作用是渲染第一个路径与浏览器地址栏中的网址相匹配的组件。

  // 如果一个用户没有登录，Users组件就不会被渲染。相反，用户会被使用组件Navigate重定向到登录视图。
  return (
    <div>

      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to='/login'>login</Link>
        }
      </div>

      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />

        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <div>
        <br />
        <em>Note app, Department of Computer Science</em>
      </div>
    </div>

  )
}

export default App