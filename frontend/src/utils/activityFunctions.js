import gradeFunctions from './gradeFunctions'

const makeNagatives = (routesToRemove, userInfo) => {
  const routesNegative = routesToRemove.map(grade => {
    return { ...grade, routesClimbed: grade.routesClimbed * -1 }
  })

  const updatedUserinfo = gradeFunctions.findGrade(userInfo, routesNegative)
  return updatedUserinfo
}

const removeActivityFromUserInfo = (userInfo, activityId) => {
  const newUserInfo = userInfo
  const updatedActivities = newUserInfo.activities.filter(activity => activity.id !== activityId)
  return { ...newUserInfo, activities: updatedActivities }
}

export default {
  makeNagatives,
  removeActivityFromUserInfo
}