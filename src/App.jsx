import { useState, useEffect } from 'react'
import axios from 'axios'
import BoulderGrades from './BoulderGrades'
import FlashForm from './FlashForm'


const App = () => {
  const [userInfo, setUserInfo] = useState({ climbedRoutes: [] })
  const [newBoulderFlash, setNewBoulderFlash] = useState('')
  const [newSportFlash, setNewSportFlash] = useState('') 


  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/userinfo')
    .then(response => {
      console.log('promise fulfilled')
      setUserInfo(response.data)
    })
  }, [])

  const editBoulderFlash = (event) => {
    event.preventDefault()
    const url = `http://localhost:3001/userinfo`
    const changedUserInfo = { ...userInfo, boulderFlashGrade: newBoulderFlash }
    axios.put(url, changedUserInfo).then(response => {
      setUserInfo(response.data)
    })
    setNewBoulderFlash('')
  }

  const handleBoulderFlashChange = (event) => {
    console.log('value', event.target.value)
    if (typeof event.target.value === 'string' || event.target.value instanceof String){
      console.log('on string')
    }
    setNewBoulderFlash(event.target.value)
  }

  const editSportFlash = (event) => {
    event.preventDefault()
    const url = `http://localhost:3001/userinfo`
    const changedUserInfo = { ...userInfo, sportFlashGrade: newSportFlash }
    axios.put(url, changedUserInfo).then(response => {
      setUserInfo(response.data)
    })
    setNewSportFlash('')
  }

  const handleSportFlashChange = (event) => {
    console.log(event.target.value)
    setNewSportFlash(event.target.value)
  }

  return (
  <>
  <h1>Climbing move bank</h1>
  <h2>Hello {userInfo.username}</h2>
  <h3>Your boulder flash grade is {userInfo.boulderFlashGrade}</h3> 
  <FlashForm handleChange={handleBoulderFlashChange} editFlash={editBoulderFlash} text={'boulder'}/>
  <h3>Your sport flash grade is {userInfo.sportFlashGrade}</h3>
  <FlashForm handleChange={handleSportFlashChange} editFlash={editSportFlash} text={'sport'}/>
  <BoulderGrades userInfo={userInfo}/>
  </>
)}

export default App