

const Feedback = ({ routes, flashGrade, style }) => {
  console.log('routes', routes)
  console.log('flash', flashGrade)
  console.log('style', style)
  if (!routes) return <div>No sends yet</div>

  return (
    routes.map((route, index) => {
      if (routes[index + 1] && route.grade >= flashGrade && (style === 'boulder' ? routes[index + 1].boulder > 0 : routes[index + 1].sport > 0)) {
        const comparison = style === 'boulder' ? route.boulder - (routes[index + 1].boulder * 3) : route.sport - (routes[index + 1].sport * 3)
        if (comparison < -3) {
          return <p key={route.grade}>You can climb { comparison * -1 + 3 } routes of grade { route.grade } to balance your move bank and move on to work on your next { routes[index + 1].grade}</p>
        }
        if (comparison > 3) {
          return <p key={route.grade}>You have plenty of { route.grade } grades in your move bank, try to climb some { routes[index + 1].grade} grades</p>
        }
        if (comparison >= 0) {
          return <p key={route.grade}>You are all set to climb another { routes[index + 1].grade}</p>
        }
        return <p key={route.grade}>Your move bank is missing only { comparison * 1 } routes of { route.grade } grades to be ready for another { routes[index + 1].grade}</p>
      }
    })
  )
}
export default Feedback