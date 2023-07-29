import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/todos'

const newTodo = async ( content, user ) => {
  const newTodo = {
    content: content,
    completed: false,
    user: user
  }

  return await axios.post(baseUrl, newTodo)
}

const editCompleted = async (id, completed) => {
  const isCompleted = { completed: completed }
  const completedTodo = await axios.put(`${baseUrl}/${id}`, isCompleted)
  return completedTodo

}

const deleteTodo = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`)
}

export default {
  newTodo,
  deleteTodo,
  editCompleted
}