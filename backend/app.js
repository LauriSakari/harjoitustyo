const config = require('./utils/config')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const activitiesRouter = require('./controllers/activities')
const todosRouter = require('./controllers/todos')
const logger = require('./utils/logger')
const morgan = require('morgan')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

morgan.token('reqBody', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/todos', todosRouter)

app.use(express.static('dist'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'))
})

app.use(middleware.unknownEndpoint)

module.exports = app