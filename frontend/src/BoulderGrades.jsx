import { useState } from 'react'
import FlashForm from './FlashForm'
import gradesHelper from '../utils/gradesHelper'

const BoulderGrades = ({ editBoulderFlash, userInfo }) => {
  const [showPlus, setShowPlus] = useState(true)
  const [newBoulderFlash, setNewBoulderFlash] = useState('')

  if (!userInfo.climbedRoutes) return <div>Add some climbs</div>

  const editFlash = (event) => {
    event.preventDefault()
    editBoulderFlash(newBoulderFlash)
  }

  const handleBoulderFlashChange = (event) => {
    setNewBoulderFlash(event.target.value)
  }

  // Fills any gaps there might be in original list
  const fillGaps = (sortedList) => {
    for (let index = 0; index < sortedList.length; index++) {
      if (sortedList[index].grade !== gradesHelper[index].grade) {
        sortedList.splice(index, 0, gradesHelper[index])
      }
    }
    return sortedList
  }
  // Sorts the climbed routes by grade
  const sortByGrade = (routes) => {
    const sortedByGrade = routes.sort((a, b) => (a.grade > b.grade) ? 1 : -1)
    return sortedByGrade
  }

  // Sorts the climbed routes and gives feedback, starting upwards from flashgrade
  const feedback = (props) => {
    const routes = props
    if (!routes) return <div>No sends yet</div>

    return (
      routes.map((route, index) => {
        if (routes[index + 1] && route.grade >= userInfo.boulderFlashGrade && routes[index + 1].boulder > 0) {
          const comparison = route.boulder - (routes[index + 1].boulder * 3)
          if (comparison < -3) {
            return <p key={route.grade}>You can climb { comparison * -1 + 3 } routes of grade { route.grade } to balance your move bank and move on to work on your next { routes[index + 1].grade}</p>
          }
          if (comparison > 3) {
            return <p key={route.grade}>You have plenty of { route.grade } grades in your move bank, try to climb some { routes[index + 1].grade} grades</p>
          }
          if (comparison >= 0) {
            return <p key={route.grade}>You are all set to climb another { routes[index + 1].grade}</p>
          }
          return <p key={route.grade}>Your move bank is missing only { comparison * -1 } routes of { route.grade } grades to be ready for another { routes[index + 1].grade}</p>
        }
      })
    )
  }

  // Sums up whole grade sends with plus grade sends and returns a new list.
  const ignorePlus = (climbedRoutes) => {
    return (
      climbedRoutes.map((route, index) => {
        if (userInfo.climbedRoutes[index + 1] && !route.grade.includes('+')) {
          return { ...route, boulder: route.boulder + userInfo.climbedRoutes[index + 1].boulder }
        }
        if (index === userInfo.climbedRoutes.length - 1) {
          return route
        }
      }
      ))
  }

  // Filters undefineds from ignorePlus returned list to get list of whole grade ascends
  const plusIgnored = (climbedRoutes) => {
    const sortedRoutes = sortByGrade(climbedRoutes)
    const prosessedList = fillGaps(sortedRoutes)
    const ignored = ignorePlus(prosessedList)
    const filteredReturnValue = ignored.filter(route => route)
    return filteredReturnValue
  }

  //shows results with plus grades included
  const withPlus = (climbedRoutes) => {
    const sortedRoutes = sortByGrade(climbedRoutes)
    const prosessedList = fillGaps(sortedRoutes)
    return prosessedList
  }

  return (
    <>
      <h1>Boulder Grades</h1>
      <h3>Your boulder flash grade is {userInfo.boulderFlashGrade}</h3>
      <FlashForm handleChange={handleBoulderFlashChange} editFlash={editFlash} text={'boulder'}/>
      {/* Shows all of the climbed grades. Plus grades can be toggled by pushing the button */}
      <h3>Different boulder grades climbed</h3>
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Sends</th>
          </tr>
        </thead>
        {userInfo.climbedRoutes.map(grade => {
          if (grade.boulder > 0)
            return (
              <tbody key={grade.grade}>
                <tr>
                  <td>{grade.grade}</td>
                  <td>{grade.boulder}</td>
                </tr>
              </tbody>)
        }
        )}
      </table>
      {/* Button to toggle whether the plus grades are shown and shows feedback */}
      { showPlus ? feedback(withPlus(userInfo.climbedRoutes)) : feedback(plusIgnored(userInfo.climbedRoutes)) }
      <button type="button" onClick={() => { setShowPlus(!showPlus) }}>
        {showPlus ? 'Ignore "plus" grades' : 'Include "plus" grades' }</button>
    </>
  )
}

export default BoulderGrades