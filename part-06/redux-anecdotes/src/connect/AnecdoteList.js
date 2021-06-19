import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <p>{anecdote.content}</p>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
)

const AnecdoteList = (props) => {
  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              props.voteAnecdote(anecdote.id)
              props.setNotification(`You voted for "${anecdote.content}"`, 3)
            }}
          />
        ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter)
    )
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const connectedAcentodes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default connectedAcentodes
