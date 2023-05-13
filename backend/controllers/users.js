const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
    
usersRouter.get('/', (req, res) => {
  User.find({}).then(response => {
    res.json(response)
  })
})
  
usersRouter.get('/:id', (req, res) => {
  console.log('req ', req.params.id)
  const id = req.params.id
  console.log('id', id)
  User.findById(id)
    .then(user => { 
      if (user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      logger.error(error)
      res.status(500).end()
    })
})
  
usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    if (!body.username || !body.name || !body.password) {
      return res.status(400).json({
        error: 'user info missing'
      })
    }
  
    const password = body.password

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({ password, ...body, passwordHash })
    console.log('user', user)
    
    const savedUser = await user.save()

    console.log('savedUser ', savedUser)
   
    res.status(201).json(savedUser)
    
  } catch (error) {
    logger.error('Something went wrong', error)
    return res.status(400).json({
      error: error
    })
  }
})

usersRouter.put('/:id', async (req, res) => {

  try {
    console.log('PUT TOIMII')
    const { id, ...user } = req.body
    console.log('id', id)
    console.log('newuser ', user)
  
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
    console.log('updated', updatedUser)
    
    res.json(updatedUser)
  } catch (error) {
    logger.error(error)
    res.send(400).json({ error: error })
  }

})

module.exports = usersRouter