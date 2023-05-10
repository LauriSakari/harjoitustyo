const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')


describe('two users saved initially', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('expect spesific user to be appear', async () => {
    const response = await api.get('/api/users')
    const usernames = response.body.map(user => user.username)

    expect(usernames).toContain('laurisakari')
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('User creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    console.log('users at start, ', usersAtStart)

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    console.log('new user', newUser)

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error.message).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

describe('logging in', () => { 
  beforeEach(async () => {
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    
    await user.save()
  })
  test('login succeeds with correct credentials', async () => {

    const user = {
      username: 'root',
      name: 'Superuser',
      password: 'sekret',
    }
    
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    console.log('respones', response.body )
    
    const decoded = jwt.verify(response.body, process.env.SECRET)
    
    console.log('decoded', decoded)
    expect(decoded.username).toContain('root')
  }) 
  test('login fails with incorrect password', async () => {

    const user = {
      username: 'root',
      name: 'Superuser',
      password: 'sekretti',
    }
    
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body).toContain('Invalid password')
  }) 
})

afterAll(async () => {
  await mongoose.connection.close()
})
