/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = { headers: { Authorization: token } }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then((response) => response.data)
}

const updateLikes = async (id) => {
  const blog = await axios.get(`${baseUrl}/${id}`)
  const newBlog = {
    ...blog.data,
    likes: blog.data.likes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const exports = { setToken, getAll, create, update, updateLikes, deleteBlog }
export default exports
