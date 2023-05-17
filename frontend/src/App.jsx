import { useState, useEffect } from 'react'
import BoulderGrades from './BoulderGrades'
import FlashForm from './FlashForm'
import userInfoService from './services/userInfo'
import LogInForm from './LogInForm'
import SignInForm from './SignInForm'
import AddClimbsForm from './AddClimbsForm'
import SportGrades from './SportGrades'


const App = () => {
  const [userInfo, setUserInfo] = useState({ climbedRoutes: [] })
  const [newBoulderFlash, setNewBoulderFlash] = useState('')
  const [newSportFlash, setNewSportFlash] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    if (user.id) {
      userInfoService
        .getUserInfo(user.id)
        .then(response => {
          setUserInfo(response.data)
        })
    }

  }, [user])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMoveBankUser')
    if (loggedUserJSON && !user) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
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

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedMoveBankUser')
    setUser('')
  }

  return (
    <>
      <h1>Climbing move bank</h1>
      {!user && <>
        <div> Welcome! Please sign in or create an account </div>
        <LogInForm setUser={setUser}/>
        <SignInForm setUser={setUser}/>
      </>
      }
      {user &&
  <>
    <h2>Hello {userInfo.username}</h2>
    <button onClick={handleLogout}>Logout</button>
    <h3>Your boulder flash grade is {userInfo.boulderFlashGrade}</h3>
    <FlashForm handleChange={handleBoulderFlashChange} editFlash={editBoulderFlash} text={'boulder'}/>
    <h3>Your sport flash grade is {userInfo.sportFlashGrade}</h3>
    <FlashForm handleChange={handleSportFlashChange} editFlash={editSportFlash} text={'sport'}/>
    <BoulderGrades userInfo={userInfo}/>
    <AddClimbsForm userInfo={userInfo} setUserInfo={setUserInfo}/>
    <SportGrades/>
  </>
      }
    </>
  )}

export default App