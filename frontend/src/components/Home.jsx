import LogInForm from './LogInForm'
import SignInForm from './SignInForm'
import Notification from './Notification'
import Activity from './Activity'
import ToDo from './ToDo'

const Home = ({ user, userInfo, setUser, notification, setNotification, todoList, setTodoList, handleSubmitTodo, handleDeleteActivity }) => {

  const fiveLatestFirst = (array) => {
    const fiveLatestReversedOrder = array.slice(-5).reverse()
    return fiveLatestReversedOrder
  }

  return (
    <>
      <h1>Climbing move bank</h1>

      {!user && <>
        <p> Welcome! Please sign in or create an account </p>
        <Notification notification={notification}/>
        <LogInForm setUser={setUser} setNotification={setNotification}/>
        <SignInForm setUser={setUser} setNotification={setNotification}/>
      </>
      }

      {user &&
<>
  <h2>Hello {userInfo.username}</h2>

  <h3>Latest activity:</h3>

  {fiveLatestFirst(userInfo.activities).map(activity => {
    return <li key={activity.id}>
      <Activity activity={activity} handleDeleteActivity={handleDeleteActivity}/>
    </li>
  })}

  <ToDo todoList={todoList} setTodoList={setTodoList} handleSubmitTodo={handleSubmitTodo} setNotification={setNotification}/>
</>
      }
    </>
  )
}

export default Home