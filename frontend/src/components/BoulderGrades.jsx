import { useState } from 'react'
import FlashForm from './FlashForm'
import Feedback from './Feedback'
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

  const routesToShow = (climbedRoutes) => {
    if (!showPlus) {
      return gradeFunctions.plusIgnored(climbedRoutes)
    }
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
              <tbody key={grade.grade} data-testid={grade.grade}>
                <tr>
                  <td>{grade.grade}</td>
                  <td>{grade.boulder}</td>
                </tr>
              </tbody>)
        }
        )}
      </table>
      {/* Button to toggle whether the plus grades are shown and shows feedback */}
      { showPlus ? <Feedback routes={gradeFunctions.withPlus(userInfo.climbedRoutes)} flashGrade={userInfo.boulderFlashGrade} style={'boulder'}/>
        : <Feedback routes={gradeFunctions.plusIgnored(userInfo.climbedRoutes)} flashGrade={userInfo.boulderFlashGrade} style={'boulder'}/> }
      <button type="button" onClick={() => { setShowPlus(!showPlus) }}>
        {showPlus ? 'Ignore "plus" grades' : 'Include "plus" grades' }</button>
    </>
  )
}

export default BoulderGrades