import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    clear(state, action) {
      return null
    }
  }
})

export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer