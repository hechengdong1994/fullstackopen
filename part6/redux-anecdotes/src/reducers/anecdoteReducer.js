import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAll(state, action) {
      return action.payload
    },
    setOne(state, action) {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    appendOne(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { setAll, setOne, appendOne } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAll(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch(appendOne(anecdote))
  }
}

export const vote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.vote(id)
    dispatch(setOne(anecdote))
  }
}

export default anecdoteSlice.reducer