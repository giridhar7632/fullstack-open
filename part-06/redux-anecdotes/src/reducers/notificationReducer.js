const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timer
export const setNotification = (notification, t) => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification
    })
    timer = setTimeout(() => dispatch(clearNotification()), t * 1000)
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default notificationReducer
