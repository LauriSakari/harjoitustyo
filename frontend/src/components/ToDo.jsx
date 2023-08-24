import { useState } from 'react'
import todoService from '../services/todo'
import timeoutNotification from '../utils/timeoutNotification'

const ToDo = ({ todoList, setTodoList, handleSubmitTodo, setNotification }) => {

  const [item, setItem] = useState('')

  const submit = (event) => {
    event.preventDefault()
    handleSubmitTodo(event.target.item.value)
    setItem('')
  }

  const handleChange = (event) => {
    setItem(event.target.value)
  }

  const toggleTodo = async (id, completed) => {
    await todoService.editCompleted(id, completed)
    setTodoList(current => {
      return current.map(item => {
        if (item.id === id) {
          return { ...item, completed }
        }
        return item
      })
    })
    timeoutNotification({
      message: `Item was succesfully marked as ${completed ? 'completed' : 'not completed'}`,
      type: 'success' },
    setNotification
    )
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      await todoService.deleteTodo(id)

      setTodoList(current => {
        const filteredList = current.filter(item => item.id !== id)
        return filteredList
      })

      timeoutNotification({
        message: 'Item was deleted succesfully',
        type: 'success' },
      setNotification
      )
    }
  }

  return (
    <>
      <h3>Todo list for future projects:</h3>

      <form onSubmit={submit}>
        <div>
          <label htmlFor='item'>ToDo list</label>
          <input type='text' id='item' data-testid="addTodoInput" value={item} onChange={handleChange}></input>
          <button id='addButton' type='submit' data-testid="addTodoButton">Add</button>
        </div>
      </form>

      <ul>
        {todoList.map(todo => {
          return <li key={todo.id}>
            <label>
              <input type='checkbox' checked={todo.completed} onChange={event => toggleTodo(todo.id, event.target.checked)}/>
              {todo.content}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </label>
          </li>
        })}
      </ul>
    </>
  )
}

export default ToDo