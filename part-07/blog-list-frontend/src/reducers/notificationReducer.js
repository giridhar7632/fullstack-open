const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutId

export const setNotification = (message, type = 'success') => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { message, type }
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

export const clearNotification = () => ({ type: 'CLEAR_NOTIFICATION' })

export default notificationReducer
