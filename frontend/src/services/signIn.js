import axios from "axios"

const baseUrl = 'http://localhost:3001/api/users'

const signIn = async (props) => {
  console.log('props', props)
    const newUser = await axios.post(baseUrl, props)
    console.log('newUser', newUser)
    return newUser
}

export default signIn

