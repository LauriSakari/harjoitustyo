import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getUserInfo = async (id) => {
  return await axios.get(`${baseUrl}/${id}`)
}

const editFlashGrade = async (changedUserInfo) => {
  const id = changedUserInfo.id
  return await axios.put(`${baseUrl}/${id}`, changedUserInfo)
}

const editClimbedRoutes = async (changedUserInfo) => {
  console.log('changedUserInfo', changedUserInfo)
  const id = changedUserInfo.id
  const result = await axios.put(`${baseUrl}/${id}`, changedUserInfo)
  return result.data
}

export default { getUserInfo, editFlashGrade, editClimbedRoutes }