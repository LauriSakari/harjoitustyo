import { useState } from 'react'
import FlashForm from './FlashForm'
import Feedback from './Feedback'
import ClimbsTable from './ClimbsTable'
import gradeFunctions from '../utils/gradeFunctions'
import AddClimbsForm from './AddClimbsForm'

const SportGrades = ({ editSportFlash, userInfo, setUserInfo, setNotification }) => {
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
      <AddClimbsForm userInfo={userInfo} setUserInfo={setUserInfo} setNotification={setNotification} style={'sport'}/>
      <h3>Your sport flash grade is {userInfo.sportFlashGrade}</h3>
      <FlashForm handleChange={handleSportFlashChange} editFlash={editFlash} text={'sport'}/>
      {/* Shows all of the climbed grades. Plus grades can be toggled by pushing the button */}
      <h3>Different sport grades climbed</h3>
      <ClimbsTable routesToShow={routesToShow(userInfo.climbedRoutes)} style={'sport'}/>

      {/* Button to toggle whether the plus grades are shown and shows feedback */}
      { showPlus ? <Feedback routes={gradeFunctions.withPlus(userInfo.climbedRoutes)} flashGrade={userInfo.sportFlashGrade} style={'sport'}/>
        : <Feedback routes={gradeFunctions.plusIgnored(userInfo.climbedRoutes)} flashGrade={userInfo.sportFlashGrade} style={'sport'}/>  }
      <button type="button" onClick={() => { setShowPlus(!showPlus) }}>
        {showPlus ? 'Ignore "plus" grades' : 'Include "plus" grades' }</button>
    </>
  )
}

export default SportGrades