import { useState, useEffect } from 'react'
import {
  Routes, Route, Link, useNavigate
} from 'react-router-dom'
import BoulderGrades from './components/BoulderGrades'
import userInfoService from './services/userInfo'
import SportGrades from './components/SportGrades'
import Home from './components/Home'
import './index.css'
import Notification from './components/Notification'
import Activities from './components/Activities'


const App = () => {
  const [userInfo, setUserInfo] = useState({ climbedRoutes: [], activities: [] })
  const [user, setUser] = useState('')
  const [notification, setNotification] = useState({ message: null  })

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
    const changedUserInfo = { ...userInfo, boulderFlashGrade: newBoulderFlash }
    userInfoService
      .editFlashGrade(changedUserInfo)
      .then(response => {
        setUserInfo(response.data)
      })
  }

  const editSportFlash = (newSportFlash) => {
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
    setNotification({ message: 'You have successfully logged out', type: 'success' })
  }

  console.log('USERINFO APP', userInfo)
  if (!user) return <Home setUser={setUser} notification={notification} setNotification={setNotification}/>

  return (
    <>
      <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/boulder">Boulder</Link>
        <Link to="/sport">Sport</Link>
        <Link to="/activity">Activity</Link>
        <button className='logout-button' onClick={handleLogout}>Logout</button>
      </div>

      <Notification notification={notification}/>

      <Routes>
        <Route path="/boulder" element={<BoulderGrades editBoulderFlash={editBoulderFlash} userInfo={userInfo} setUserInfo={setUserInfo} setNotification={setNotification}/>} />
        <Route path="/sport" element={<SportGrades editSportFlash={editSportFlash} userInfo={userInfo} setUserInfo={setUserInfo} setNotification={setNotification}/>} />
        <Route path="/activity" element={<Activities userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
        <Route path="/" element={<Home user={user} userInfo={userInfo} setUser={setUser} setUserInfo={setUserInfo} notification={notification} setNotification={setNotification}/>} />
      </Routes>
    </>
  )}

export default App