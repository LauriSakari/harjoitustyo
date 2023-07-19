import LogInForm from './LogInForm'
import SignInForm from './SignInForm'
import Notification from './Notification'

const Home = ({ user, userInfo, setUser, notification, setNotification }) => {


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
        <SignInForm setUser={setUser} handleNotificationChange={handleNotificationChange}/>
      </>
      }

      {user &&
<>
  <h2>Hello {userInfo.username}</h2>

  <p>Latest activity:</p>



  {userInfo.activities.map(activity => {
    let style = ''
    let sum = 0

    activity.routesClimbed.forEach((grade) => {
      style = grade.style
      sum += grade.routesClimbed
    })

    return <li key={activity.id}>Date: { new Date(activity.date).toLocaleDateString() } Climbed routes: { sum } { style } {sum > 1 ? 'routes climbed' : 'route climbed'}</li>
  })}

</>
      }
    </>
  )
}

export default Home