import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (content, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer