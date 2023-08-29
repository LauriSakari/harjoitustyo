import {
  Link
} from 'react-router-dom'

const Navbar = (handleLogout) => {
  return (
    <div className='navbar'>
      <Link to="/" data-testid='homeLink'>Home</Link>
      <Link to="/boulder" data-testid='boulderLink'>Boulder</Link>
      <Link to="/sport" data-testid='sportLink'>Sport</Link>
      <Link to="/activity" data-testid='activityLink'>Activity</Link>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )}

export default Navbar