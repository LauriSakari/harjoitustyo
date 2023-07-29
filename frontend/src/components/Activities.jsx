import Activity from './Activity'

const Activities = ({ userInfo, handleDeleteActivity }) => {

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