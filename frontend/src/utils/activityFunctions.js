import activityService from '../services/activity'

const removeActivityFromUserInfo = (userInfo, activityId) => {
  const newUserInfo = userInfo
  const updatedActivities = newUserInfo.activities.filter(activity => activity.id !== activityId)
  return { ...newUserInfo, activities: updatedActivities }
}

const deleteActivity = (activityId, userId) => {
  activityService.deleteActivity(activityId, userId)
}

export default {
  deleteActivity,
  removeActivityFromUserInfo
}