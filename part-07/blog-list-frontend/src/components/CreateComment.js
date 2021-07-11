import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { createComment, initializeBlogs } from '../reducers/blogReducer'

const CreateComment = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = blogs ? blogs.find((b) => b.id === match.params.id) : null

  if (!blog) {
    return null
  }

  const addComment = async (e) => {
    e.preventDefault()
    dispatch(createComment(match.params.id, comment))
    dispatch(initializeBlogs())
    setComment('')
  }

  return (
    <div className='CreateCommentContainer'>
      <form onSubmit={addComment}>
        <div className='inputCommentDiv'>
          <label htmlFor='commetn'>comment:</label>
          <input
            type='text'
            value={comment}
            id='comment'
            name='comment'
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button id='submitBlogButton' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateComment
