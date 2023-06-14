import { useState } from 'react'
import login from '../services/login'

const LogInForm = ({ setUser, handleNotificationChange }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const result = await login({ username, password })
      const user = result.data
      setUser(user)
      window.localStorage.setItem(
        'loggedMoveBankUser', JSON.stringify(user)
      )
      handleNotificationChange({ message: `Welcome ${user.username}! You have logged in succesfully`, type: 'success' })
      setTimeout(() => {
        handleNotificationChange({ message: null })
      }, 3000)
    } catch (error) {
      handleNotificationChange({ message: 'Incorrect username or password', type: 'error' })
    }

  }

  return (
    <form onSubmit={handleLogin}>
      <div> Username:
        <input type='text' value={username} onChange={handleUsernameChange}/>
      </div>
      <div> Password:
        <input type='password' value={password} onChange={handlePasswordChange}/>
      </div>
      <button type='submit'>Submit</button>
    </form>

  )
}

export default LogInForm