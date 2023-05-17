import { useState } from 'react'

const BoulderGrades = ({ userInfo }) => {
  const [showPlus, setShowPlus] = useState(true)

  if (!userInfo.climbedRoutes) return <div>Add some climbs</div>

  // Sorts the climbed routes and gives feedback, starting upwards from flashgrade
  const sorting = () => {
    if (!userInfo.climbedRoutes) return <div>No sends yet</div>

    const sortedByGrade = userInfo.climbedRoutes.sort((a, b) => (a.grade > b.grade) ? 1 : -1)

    return (
      sortedByGrade.map((route, index) => {
        if (sortedByGrade[index + 1] && route.grade >= userInfo.boulderFlashGrade && sortedByGrade[index + 1].boulder > 0) {
          const comparison = route.boulder - (sortedByGrade[index + 1].boulder * 3)
          if (comparison < -3) {
            return <p key={route.grade}>You can climb { comparison * -1 + 3 } routes of grade { route.grade } to balance your move bank and move on to work on your next { sortedByGrade[index + 1].grade}</p>
          }
          if (comparison > 3) {
            return <p key={route.grade}>You have plenty of { route.grade } grades in your move bank, try to climb some { sortedByGrade[index + 1].grade} grades</p>
          }
          if (comparison >= 0) {
            return <p key={route.grade}>You are all set to climb another { sortedByGrade[index + 1].grade}</p>
          }
          return <p key={route.grade}>Your move bank is missing only { comparison * -1 } routes of { route.grade } grades to be ready for another { sortedByGrade[index + 1].grade}</p>
        }
      })
    )
  }

  // Sums up whole grade sends with plus grade sends and returns a new list.
  const ignorePlus = () => {
    return (
      userInfo.climbedRoutes.map((route, index) => {
        if (userInfo.climbedRoutes[index + 1] && !route.grade.includes('+')) {
          return { ...route, boulder: route.boulder + userInfo.climbedRoutes[index + 1].boulder }
        }
        if (index === userInfo.climbedRoutes.length - 1) {
          return route
        }
      }
      ))
  }

  // Filters undefineds from ignorePlus returned list to get list of whole grade ascends
  const plusIgnored = () => {
    const ignored = ignorePlus()
    return ignored.filter(route => route)
  }

  return (
    <>
      {/* Shows all of the climbed grades. Plus grades can be toggled by pushing the button */}
      <h3>Different boulder grades climbed</h3>
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Sends</th>
          </tr>
        </thead>
        {userInfo.climbedRoutes.map(grade => {
          if (grade.boulder > 0)
            return (
              <tbody key={grade.grade}>
                <tr>
                  <td>{grade.grade}</td>
                  <td>{grade.boulder}</td>
                </tr>
              </tbody>)
        }
        )}
      </table>
      {/* Button to toggle whether the plus grades are shown and shows feedback */}
      { showPlus ? sorting() : sorting(plusIgnored()) }
      <button type="button" onClick={() => { setShowPlus(!showPlus) }}>
        {showPlus ? 'Ignore "plus" grades' : 'Include "plus" grades' }</button>
    </>
  )
}

export default BoulderGrades