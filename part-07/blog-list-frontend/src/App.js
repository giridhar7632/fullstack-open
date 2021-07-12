import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import Togglable from './components/Togglable'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { removeUser, setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setUsers())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(
      setNotification(`a new blog '${blog.title}' by ${blog.author} added!`)
    )
  }

  const handleLogout = () => {
    dispatch(removeUser())
    localStorage.removeItem('loggedBlogListUser')
  }

  if (!user) {
    return (
      <div>
        <h2>Login to application</h2>

        <Notification />
        <LoginForm />
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  const navStyle = {
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgray'
  }

  return (
    <Router>
      <div style={navStyle}>
        <Link style={padding} to='/'>
          blogs
        </Link>
        <Link style={padding} to='/users'>
          users
        </Link>
        <span>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      </div>

      <h2>Blogs</h2>

      <Notification />

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/users' exact>
          <Users />
        </Route>
        <Route path='/' exact>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <CreateBlog createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
