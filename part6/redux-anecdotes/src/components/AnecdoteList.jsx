import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes =
    useSelector(state => state.anecdotes)
    // 其他操作放在useSelector外部执行，避免console提示
    // elector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.
      .filter(a => filter === null || filter === '' ? a : a.content.indexOf(filter) !== -1)
      .sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(vote(anecdote.id))
    dispatch(notify(`you voted ${anecdote.content}`, 5000))
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList