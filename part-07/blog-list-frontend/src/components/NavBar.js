import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { removeUser } from '../reducers/userReducer'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(removeUser())
    history.push('/')
  }

  if (!user || user === null) {
    return null
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          Blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          Users
        </Button>
        <Typography>
          {user.name} logged in{' '}
          <Button color='inherit' onClick={handleLogout}>
            logout
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
