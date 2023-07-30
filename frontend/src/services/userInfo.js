import axios from 'axios'
const baseUrl = '/api/users'

const getUserInfo = async (id) => {
  return await axios.get(`${baseUrl}/${id}`)
}

const editFlashGrade = async (changedUserInfo) => {
  const id = changedUserInfo.id
  return await axios.put(`${baseUrl}/${id}`, changedUserInfo)
}

const editClimbedRoutes = async (changedUserInfo, activityId) => {
  const id = changedUserInfo.id
  const userInfo = { ...changedUserInfo, activityId: activityId }
  const result = await axios.put(`${baseUrl}/${id}`, userInfo)
  return result.data
}

export default { getUserInfo, editFlashGrade, editClimbedRoutes }