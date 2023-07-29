const todosRouter = require('express').Router()
const logger = require('../utils/logger')
const Todo = require('../models/todo')
const User = require('../models/user')


todosRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    console.log('body ', body)
    const user = await User.findById(body.user)
      
    console.log('user ', user)
    const todo = new Todo({ ...body })
        
    const savedTodo = await todo.save()
  
    user.todos = user.todos.concat(savedTodo._id)
    await user.save()
       
    res.status(201).json(savedTodo)
        
  } catch (error) {
    logger.error('Something went wrong', error)
    return res.status(400).json({
      error: error
    })
  }
})

todosRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const body = req.body
    const updatedTodo = await Todo.findByIdAndUpdate(id, body)
    return res.json(updatedTodo)
  } catch (error) {
    logger.error('error,' , error)
    return res.json(error.message)
  }
})
  
todosRouter.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndRemove(req.params.id)
    return res.status(204).end()
      
  } catch (error) {
    logger.error('error ', error )
    return res.json(error.message)
  }
})
  
module.exports = todosRouter