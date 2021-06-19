import axios from 'axios'

const url = 'http://localhost:5000/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(url, object)
  return response.data
}

const updateAnecdote = async (id, newObj) => {
  const response = await axios.put(`${url}/${id}`, newObj)
  return response.data
}

const updateVote = async (id) => {
  const anecdote = await axios.get(`${url}/${id}`)
  const newAnecdote = {
    ...anecdote.data,
    votes: anecdote.data.votes + 1
  }
  const response = await axios.put(`${url}/${id}`, newAnecdote)
  return response.data
}

const exports = { getAll, createNew, updateAnecdote, updateVote }

export default exports
