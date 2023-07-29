import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/activities'


const newActivity = async ( routesClimbed, values, userId ) => {
  const { date, notes, style } = values
  const newActivity = {
    date: date,
    notes: notes,
    style: style,
    user: userId,
    routesClimbed: routesClimbed
  }

  return await axios.post(baseUrl, newActivity)
}

const deleteActivity = async (activityId, userId) => {
  return await axios.delete(`${baseUrl}/${activityId}`, userId)
}

export default {
  newActivity,
  deleteActivity
}