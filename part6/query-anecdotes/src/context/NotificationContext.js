import { createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload === null ? '' : action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (content) => {
  return {
    type: 'SET',
    payload: content
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export const NotificationContext = createContext()

export default notificationReducer