import { useFormik } from 'formik'
import userService from '../services/userInfo'
import gradesHelper from '../utils/gradesHelper'
import { useState } from 'react'
import activityService from '../services/activity'
import gradeFunctions from '../utils/gradeFunctions'
import timeoutNotification from '../utils/timeoutNotification'
import * as yup from 'yup'

const addClimbsSchema = yup.object().shape({
  date: yup.date().required('Date is required')
})


const newRoutesSum = (collectedRoutes) => {
  let sum = 0
  collectedRoutes.forEach(element => {
    sum += element.routesClimbed
  })
  return sum
}


const AddClimbsForm = ({ userInfo, setUserInfo, setNotification, style }) => {

  const [collectedRoutes, setCollectedRoutes] = useState([])
  const [id, setId] = useState(1)

  const handleRemoveButton = (id) => {
    setCollectedRoutes(collectedRoutes.filter(route => route.id !== id))
  }

  const formik = useFormik({
    initialValues: {
      grade: '6A',
      style: style,
      routesClimbed: 1,
      date: '',
      notes: ''
    },
    validationSchema: addClimbsSchema,
    onSubmit: async (values) => {
      const userId = userInfo.id
      const updatedUserinfo = gradeFunctions.findGrade(userInfo, collectedRoutes)
      try {
        const activityResult = await activityService.newActivity(collectedRoutes, values, userId)
        const activityId = activityResult.data.id
        updatedUserinfo.activities.push(activityResult.data)

        await userService.editClimbedRoutes(updatedUserinfo, activityId)
        setUserInfo(updatedUserinfo)
        timeoutNotification({
          message: `Added ${newRoutesSum(collectedRoutes)} routes to your climbed routes`,
          type: 'success' },
        setNotification )
        setCollectedRoutes([])

      } catch (error) {
        timeoutNotification({
          message: `Failed to add routes ${error.message}`,
          type: 'error' },
        setNotification)
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
      <h3>Add Climbs:</h3>
      <form onSubmit={formik.handleSubmit}>
        {collectedRoutes.map(addedRoutes => <li key={addedRoutes.id}> Grade: {addedRoutes.grade} Routes climbed: {addedRoutes.routesClimbed}<button type='button' onClick={() => handleRemoveButton(addedRoutes.id)}>Remove</button></li> )}
        <label htmlFor='grade'>Grade:</label>
        <select
          id='grade'
          name='grade'
          type='grade'
          onChange={formik.handleChange}
          value={formik.values.grade}>
          {gradesHelper.map(element => <option key={element.grade}> {element.grade} </option>)}
        </select>

        <label htmlFor='routesClimbed'>Routes climbed:</label>
        <input
          id='routesClimbed'
          name='routesClimbed'
          type='number'
          min={1}
          onChange={formik.handleChange}
          value={formik.values.routesClimbed}/>
        <button type="button" data-testid='addRoutesButton' onClick={handleAddButton}>Add</button>
        <br/>
        <label htmlFor='date'>Date:</label>
        <input
          id='date'
          name='date'
          type='date'
          onChange={formik.handleChange}
          value={formik.values.date}/>
        {formik.touched.date && formik.errors.date ? (<div className='signin-error' >{formik.errors.date}</div>) : null}
        <label htmlFor='notes'>Notes:</label>
        <input
          id='notes'
          name='notes'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.notes}/>
        <button type="submit" data-testid='submitRoutesButton' disabled={collectedRoutes.length === 0}>Submit</button>
      </form>
    </>
  )
}

export default AddClimbsForm