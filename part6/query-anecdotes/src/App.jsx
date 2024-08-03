import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'

const App = () => {
  const queryClient = useQueryClient()
  const voteMutation = useMutation(anecdoteService.vote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    voteMutation.mutate(anecdote.id)
  }

  const { data, isLoading, isError } = useQuery('anecdotes', () => anecdoteService.getAll(),
    // 请注意在某种故障情况下，查询会在 isLoading 状态中停留一会儿
    // 这是因为在一次请求失败后，React Query 会在多尝试几次后，才反馈请求失败。
    // 你可以选择不进行这种额外尝试
    { retry: false })

  if (isError) {
    return (
      <div>
        anecdote service not avaliable due to problems in server
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        loading data...
      </div>
    )
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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

export default App
