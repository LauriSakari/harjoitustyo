import Activity from './Activity'
import activityFunctions from '../utils/activityFunctions'
import gradeFunctions from '../utils/gradeFunctions'

const Activities = ({ userInfo, setUserInfo }) => {

  const makeNagatives = (routesToRemove) => {

    console.log('MakeNegatives toimii', routesToRemove)
    const routesNegative = routesToRemove.map(grade => {
      return { ...grade, routesClimbed: grade.routesClimbed * -1 }
    })

    console.log('routesNegative', routesNegative)

    // const updatedUserinfo = routesNegative.reduce((final, values) => {
    //   return gradeFunctions.findGrade(values, userInfo)
    // }, 0)

    const updatedUserinfo = gradeFunctions.findGrade(userInfo, routesNegative)

    console.log('updatedUserinfo ', updatedUserinfo)
    return updatedUserinfo
  }

  const handleDeleteActivity = (activityId, userId, routesToRemove) => {
    console.log('routesToRemove ', routesToRemove)
    activityFunctions.deleteActivity(activityId, userId)
    const newUserInfo = makeNagatives(routesToRemove)
    setUserInfo(activityFunctions.removeActivityFromUserInfo(newUserInfo, activityId))
  }

  return (
    <>
      {userInfo.activities.map(activity => {
        return <li key={activity.id}>
          <Activity activity={activity} handleDeleteActivity={handleDeleteActivity}/>
        </li>
      })}
    </>
  )
}

export default Activities