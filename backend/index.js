const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())

const cors = require('cors')
app.use(cors())
morgan.token('reqBody', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))

let users = [
    {
        "id": 1,
        "username": "Lauri",
        "boulderFlashGrade": "6A",
        "sportFlashGrade": "6B",
        "climbedRoutes": [
          {
            "grade": "6A",
            "boulder": 32,
            "sport": 2
          },
          {
            "grade": "6A+",
            "boulder": 3,
            "sport": 5
          },
          {
            "grade": "6B",
            "boulder": 6,
            "sport": 4
          },
          {
            "grade": "6B+",
            "boulder": 0,
            "sport": 8
          },
          {
            "grade": "6C",
            "boulder": 3,
            "sport": 6
          },
          {
            "grade": "6C+",
            "boulder": 4,
            "sport": 5
          },
          {
            "grade": "7A",
            "boulder": 2,
            "sport": 0
          },

        ]
      },
      {
        "id": 2,
        "username": "Mauri",
        "boulderFlashGrade": "6A",
        "sportFlashGrade": "6B",
        "climbedRoutes": [
          {
            "grade": "6A",
            "boulder": 32,
            "sport": 2
          },
          {
            "grade": "6A+",
            "boulder": 3,
            "sport": 5
          },
          {
            "grade": "6B",
            "boulder": 6,
            "sport": 4
          },
          {
            "grade": "6B+",
            "boulder": 6,
            "sport": 2
          },
          {
            "grade": "6C",
            "boulder": 3,
            "sport": 6
          },
          {
            "grade": "6C+",
            "boulder": 4,
            "sport": 5
          },
          {
            "grade": "7A",
            "boulder": 2,
            "sport": 3
          },
          {
            "grade": "7A+",
            "boulder": 1,
            "sport": 1
          }
        ]
      }
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
  
app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id === id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

const generateId = () => {
  const maxId = users.length > 0
    ? Math.max(...users.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/users', (req, res) => {
  const body = req.body
  if (!req.body.username) {
    return res.status(400).json({
      error: 'user info missing'
    })
  }
  const user = {id: generateId(), ...req.body}
  console.log('user', user)
  users = users.concat(user)
  res.json(user)
  console.log('users ', users)
})

console.log('users eka ' , users)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)