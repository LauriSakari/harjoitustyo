import Activity from './Activity'

const Activities = ({ userInfo, handleDeleteActivity }) => {

  return (
    <>
      <h1>Your Activity</h1>
      {userInfo.activities.map(activity => {
        return <li key={activity.id}>
          <Activity activity={activity} handleDeleteActivity={handleDeleteActivity}/>
        </li>
      })}
    </>
  )
}

export default Activities