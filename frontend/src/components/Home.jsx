import LogInForm from './LogInForm'
import SignInForm from './SignInForm'
import AddClimbsForm from './AddClimbsForm'
import Notification from './Notification'

const Home = ({ user, userInfo, setUser, setUserInfo, notification, setNotification }) => {

  const handleNotificationChange = (message) => {
    setNotification(message)
  }

  return (
    <>
      <h1>Climbing move bank</h1>

      {!user && <>
        <p> Welcome! Please sign in or create an account </p>
        <Notification notification={notification}/>
        <LogInForm setUser={setUser} handleNotificationChange={handleNotificationChange}/>
        <SignInForm setUser={setUser}/>
      </>
      }

      {user &&
<>
  <h2>Hello {userInfo.username}</h2>

  <AddClimbsForm userInfo={userInfo} setUserInfo={setUserInfo} handleNotificationChange={handleNotificationChange}/>

</>
      }
    </>
  )
}

export default Home