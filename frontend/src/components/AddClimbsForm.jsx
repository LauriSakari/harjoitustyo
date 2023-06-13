import { useFormik } from 'formik'
import userService from '../services/userInfo'
import gradesHelper from '../utils/gradesHelper'

const findGrade = (values, userInfo) => {
  const { grade, style, routesClimbed } = values
  let found = false
  const editedUserInfo = userInfo.climbedRoutes.map(obj => {

    if (obj.grade === grade) {
      if (!obj[style]) {
        obj[style] = 0
      }
      obj[style] += routesClimbed
      found = true
    }
    return obj
  })

  if (editedUserInfo.length === 0) {
    const newUserInfo = (style === 'boulder') ?
      { ...userInfo, climbedRoutes: { grade: grade, boulder: routesClimbed }  } :
      { ...userInfo, climbedRoutes: { grade: grade, sport: routesClimbed } }
    return newUserInfo
  }
  if (!found) {
    const editedClimbs = userInfo.climbedRoutes.concat(style === 'boulder' ?
      { grade: grade, boulder: routesClimbed } :
      { grade: grade, sport: routesClimbed })
    const newUserInfo = { ...userInfo, climbedRoutes: editedClimbs }
    return newUserInfo
  }
  const newUserInfo = { ...userInfo, climbedRoutes: editedUserInfo }
  return newUserInfo
}

const AddClimbsForm = ({ userInfo, setUserInfo, handleNotificationChange }) => {

  const formik = useFormik({
    initialValues: {
      grade: '6A',
      style: 'boulder',
      routesClimbed: ''
    },
    onSubmit: async values => {
      const updatedUserinfo = findGrade(values, userInfo)
      try {
        const result = await userService.editClimbedRoutes(updatedUserinfo)
        setUserInfo(result)
        handleNotificationChange({ message: `Added ${values.routesClimbed} ${values.grade} ${values.style} routes to your climbed routes`, type: 'success' })
        setTimeout(() => {
          handleNotificationChange({ message: null })
        }, 4000)
      } catch (error) {
        handleNotificationChange({ message: `Failed to add routes ${error.message}`, type: 'error' })
        setTimeout(() => {
          handleNotificationChange({ message: null })
        }, 4000)
      }

    }
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>Add Climbs:</div>
        <label>Grade:</label>
        <select
          id='grade'
          name='grade'
          type='grade'
          onChange={formik.handleChange}
          value={formik.values.grade}>
          {gradesHelper.map(element => <option key={element.grade}> {element.grade} </option>)}
        </select>
        <label>Style:</label>
        <select
          id='style'
          name='style'
          type='style'
          onChange={formik.handleChange}
          value={formik.values.style}>
          <option value={'boulder'}>Boulder</option>
          <option value={'sport'}>Sport</option>
        </select>
        <label>Routes climbed:</label>
        <input
          id='routesClimbed'
          name='routesClimbed'
          type='number'
          onChange={formik.handleChange}
          value={formik.values.routesClimbed}/>
        <button type="submit">Submit</button>
      </form>
    </>

  )
}

export default AddClimbsForm