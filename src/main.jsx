import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const climbedIndoorBoulderRoutes = [
  {
    id: 1,
    grade: '6A',
    routes: 3
  },
  {
    id: 2,
    grade: '6A+',
    routes: 14
  },
  {
    id: 3,
    grade: '6B',
    routes: 9
  },
  {
    id: 4,
    grade: '6B+',
    routes: 6
  },
  {
    id: 5,
    grade: '6C',
    routes: 3
  },
  {
    id: 6,
    grade: '6C+',
    routes: 2
  },
  {
    id: 7,
    grade: '7A',
    routes: 0
  }

]

ReactDOM.createRoot(document.getElementById('root')).render(
    <App climbedIndoorBoulderRoutes={climbedIndoorBoulderRoutes}/>
)
