const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: notification
  }
}

export default notificationReducer