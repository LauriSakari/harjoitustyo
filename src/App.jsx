import { useState, useEffect } from 'react'
import BoulderGrades from './BoulderGrades'
import FlashForm from './FlashForm'
import userInfoService from './services/userInfo'


const App = () => {
  const [userInfo, setUserInfo] = useState({ climbedRoutes: [] })
  const [newBoulderFlash, setNewBoulderFlash] = useState('')
  const [newSportFlash, setNewSportFlash] = useState('')
  const [user, setUser] = useState({
    id: 1,
    username: "Lauri",
    boulderFlashGrade: "6A",
    sportFlashGrade: "6B",
    climbedRoutes: [
      {
        grade: "6A",
        boulder: 32,
        sport: 2
      },
      {
        grade: "6A+",
        boulder: 3,
        sport: 5
      },
      {
        grade: "6B",
        boulder: 6,
        sport: 4
      },
      {
        grade: "6B+",
        boulder: 0,
        sport: 8
      },
      {
        grade: "6C",
        boulder: 3,
        sport: 6
      },
      {
        grade: "6C+",
        boulder: 4,
        sport: 5
      },
    ]
  })


  useEffect(() => {
    console.log('user ', user)
    console.log('id ', user.id)
    userInfoService
    .getUserInfo(user.id)
    .then(response => {
      setUserInfo(response.data)
    })
  }, [])

  const editBoulderFlash = (event) => {
    event.preventDefault()
    const changedUserInfo = { ...userInfo, boulderFlashGrade: newBoulderFlash }
    userInfoService
    .editFlashGrade(changedUserInfo)
    .then(response => {
      setUserInfo(response.data)
    })
  }

  const handleBoulderFlashChange = (event) => {
    setNewBoulderFlash(event.target.value)
  }

  const editSportFlash = (event) => {
    event.preventDefault()
    const changedUserInfo = { ...userInfo, sportFlashGrade: newSportFlash }
    userInfoService
    .editFlashGrade(changedUserInfo)
    .then(response => {
      setUserInfo(response.data)
    })
  }

  const handleSportFlashChange = (event) => {
    setNewSportFlash(event.target.value)
  }

  return (
  <>
  <h1>Climbing move bank</h1>
  {!user && <>
  <div> Welcome! Please sign in or create an account </div>
  </>
  }
  {user && 
  <> 
    <h2>Hello {userInfo.username}</h2> 
    <h3>Your boulder flash grade is {userInfo.boulderFlashGrade}</h3> 
    <FlashForm handleChange={handleBoulderFlashChange} editFlash={editBoulderFlash} text={'boulder'}/>
    <h3>Your sport flash grade is {userInfo.sportFlashGrade}</h3>
    <FlashForm handleChange={handleSportFlashChange} editFlash={editSportFlash} text={'sport'}/>
    <BoulderGrades userInfo={userInfo}/>
  </>
  }
  </>
)}

export default App