import React from 'react'

const Message = ({ notify }) => {
  if (notify === null) {
    return null
  }
  const { msg, className } = notify
  return <div className={className}>{msg}</div>
}

export default Message
