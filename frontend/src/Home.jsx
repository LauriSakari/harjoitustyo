import LogInForm from './LogInForm'
import SignInForm from './SignInForm'
import AddClimbsForm from './AddClimbsForm'

const Home = ({ user, userInfo, setUser, handleLogout, setUserInfo }) => {
  return (
    <>
      <h1>Home</h1>
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

  <AddClimbsForm userInfo={userInfo} setUserInfo={setUserInfo}/>

</>
      }
    </>
  )
}

export default Home