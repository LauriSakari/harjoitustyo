const testingRouter = require('express').Router()
const User = require('../models/user')
const Todo = require('../models/todo')
const Activity = require('../models/activity')

testingRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Todo.deleteMany({})
  await Activity.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter