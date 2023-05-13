
//Form to uprage flash grades.

const FlashForm = ({ handleChange, editFlash, text }) => {
  return (
    <form onSubmit={editFlash}>
      <b> Set a new {text} flash grade </b>
      <select onChange={handleChange} >
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
      <button type="submit">Save new flash grade</button>
    </form>
  )}
export default FlashForm