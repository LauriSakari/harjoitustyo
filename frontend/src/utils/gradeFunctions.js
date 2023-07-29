import gradesHelper from './gradesHelper'

// Fills any gaps there might be in original list
const fillGaps = (sortedList) => {
  for (let index = 0; index < sortedList.length; index++) {
    if (sortedList[index].grade !== gradesHelper[index].grade) {
      sortedList.splice(index, 0, gradesHelper[index])
    }
  }
  return sortedList
}
// Sorts the climbed routes by grade
const sortByGrade = (routes) => {
  if (!routes) {
    return []
  }
  const sortedByGrade = routes.sort((a, b) => (a.grade > b.grade) ? 1 : -1)
  return sortedByGrade
}

// Sums up whole grade sends with plus grade sends and returns a new list.
const ignorePlus = (climbedRoutes) => {
  return (
    climbedRoutes.map((route, index) => {
      if (climbedRoutes[index + 1] && !route.grade.includes('+')) {
        return { ...route, boulder: route.boulder + climbedRoutes[index + 1].boulder,
          sport: route.sport + climbedRoutes[index + 1].sport }
      }
      if (index === climbedRoutes.length - 1 && !route.grade.includes('+')) {
        return route
      }
    }
    ))
}

// Filters undefineds from ignorePlus returned list to get list of whole grade ascends
const plusIgnored = (climbedRoutes) => {
  const sortedRoutes = sortByGrade(climbedRoutes)
  const prosessedList = fillGaps(sortedRoutes)
  const ignored = ignorePlus(prosessedList)
  const filteredReturnValue = ignored.filter(route => route)
  return filteredReturnValue
}

//shows results with plus grades included
const withPlus = (climbedRoutes) => {
  const sortedRoutes = sortByGrade(climbedRoutes)
  const prosessedList = fillGaps(sortedRoutes)
  return prosessedList
}

const findGrade = (userInfo, routesToHandle) => {
  let updatedUserinfo
  let newList = userInfo.climbedRoutes
  for (let index = 0; index < routesToHandle.length; index++) {
    let found = false

    const element = routesToHandle[index]
    const style = element.style
    newList.forEach((route, i) => {
      if (route.grade !== element.grade) return
      else {
        found = true
        if (!newList[i][style]) {
          newList[i][style] = 0
        }
        const newRoutesClimbed = element.routesClimbed + route[style]
        element.style === 'boulder' ?
          newList[i].boulder = newRoutesClimbed :
          newList[i].sport = newRoutesClimbed
      }
    })
    if (!found) {
      newList.push( (element.style === 'boulder') ?
        { grade: element.grade, boulder: element.routesClimbed } :
        { grade: element.grade, sport: element.routesClimbed })
    }

    updatedUserinfo = { ...userInfo, climbedRoutes: newList }

  }
  return updatedUserinfo
}


export default { fillGaps, sortByGrade, plusIgnored, withPlus, findGrade }