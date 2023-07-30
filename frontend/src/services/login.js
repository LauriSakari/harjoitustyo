import axios from 'axios'

const baseUrl = '/api/login'

const login = async ({ username, password }) => {
  if (!username && !password) {
    return null
  }
  const result = await axios.post(baseUrl, { username, password })

  return result
}



export default login