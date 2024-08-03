const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

let anecdotes = anecdotesAtStart.map(asObject)

const getAll = async () => {
  // throw new Error()
  return anecdotes
}

const create = async (content) => {
  // throw new Error()
  const newAnecdote = asObject(content)
  anecdotes = [...anecdotes, newAnecdote]
  return newAnecdote
}

const vote = async (id) => {
  const anecdote = anecdotes.find(a => a.id === id)
  if (anecdote) {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    anecdotes = anecdotes.map(a => a.id === id ? newAnecdote : a)
    return newAnecdote
  }
  return null
}

export default { getAll, create, vote }