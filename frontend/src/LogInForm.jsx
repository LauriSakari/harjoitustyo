import { useState } from 'react'
import login from './services/login'

const LogInForm = ({ setUser }) => {

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
    const result = await login({ username, password })
    const user = result.data
    setUser(user)

    window.localStorage.setItem(
      'loggedMoveBankUser', JSON.stringify(user)
    )
  }

  return (
    <form onSubmit={handleLogin}>
      <div> username
        <input type='text' value={username} onChange={handleUsernameChange}/>
      </div>
      <div> password
        <input type='password' value={password} onChange={handlePasswordChange}/>
      </div>
      <button type='submit'>Submit</button>
    </form>

  )
}

export default LogInForm