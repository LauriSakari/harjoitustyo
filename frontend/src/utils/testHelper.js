
const simpleUser = {
  name: 'Matti',
  username: 'masa',
  boulderFlashGrade: '6A',
  sportFlashGrade: '6A',
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
  boulderFlashGrade: '6A',
  sportFlashGrade: '6A',
  climbedRoutes: [
    {
      grade: '6A',
      sport: 16,
      boulder: 26,
    },
    {
      grade: '6A+',
      sport: 13,
      boulder: 24,
    },
    {
      grade: '6B',
      sport: 7,
      boulder: 18,
    },
    {
      grade: '6B+',
      sport: 1,
      boulder: 17
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
    },
    {
      grade: '7A',
      sport: 1,
      boulder: 5,
    }
  ]
}

const userWithoutClimbs = {
  name: 'Matti',
  username: 'masa',
  boulderFlashGrade: '6A',
  sportFlashGrade: '6A',
  climbedRoutes: []
}

const userWithGradesMissingInBetween = {
  name: 'Matti',
  username: 'masa',
  boulderFlashGrade: '6A',
  sportFlashGrade: '6A',
  climbedRoutes: [
    {
      grade: '6A',
      sport: 16,
      boulder: 26,
    },
    {
      grade: '6A+',
      sport: 13,
      boulder: 24,
    },
    {
      grade: '6B+',
      sport: 1,
      boulder: 17
    },
    {
      grade: '6C',
      sport: 4,
      boulder: 4,
    },
    {
      grade: '7A',
      sport: 1,
      boulder: 5,
    }
  ]
}

const unsortedGradesList = [

  {
    grade: '6B',
    sport: 1,
    boulder: 7
  },
  {
    grade: '6A+',
    sport: 13,
    boulder: 24,
  },
  {
    grade: '6C+',
    sport: 4,
    boulder: 4,
  },
  {
    grade: '6C',
    sport: 4,
    boulder: 4,
  },
  {
    grade: '6B+',
    sport: 1,
    boulder: 17
  },
  {
    grade: '7A',
    sport: 1,
    boulder: 5,
  },
  {
    grade: '6A',
    sport: 16,
    boulder: 26,
  },
]



export default {
  simpleUser,
  userWithClimbs,
  userWithoutClimbs,
  userWithGradesMissingInBetween,
  unsortedGradesList
}