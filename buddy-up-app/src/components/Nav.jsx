import { Link } from 'react-router-dom'
import Search from './Search'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    searchQueryActivity = searchQuery
    setSearchQuery('')
    navigate(`/search-results/${searchQueryActivity}`)
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }
  
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Search onSubmit={handleSubmit} handleChange={handleChange} value={searchQuery}/>
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
      <Search onSubmit={handleSubmit} handleChange={handleChange} value={searchQuery}/>
      <Link to="/sign-in">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )

  return (
    <div>{authenticated && user ? authenticatedOptions : publicOptions}</div>
  )
}

export default Nav
