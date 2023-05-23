import { useState } from 'react'
import FlashForm from './FlashForm'

const SportGrades = ({ editSportFlash, userInfo }) => {
  const [newSportFlash, setNewSportFlash] = useState('')

  const editFlash = (event) => {
    event.preventDefault()
    editSportFlash(newSportFlash)
  }

  const handleSportFlashChange = (event) => {
    setNewSportFlash(event.target.value)
  }

  return (
    <>
      <h1>Sport Grades</h1>
      <h3>Your sport flash grade is {userInfo.sportFlashGrade}</h3>
      <FlashForm handleChange={handleSportFlashChange} editFlash={editFlash} text={'sport'}/>
    </>
  )
}

export default SportGrades