import { useState } from 'react'

const Activity = (props) => {
  const [showMore, setShowMore] = useState(false)
  const activity = props.activity

  const handleRemoveActivity = (activityId, userId, routesToRemove) => {
    if (window.confirm('Are you sure you want to remove this activity')) {
      props.handleDeleteActivity(activityId, userId, routesToRemove)
    }
  }

  let style = ''
  let sum = 0

  activity.routesClimbed.forEach((grade) => {
    style = grade.style
    sum += grade.routesClimbed
  })

  return (
    <>
    Date: { new Date(activity.date).toLocaleDateString()}
      {' '} { sum } { style } {sum > 1 ? 'routes climbed' : 'route climbed'}
      {showMore &&
      <>
        {activity.routesClimbed.map(grade => {
          return <p key={grade._id}>{grade.grade} {grade.style} {grade.routesClimbed}</p>
        })}
        <p>Notes: {activity.notes}</p>
        <button onClick={() => handleRemoveActivity(activity.id, activity.user, activity.routesClimbed)}>Remove</button>
        <button onClick={() => setShowMore(false)}>Show less</button>
      </>
      }
      {!showMore && <button onClick={() => setShowMore(true)}>Show more</button>}
    </>)
}

export default Activity