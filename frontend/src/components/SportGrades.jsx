import { useState } from 'react'
import FlashForm from './FlashForm'
import Feedback from './Feedback'
import gradeFunctions from '../utils/gradeFunctions'

const SportGrades = ({ editSportFlash, userInfo }) => {
  const [newSportFlash, setNewSportFlash] = useState('')
  const [showPlus, setShowPlus] = useState(true)

  const editFlash = (event) => {
    event.preventDefault()
    editSportFlash(newSportFlash)
  }

  const handleSportFlashChange = (event) => {
    setNewSportFlash(event.target.value)
  }

  const routesToShow = (climbedRoutes) => {
    if (!showPlus) {
      return gradeFunctions.plusIgnored(climbedRoutes)
    }
    return climbedRoutes
  }

  return (
    <>
      <h1>Sport Grades</h1>
      <h3>Your sport flash grade is {userInfo.sportFlashGrade}</h3>
      <FlashForm handleChange={handleSportFlashChange} editFlash={editFlash} text={'sport'}/>
      {/* Shows all of the climbed grades. Plus grades can be toggled by pushing the button */}
      <h3>Different sport grades climbed</h3>
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Sends</th>
          </tr>
        </thead>
        {routesToShow(userInfo.climbedRoutes).map(grade => {
          if (grade.sport > 0)
            return (
              <tbody key={grade.grade}>
                <tr>
                  <td>{grade.grade}</td>
                  <td>{grade.sport}</td>
                </tr>
              </tbody>)
        }
        )}
      </table>
      {/* Button to toggle whether the plus grades are shown and shows feedback */}
      { showPlus ? <Feedback routes={gradeFunctions.withPlus(userInfo.climbedRoutes)} flashGrade={userInfo.sportFlashGrade} style={'sport'}/>
        : <Feedback routes={gradeFunctions.plusIgnored(userInfo.climbedRoutes)} flashGrade={userInfo.sportFlashGrade} style={'sport'}/>  }
      <button type="button" onClick={() => { setShowPlus(!showPlus) }}>
        {showPlus ? 'Ignore "plus" grades' : 'Include "plus" grades' }</button>
    </>
  )
}

export default SportGrades