import { useSelector, useDispatch } from 'react-redux'
import { doVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(a => state.filter === null ? a : a.content.indexOf(state.filter) !== -1)
      .sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(doVote(anecdote.id))
    dispatch(notify(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(notify(null))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList