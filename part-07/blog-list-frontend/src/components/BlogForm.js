import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()
  const [likes, setLikes] = useState()

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      likes
    }
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`You created "${newBlog.title}"`))
    setTitle('')
    setLikes('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a Blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes:
          <input
            id='likes'
            type='number'
            value={likes}
            name='likes'
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button id='createBlog' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
