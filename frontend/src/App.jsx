import { useState, useEffect } from 'react'
import {
  Routes, Route, Link, useNavigate
} from 'react-router-dom'
import BoulderGrades from './BoulderGrades'
import userInfoService from './services/userInfo'

import SportGrades from './SportGrades'
import Home from './Home'


const App = () => {
  const [userInfo, setUserInfo] = useState({ climbedRoutes: [] })
  const [user, setUser] = useState('')

  const navigate = useNavigate()

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

  const editBoulderFlash = (newBoulderFlash) => {
    console.log('newBoulderFlash', newBoulderFlash)
    const changedUserInfo = { ...userInfo, boulderFlashGrade: newBoulderFlash }
    console.log('changedUserInfo', changedUserInfo)
    userInfoService
      .editFlashGrade(changedUserInfo)
      .then(response => {
        setUserInfo(response.data)
      })
  }

  const editSportFlash = (newSportFlash) => {
    console.log('newSportFlash', newSportFlash)
    const changedUserInfo = { ...userInfo, sportFlashGrade: newSportFlash }
    userInfoService
      .editFlashGrade(changedUserInfo)
      .then(response => {
        setUserInfo(response.data)
      })
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedMoveBankUser')
    setUser('')
    navigate('/')
  }

  const padding = {
    padding: 5
  }
  return (
    <>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/boulder">Boulder</Link>
        <Link style={padding} to="/sport">Sport</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>


      <Routes>
        <Route path="/boulder" element={<BoulderGrades editBoulderFlash={editBoulderFlash} userInfo={userInfo}/>} />
        <Route path="/sport" element={<SportGrades editSportFlash={editSportFlash} userInfo={userInfo}/>} />
        <Route path="/" element={<Home user={user} userInfo={userInfo} setUser={setUser} setUserInfo={setUserInfo} />} />
      </Routes>
    </>
  )}

export default App