import { createContext, useContext, useReducer } from 'react'

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

export const NotificationContext = createContext()

// export const NotificationContextProvider = (props) => (
//   <NotificationContext.Provider value={[notification, notificationDispatch]}>
//     {props.children}
//   </NotificationContext.Provider>
// )

// export const useNotificationValue = () => {
//   return useContext(NotificationContext)[0]
// }

// export const useNotificationDispatch = () => {
//   return useContext(NotificationContext)[1]
// }

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

export default notificationReducer