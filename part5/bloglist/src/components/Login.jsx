import { useState } from 'react'

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState(null)

  return (
    <div>
      <h2>log in to application</h2>
      {message ? (<div>{message}</div>) : null}
      <form onSubmit={async (e) => {
        e.preventDefault()
        try {
          await onSubmit(username, password)
        } catch (exception) {
          setMessage('wrong username or password')
          setTimeout(() => {
            setMessage(null)
          }, 3000);
        }
      }}>
        <div>
          username
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          password
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login 