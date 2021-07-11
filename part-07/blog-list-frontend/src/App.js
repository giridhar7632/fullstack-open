import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch
} from 'react-router-dom'

import User from './components/User'
import BlogView from './components/BlogView'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Notification from './components/Notification'
import NavBar from './components/NavBar'

import { Container } from '@material-ui/core'
import blogService from './services/blogs'
// import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { removeUser, setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector(({ user }) => user)
  const blogs = ({ blogs }) => blogs
  const users = useSelector(({ users }) => users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else {
      dispatch(removeUser())
    }
  }, [])

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <div>
      {currentUser === null ? null : <NavBar user={currentUser} />}
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Notification />
        </div>
        <Switch>
          <Route path='/login'>
            {currentUser === null || undefined ? (
              <LoginForm />
            ) : (
              <Redirect to='/blogs' />
            )}
          </Route>

          <Route path='/users/:id'>
            <User user={user} />
            <button onClick={() => history.push('/users')}> Back </button>
          </Route>

          <Route path='/users' exact>
            <Users />
          </Route>

          <Route path='/blogs/:id'>
            <BlogView blog={blog} />
          </Route>

          <Route path='/blogs' exact>
            {currentUser ? (
              <div>
                <Blogs user={currentUser} blogs={blogs} />
              </div>
            ) : null}
          </Route>

          <Route path='/' exact>
            {currentUser === null || undefined ? (
              <Redirect to='/login' />
            ) : (
              <Redirect to='/blogs' />
            )}
          </Route>
        </Switch>
      </Container>
    </div>
  )
}

export default App
