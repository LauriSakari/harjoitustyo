import { useFormik } from 'formik'
import userService from './services/userInfo'

const findGrade = (values, userInfo) => {
  const { grade, style, routesClimbed } = values

  const editedUserInfo = userInfo.climbedRoutes.map(obj => {

    if (obj.grade === grade) {
      console.log('g.grade ', obj.grade, 'grade ', grade)
      console.log('g.grade', obj.grade[style])
      console.log('g[style]', obj[style])
      obj[style] += routesClimbed
    }
    return obj
  })
  const newUserInfo = { ...userInfo, climbedRoutes: editedUserInfo }
  return newUserInfo
}

const AddClimbsForm = ({ userInfo, setUserInfo }) => {

  const formik = useFormik({
    initialValues: {
      grade: '6A',
      style: 'boulder',
      routesClimbed: ''
    },
    onSubmit: async values => {
      console.log('values ', values)
      console.log('USERINFO! ', userInfo)
      const updatedUserinfo = findGrade(values, userInfo)
      console.log('updatedUserinfo', updatedUserinfo)
      const result = await userService.editClimbedRoutes(updatedUserinfo)
      console.log('result', result)
      setUserInfo(result)
    }
  })
  return (
    <>
      <div>Add Climbs</div>
      <form onSubmit={formik.handleSubmit}>
        <label>Grade</label>
        <select
          id='grade'
          name='grade'
          type='grade'
          onChange={formik.handleChange}
          value={formik.values.grade}>
          <option> 6A </option>
          <option> 6A+ </option>
          <option> 6B </option>
          <option> 6B+ </option>
          <option> 6C </option>
          <option> 6C+ </option>
          <option> 7A </option>
          <option> 7A+ </option>
          <option> 7B </option>
          <option> 7B+ </option>
          <option> 7C </option>
          <option> 7C+ </option>
          <option> 8A </option>
          <option> 8A+ </option>
          <option> 8B </option>
          <option> 8B+ </option>
          <option> 8C </option>
          <option> 8C+ </option>
          <option> 9A </option>
        </select>
        <label>Style</label>
        <select
          id='style'
          name='style'
          type='style'
          onChange={formik.handleChange}
          value={formik.values.style}>
          <option value={'boulder'}>Boulder</option>
          <option value={'sport'}>Sport</option>
        </select>
        <label>Routes climbed</label>
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