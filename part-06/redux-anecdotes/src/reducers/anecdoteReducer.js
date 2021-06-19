import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      return state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    }
    case 'NEW_ANECDOTE': {
      return (state = [...state, action.data])
    }
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAcedote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAcedote
    })
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const newAcedote = await anecdoteService.updateVote(id)
    dispatch({
      type: 'VOTE',
      data: newAcedote
    })
  }
}

export default anecdoteReducer
