import { Link } from 'react-router-dom'
import Search from './Search'

const Nav = ({ authenticated, user, handleLogOut }) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Search />
        <Link to="/profile">Profile</Link>
        <Link to="/add-activity">Add Activity</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Search />
      <Link to="/sign-in">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )

  return (
    <div>{authenticated && user ? authenticatedOptions : publicOptions}</div>
  )
}

export default Nav
