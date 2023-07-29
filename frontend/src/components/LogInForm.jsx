import { useState } from 'react'
import login from '../services/login'
import timeoutNotification from '../utils/timeoutNotification'

const LogInForm = ({ setUser, setNotification }) => {

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
      timeoutNotification({
        message: `Welcome ${user.username}! You have logged in succesfully`,
        type: 'success' },
      setNotification
      )

    } catch (error) {
      console.log('error', error )
      timeoutNotification({
        message: `Incorrect username or password ${error.message}`,
        type: 'error' },
      setNotification
      )
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