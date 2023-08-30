const ClimbsTable = ({ routesToShow, style }) => {

  return (
    <table data-testid='climbsTable'>
      <thead>
        <tr>
          <th>Grade</th>
          <th>Sends</th>
        </tr>
      </thead>
      {routesToShow.map(grade => {
        if (style === 'boulder' ? grade.boulder > 0 : grade.sport > 0)
          return (
            <tbody key={grade.grade} data-testid={grade.grade}>
              <tr>
                <td>{grade.grade}</td>
                <td>{style === 'boulder' ? grade.boulder : grade.sport}</td>
              </tr>
            </tbody>)
      }
      )}
    </table>
  )
}
export default ClimbsTable