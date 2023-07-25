import LogInForm from './LogInForm'
import SignInForm from './SignInForm'
import Notification from './Notification'
import Activity from './Activity'
import activityFunctions from '../utils/activityFunctions'

const Home = ({ user, userInfo, setUser, setUserInfo, notification, setNotification }) => {

  const fiveLatestFirst = (array) => {
    const fiveLatestReversedOrder = array.slice(-5).reverse()
    return fiveLatestReversedOrder
  }

  const handleNotificationChange = (message) => {
    setNotification(message)
  }

  const handleDeleteActivity = (activityId, userId) => {
    activityFunctions.deleteActivity(activityId, userId)
    setUserInfo(activityFunctions.removeActivityFromUserInfo(userInfo, activityId))
  }


  return (
    <>
      <h1>Climbing move bank</h1>

      {!user && <>
        <p> Welcome! Please sign in or create an account </p>
        <Notification notification={notification}/>
        <LogInForm setUser={setUser} handleNotificationChange={handleNotificationChange}/>
        <SignInForm setUser={setUser} handleNotificationChange={handleNotificationChange}/>
      </>
      }

      {user &&
<>
  <h2>Hello {userInfo.username}</h2>

  <p>Latest activity:</p>

  {fiveLatestFirst(userInfo.activities).map(activity => {
    return <li key={activity.id}>
      <Activity activity={activity} handleDeleteActivity={handleDeleteActivity}/>
    </li>
  })}

</>
      }
    </>
  )
}

export default Home