import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username,
        password
      })
      setUsername('')
      setPassword('')
      dispatch(setUser(userLogin))
      dispatch(setNotification(`${userLogin.name} welcome back!`))
      window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'))
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
