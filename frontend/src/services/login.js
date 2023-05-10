import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

const login = async ({ username, password }) => {
  if (!username && !password) {
    return null
  }
  console.log('HALOO LOGIN', username, password)
  const result = await axios.post(baseUrl, { username, password })
  console.log('result ', result)
  return result
}



export default login