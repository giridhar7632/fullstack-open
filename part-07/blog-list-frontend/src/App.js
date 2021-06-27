/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => dispatch(initializeBlogs(blogs)), [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage({ msg: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setErrorMessage({
        msg: `a new blog ${response.title} by ${response.author}`,
        type: 'success'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage({ msg: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button
            id='logout'
            onClick={() => window.localStorage.removeItem('loggedBlogListUser')}
          >
            Log out
          </button>
          {blogForm()}
          <h2>Blogs</h2>
          <div className='blog-list'>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleUpdate={blogService.update}
                handleDelete={blogService.deleteBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
