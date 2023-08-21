const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

loginRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    const user = await User.findOne({ username: body.username })
    if (!user) {
      throw new Error('User not found')
    }
    const isPassed = await bcrypt.compare(body.password, user.passwordHash)

    if (!isPassed) {
      throw new Error('Invalid password')
    }

    const userForToken = { 
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    return res.status(200).send({ ...userForToken, token: token })

  } catch (error) {
    logger.error(error)
    return res.status(401).json(error.message)
  }
})


module.exports = loginRouter