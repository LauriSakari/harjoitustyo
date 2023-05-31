import { useState } from 'react'
import FlashForm from './FlashForm'
import gradeFunctions from '../utils/gradeFunctions'

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



  // Gives feedback, starting upwards from flashgrade
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

  const routesToShow = (climbedRoutes) => {
    console.log(climbedRoutes)
    if (!showPlus) {
      return gradeFunctions.plusIgnored(climbedRoutes)
    }
    console.log('true')
    return climbedRoutes
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
        {routesToShow(userInfo.climbedRoutes).map(grade => {
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
      { showPlus ? feedback(gradeFunctions.withPlus(userInfo.climbedRoutes)) : feedback(gradeFunctions.plusIgnored(userInfo.climbedRoutes)) }
      <button type="button" onClick={() => { setShowPlus(!showPlus) }}>
        {showPlus ? 'Ignore "plus" grades' : 'Include "plus" grades' }</button>
    </>
  )
}

export default BoulderGrades