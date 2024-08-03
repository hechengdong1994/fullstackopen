import { useMutation, useQueryClient } from 'react-query'
import anecdoteService from '../services/anecdotes'
import { useContext } from 'react'
import { clearNotification, NotificationContext, setNotification } from '../context/NotificationContext'


const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(anecdoteService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch(setNotification(`anecdote '${data.content}' created`))
      setTimeout(() => notificationDispatch(clearNotification()), 5000)
    },
    onError: (error) => {
      notificationDispatch(setNotification(`anecdote creat error '${error.name}'`))
      setTimeout(() => notificationDispatch(clearNotification()), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
