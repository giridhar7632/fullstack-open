import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnedote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    props.createAnecdote(content)
    props.setNotification(`You created "${content}"`, 3)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnedote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const connectNewAnecdote = connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectNewAnecdote
