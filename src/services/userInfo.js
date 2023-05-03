import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getUserInfo = (id) => {
    console.log('id2 ', id)
    return axios.get(`${baseUrl}/${id}`)
}

const editFlashGrade = (changedUserInfo) => {
    return axios.put(baseUrl, changedUserInfo)
} 
export default { getUserInfo, editFlashGrade }