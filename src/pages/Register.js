import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const initialFormValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    age: '',
    profilePicture: '',
    about: ''
  }

  const [formValues, setFormValues] = useState(initialFormValues)
  const [validAge, setValidAge] = useState(true)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.age < 18) {
      setValidAge(false)
    } else {
      await RegisterUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        age: formValues.age,
        profilePicture: formValues.profilePicture,
        about: formValues.about
      })
      setFormValues(initialFormValues)
      navigate('/sign-in')
    }
  }
  return (
    <div className="registerPage">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="label">
            <label htmlFor="firstName">First Name:</label>
          </div>
          <input
            onChange={handleChange}
            name="firstName"
            type="text"
            placeholder="Jane"
            value={formValues.firstName}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="lastName">Last Name:</label>
          </div>
          <input
            onChange={handleChange}
            name="lastName"
            type="text"
            placeholder="Patel"
            value={formValues.lastName}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="username">Username:</label>
          </div>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="caliGirl89"
            value={formValues.username}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="password">Password:</label>
          </div>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="create password"
            value={formValues.password}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="email">Email:</label>
          </div>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={formValues.email}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="phoneNumber">Phone Number:</label>
          </div>
          <input
            onChange={handleChange}
            name="phoneNumber"
            type="text"
            placeholder="123-456-7891"
            value={formValues.phoneNumber}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="age">Age:</label>
          </div>
          <input
            onChange={handleChange}
            name="age"
            type="number"
            min="0"
            placeholder="28"
            value={formValues.age}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="profilePicture">Profile Picture:</label>
          </div>
          <input
            onChange={handleChange}
            name="profilePicture"
            type="text"
            placeholder="Input your picture URL"
            value={formValues.profilePicture}
            required
          />
        </div>
        <div>
          <div className="label">
            <label htmlFor="about">About:</label>
          </div>
          <textarea
            rows="10"
            cols="20"
            onChange={handleChange}
            name="about"
            type="text"
            placeholder="My name is Jane and I am looking for a buddy to go on extreme adventures"
            value={formValues.about}
            required
          />
        </div>

        <button>Sign Up</button>
      </form>
      {!validAge && (
        <div>
          <h3>You must be 18 to sign up</h3>
        </div>
      )}
    </div>
  )
}

export default Register
