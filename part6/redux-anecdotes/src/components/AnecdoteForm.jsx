import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (content) => {
    console.log('create')
    dispatch(createAnecdote(content))
  }

  const onSubmitCreate = (e) => {
    e.preventDefault()
    create(e.target.anecdote.value)
    dispatch(notify(`you create ${e.target.anecdote.value}`, 5000))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmitCreate}>
        <div><input name='anecdote' type='text' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm