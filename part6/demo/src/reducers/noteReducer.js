import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

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
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId()
      })
    },
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
    }
  }
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer