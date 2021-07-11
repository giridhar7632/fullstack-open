import React, { useRef } from 'react'
import { Container, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { likeBlog, initializeBlogs } from '../reducers/blogReducer'
import CreateComment from './CreateComment'
import Togglable from './Togglable'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  if (!blog) {
    return null
  }

  const handleLike = (e) => {
    e.preventDefault()
    dispatch(likeBlog(blog.id))
    dispatch(initializeBlogs())
  }

  return (
    <Container component='main' maxWidth='xs' className='blogViewContainer'>
      <Typography component='div' variant='h4'>
        {blog.title}
      </Typography>
      <div className='blogViewInfoContainer'>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>

      <div className='blogViewCommentContainer'>
        <h3>Comments</h3>
        <Togglable buttonLabel='New comment' ref={blogFormRef}>
          <CreateComment />
        </Togglable>
        <ul>
          {blog.comments.map((comment, i) => {
            return <li key={i}>{comment}</li>
          })}
        </ul>
      </div>
    </Container>
  )
}

export default BlogView
