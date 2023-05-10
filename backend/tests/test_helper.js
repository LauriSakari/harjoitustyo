const User = require('../models/user')

const initialUsers = [
  {
    'name': 'Lauri',
    'username': 'laurisakari',
    'password': 'salasana',
    'boulderFlashGrade': '6C',
    'sportFlashGrade': '6B+',
    'climbedRoutes': [
      {
        'grade': '6A',
        'boulder': 53,
        'sport': 43
      },  {
        'grade': '6A+',
        'boulder': 54,
        'sport': 42
      },
      {
        'grade': '6B',
        'boulder': 48,
        'sport': 48
      },
      {
        'grade': '6B+',
        'boulder': 24,
        'sport': 24
      },
      {
        'grade': '6C',
        'boulder': 12,
        'sport': 12
      },
      {
        'grade': '6C+',
        'boulder': 6,
        'sport': 6
      },
      {
        'grade': '7A',
        'boulder': 3,
        'sport': 3
      },
      {
        'grade': '7A+',
        'boulder': 1,
        'sport': 1
      }
    ]
  },
  {
    'name': 'Mauri',
    'username': 'maurisakari',
    'password': 'salasana',
    'boulderFlashGrade': '6A',
    'sportFlashGrade': '6A+',
    'climbedRoutes': [
      {
        'grade': '6A',
        'boulder': 53,
        'sport': 43
      },  {
        'grade': '6A+',
        'boulder': 54,
        'sport': 42
      },
      {
        'grade': '6B',
        'boulder': 48,
        'sport': 48
      },
      {
        'grade': '6B+',
        'boulder': 7,
        'sport': 65
      },
      {
        'grade': '6C',
        'boulder': 13,
        'sport': 15
      },
      {
        'grade': '6C+',
        'boulder': 6,
        'sport': 6
      },
      {
        'grade': '7A',
        'boulder': 4,
        'sport': 3
      },
      {
        'grade': '7A+',
        'boulder': 1,
        'sport': 1
      }
    ]
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = { initialUsers, usersInDb }