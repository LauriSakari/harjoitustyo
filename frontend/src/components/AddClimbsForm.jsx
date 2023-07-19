import { useFormik } from 'formik'
import userService from '../services/userInfo'
import gradesHelper from '../utils/gradesHelper'
import { useState } from 'react'
import activityService from '../services/activity'
import * as yup from 'yup'

const addClimbsSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
  notes: yup.string().required('Notes are required'),
})

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
    return (style === 'boulder') ?
      { ...userInfo, climbedRoutes: { grade: grade, boulder: routesClimbed }  } :
      { ...userInfo, climbedRoutes: { grade: grade, sport: routesClimbed } }
  }

  if (!found) {
    const editedClimbs = userInfo.climbedRoutes.concat(style === 'boulder' ?
      { grade: grade, boulder: routesClimbed } :
      { grade: grade, sport: routesClimbed })
    return { ...userInfo, climbedRoutes: editedClimbs }
  }

  return { ...userInfo, climbedRoutes: editedUserInfo }
}

const newRoutesSum = (collectedRoutes) => {
  let sum = 0
  collectedRoutes.forEach(element => {
    sum += element.routesClimbed
  })
  return sum
}


const AddClimbsForm = ({ userInfo, setUserInfo, handleNotificationChange, style }) => {

  const [collectedRoutes, setCollectedRoutes] = useState([])
  const [id, setId] = useState(0)

  const handleRemoveButton = (id) => {
    setCollectedRoutes(collectedRoutes.filter(route => route.id !== id))
  }

  const formik = useFormik({
    initialValues: {
      grade: '6A',
      style: style,
      routesClimbed: '',
      date: '',
      notes: ''
    },
    validationSchema: addClimbsSchema,
    onSubmit: async (values) => {
      const userId = userInfo.id
      const updatedUserinfo = collectedRoutes.reduce((final, values) => {
        return findGrade(values, userInfo)
      }, 0)
      try {
        const activityResult = await activityService.newActivity(collectedRoutes, values, userId)
        const activityId = activityResult.data.id
        updatedUserinfo.activities.push(activityResult.data)
        await userService.editClimbedRoutes(updatedUserinfo, activityId)
        setUserInfo(updatedUserinfo)
        handleNotificationChange({ message: `Added ${newRoutesSum(collectedRoutes)} routes to your climbed routes`, type: 'success' })
        setCollectedRoutes([])
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

  const handleAddButton = () => {

    const values = {
      id: id,
      grade: formik.values.grade,
      style: formik.values.style,
      routesClimbed: formik.values.routesClimbed
    }

    setCollectedRoutes((prevRoutes) => [
      ...prevRoutes,
      values])

    setId((prev) => ++prev)
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>Add Climbs:</div>
        {collectedRoutes.map(addedRoutes => <li key={addedRoutes.id}> Grade: {addedRoutes.grade} Routes climbed: {addedRoutes.routesClimbed}<button type='button' onClick={() => handleRemoveButton(addedRoutes.id)}>Remove</button></li> )}
        <label>Grade:</label>
        <select
          id='grade'
          name='grade'
          type='grade'
          onChange={formik.handleChange}
          value={formik.values.grade}>
          {gradesHelper.map(element => <option key={element.grade}> {element.grade} </option>)}
        </select>

        <label>Routes climbed:</label>
        <input
          id='routesClimbed'
          name='routesClimbed'
          type='number'
          onChange={formik.handleChange}
          value={formik.values.routesClimbed}/>
        <button type="button" onClick={handleAddButton}>Add</button>
        <br/>
        <label>Date:</label>
        <input
          id='date'
          name='date'
          type='date'
          onChange={formik.handleChange}
          value={formik.values.date}/>
        {formik.touched.date && formik.errors.date ? (<div className='signin-error' >{formik.errors.date}</div>) : null}
        <label>Notes:</label>
        <input
          id='notes'
          name='notes'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.notes}/>
        <button type="submit" disabled={collectedRoutes.length === 0}>Submit</button>
      </form>
    </>
  )
}

export default AddClimbsForm