import React, { useState } from 'react'
import loginService from '../services/login'
import Notification from '../components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const LoginForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))
      dispatch(setUser(userLogin))
      setUsername('')
      setPassword('')
      history.push('/')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'red', 5))
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in to Blog application
        </Typography>
        <Notification />
        <div className='loginFormContainer'>
          <form className={classes.form} onSubmit={handleLogin} noValidate>
            <TextField
              variant='outlined'
              label='Username'
              required
              fullWidth
              autoFocus
              margin='normal'
              value={username}
              id='username'
              name='username'
              onChange={({ target }) => setUsername(target.value)}
            />

            <TextField
              variant='outlined'
              label='Password'
              required
              fullWidth
              autoFocus
              margin='normal'
              value={password}
              id='password'
              name='password'
              type='password'
              onChange={({ target }) => setPassword(target.value)}
            />

            <Button
              className={classes.submit}
              fullWidth
              variant='contained'
              color='primary'
              id='loginButton'
              type='submit'
            >
              login
            </Button>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default LoginForm
