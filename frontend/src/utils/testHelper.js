
const simpleUser = {
  name: 'Matti',
  username: 'masa',
  boulderFlashGrade: '6A',
  climbedRoutes: [
    {
      grade: '6A',
      sport: 1,
      boulder: 1,
    }
  ]
}

const userWithClimbs = {
  name: 'Matti',
  username: 'masa',
  boulderFlashGrade: '6B',
  climbedRoutes: [
    {
      grade: '6A',
      sport: 16,
      boulder: 16,
    },
    {
      grade: '6A+',
      sport: 13,
      boulder: 13,
    },
    {
      grade: '6B',
      sport: 7,
      boulder: 7,
    },
    {
      grade: '6B+',
      sport: 1,
      boulder: 1
    },
    {
      grade: '6C',
      sport: 4,
      boulder: 4,
    },
    {
      grade: '6C+',
      sport: 1,
      boulder: 1,
    }

  ]
}

export default { simpleUser, userWithClimbs }