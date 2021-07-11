import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (
    notification.message === null ||
    notification.message === '' ||
    notification === ''
  ) {
    return null
  }

  if (notification.color === 'green' && notification.message) {
    return <Alert severity='success'>{notification.message}</Alert>
  }

  if (notification.color === 'red' && notification.message) {
    return <Alert severity='error'>{notification.message}</Alert>
  }

  return <Alert severity='info'>{notification.message}</Alert>
}

export default Notification
