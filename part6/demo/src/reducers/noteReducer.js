import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const initialState = []

// const generateId = () =>
//   Number((Math.random() * 1000000).toFixed(0))

// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//       return [...state, action.data]
//     case 'TOGGLE_IMPORTANCE': {
//       const id = action.data.id
//       const noteToChange = state.find(n => n.id === id)
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important
//       }
//       return state.map(note =>
//         note.id !== id ? note : changedNote
//       )
//     }
//     default:
//       return state
//   }
// }
// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     data: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }
// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     data: { id }
//   }
// }

// Redux Toolkit利用Immer库与由createSlice函数创建的还原器，这使得在还原器内部改变state参数成为可能。
// Immer使用改变的状态来产生一个新的、不可变的状态，因此状态的改变仍然是不可变的。
// 请注意，状态可以在不 "改变 "的情况下被改变，就像我们在toggleImportanceOf中做的那样。
// 在这种情况下，函数会返回新的状态。
// 然而，改变状态经常会派上用场，特别是当一个复杂的状态需要被更新时。
const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

// npm install redux-thunk
//通过Redux Thunk可以实现action creators，它返回一个函数而不是一个对象。该函数接收Redux store的dispatch和getState方法作为参数。
//这允许异步动作创建者的实现，它首先等待某个异步操作的完成，然后分派一些动作，改变商店的状态。
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}
export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer