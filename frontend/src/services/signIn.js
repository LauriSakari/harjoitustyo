import axios from 'axios'

const baseUrl = '/api/users'

const signIn = async (props) => {
  const newUser = await axios.post(baseUrl, props)
  return newUser
}

export default signIn

