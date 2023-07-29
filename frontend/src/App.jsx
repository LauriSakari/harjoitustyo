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
import todoService from './services/todo'
import activityService from './services/activity'
import activityFunctions from './utils/activityFunctions'
import timeoutNotification from './utils/timeoutNotification'


const App = () => {
  const [userInfo, setUserInfo] = useState({ climbedRoutes: [], activities: [], todos: [] })
  const [user, setUser] = useState('')
  const [notification, setNotification] = useState({ message: null  })
  const [todoList, setTodoList] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (user.id) {
      userInfoService
        .getUserInfo(user.id)
        .then(response => {
          setUserInfo(response.data)
          setTodoList(response.data.todos)
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
    timeoutNotification({ message: 'You have successfully logged out', type: 'success', time: 4000, setNotification })
  }

  const handleSubmitTodo = async (content) => {
    const newTodo = await todoService.newTodo(content, userInfo.id)
    setTodoList( current => {
      const newList = [...current, newTodo.data ]
      return newList
    })
  }

  const handleDeleteActivity = async (activityId, userId, routesToRemove) => {
    activityService.deleteActivity(activityId, userId)
    const newUserInfo = activityFunctions.makeNagatives(routesToRemove, userInfo)
    userInfoService.editClimbedRoutes(newUserInfo)
    setUserInfo(activityFunctions.removeActivityFromUserInfo(newUserInfo, activityId))
    timeoutNotification({ message: 'Activity was deleted succesfully', type: 'success' }, setNotification )
  }

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
        <Route path="/activity" element={<Activities userInfo={userInfo} setUserInfo={setUserInfo} handleDeleteActivity={handleDeleteActivity}/>}/>
        <Route path="/" element={<Home user={user} userInfo={userInfo} setUser={setUser} setUserInfo={setUserInfo} notification={notification} setNotification={setNotification} todoList={todoList} setTodoList={setTodoList} handleSubmitTodo={handleSubmitTodo} handleDeleteActivity={handleDeleteActivity}/>} />
      </Routes>
    </>
  )}

export default App