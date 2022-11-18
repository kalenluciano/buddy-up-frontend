import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const SignIn = ({ toggleAuthenticated, setUser }) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [auth, setAuth] = useState(true)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formValues.email === '' || formValues.password === '') {
      setAuth(false)
      console.log(formValues.email, formValues.password)
    } else {
      const payload = await SignInUser(formValues)
      setFormValues({ email: '', password: '' })
      setUser(payload)
      toggleAuthenticated(true)
      navigate('/')
    }
  }

  return (
    <div className="signInPage">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="loginLabel">
            <label htmlFor="email">Email</label>
          </div>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
            required
          />
        </div>
        <div>
          <div div className="loginLabel">
            <label htmlFor="password">Password</label>
          </div>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formValues.password}
            placeholder="enter a password"
            required
          />
        </div>
        <button>LOGIN</button>
      </form>
      {!auth && (
        <div>
          <h3>Provide your email and password</h3>
        </div>
      )}
    </div>
  )
}
export default SignIn
