import { Route, Routes } from 'react-router'
import { useState, useEffect } from 'react'
import Category from './pages/Category'
import Profile from './pages/Profile'
import About from './pages/About'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Activity from './pages/Activity'
import Home from './pages/Home'
import Nav from './components/Nav'
import './App.css'
import { CheckSession } from './services/Auth'

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  return (
    <div className="App">
      <header>
        <Nav
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/sign-in"
            element={
              <SignIn
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route path="/activity" element={<Activity />} />
          <Route path="/category" element={<Category />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </main>
    </div>
  )
}

export default App
