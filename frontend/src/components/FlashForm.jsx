import gradesHelper from '../utils/gradesHelper'

//Form to uprage flash grades.

const FlashForm = ({ handleChange, editFlash, text }) => {

  return (
    <form onSubmit={editFlash}>
      <b> Set new {text} flash grade </b>
      <select onChange={handleChange}>
        {gradesHelper.map(element => <option key={element.grade} name={element.grade}> {element.grade} </option>)}
      </select>
      <button type="submit">Save new {text} flash grade</button>
    </form>
  )}
export default FlashForm