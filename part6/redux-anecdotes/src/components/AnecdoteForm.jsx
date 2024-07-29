import { useDispatch } from 'react-redux'
import { doCreate } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (anecdote) => {
    console.log('create')
    dispatch(doCreate(anecdote))
  }

  const onSubmitCreate = (e) => {
    e.preventDefault()
    create(e.target.anecdote.value)
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