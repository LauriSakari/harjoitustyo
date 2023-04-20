
import IndoorBoulderGrades from "./IndoorBoulderGrades"

const App = ({climbedIndoorBoulderRoutes}) => {

  console.log(climbedIndoorBoulderRoutes)
  return (
  <>
  <h1>Climbing move bank</h1>
  <IndoorBoulderGrades climbedIndoorBoulderRoutes={climbedIndoorBoulderRoutes}/>
  </>
)}

export default App