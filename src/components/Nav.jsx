import { Link } from 'react-router-dom'
import Search from './Search'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchQueryActivity = searchQuery
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
        <div className='navAfter'>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to={`/profile/${user.id}`}>Profile</Link>
          <Link to="/add-activity">Add Activity</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
          <Search onSubmit={handleSubmit} handleChange={handleChange} value={searchQuery}/>
        </div>
      
      
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <div className='navBefore'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/sign-in">Login</Link>
        <Link to="/register">Register</Link>
        <Search onSubmit={handleSubmit} handleChange={handleChange} value={searchQuery}/>
      </div>
    </nav>
  )

  return (
    <div>{authenticated && user ? authenticatedOptions : publicOptions}</div>
  )
}

export default Nav
