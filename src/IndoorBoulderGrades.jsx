const IndoorBoulderGrades = ({ climbedIndoorBoulderRoutes }) => {
console.log(climbedIndoorBoulderRoutes)
  return (
    <>
    <h2>Different grades climbed</h2>
    <table>
    <thead>
        <tr>
            <th>Grade</th>
            <th>Sends</th>
        </tr>
    </thead>
    {climbedIndoorBoulderRoutes.map(grade => {
      return (
        <tbody key={grade.id}>
          <tr>
            <td>{grade.grade}</td>
            <td>{grade.routes}</td>
          </tr>
        </tbody>)
        } 
        )}
    </table>
    </>
  )

}

export default IndoorBoulderGrades