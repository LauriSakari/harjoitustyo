import gradesHelper from '../utils/gradesHelper'

//Form to uprage flash grades.
const FlashForm = ({ handleChange, editFlash, text }) => {

  return (
    <form onSubmit={editFlash}>
      <label htmlFor='selectGrade'> Set new {text} flash grade </label>
      <select onChange={handleChange} data-testid='flashForm' id='selectGrade'>
        <option hidden>Choose here</option>
        {gradesHelper.map(element => <option key={element.grade} name={element.grade}> {element.grade} </option>)}
      </select>
      <button type="submit">Save new {text} flash grade</button>
    </form>
  )}
export default FlashForm