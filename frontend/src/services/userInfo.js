import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getUserInfo = async (id) => {
    console.log('id2 ', id)
    return await axios.get(`${baseUrl}/${id}`)
}

const editFlashGrade = (changedUserInfo) => {
    console.log('FLASH', changedUserInfo)
    const id = changedUserInfo.id
    return axios.put(`${baseUrl}/${id}`, changedUserInfo)
} 
export default { getUserInfo, editFlashGrade }