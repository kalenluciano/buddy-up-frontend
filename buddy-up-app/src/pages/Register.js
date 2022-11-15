import {useState} from 'react'
import {RegisterUser} from '../services/Auth'
import {useNavigate} from 'react-router-dom'



const Register = () => {
const navigate = useNavigate()
const initialFormValues={
	firstName: '',
	lastName: '',
	username: '',
	password: '',
	email: '',
	phoneNumber: '',
	age:'',
	profilePicture: '',
	about: '',
}

const [formValues, setFormValues]= useState=(initialFormValues)

const handleChange = (e)=>{
	setFormValues({ ...formValues,[e.target.name]: e.target.value})
}

const handleSubmit = async(e)=>{
	e.preventDefaut()
	await RegisterUser({
		firstname: formValues.name,
		lastName: formValues.lastName,
	username: formValues.username,
	password: formValues.password,
	email: formValues.email,
	phoneNumber: formValues.phoneNumber,
	age:formValues.age,
	profilePicture: formValues.profilePicture,
	about: formValues.about,
		
	})
	setFormValues(initialFormValues)
	navigate('/signin')
}
	return (<div>
		<form onSubmit={handleSubmit}>
			<div>
				<lablel htmlFor="name">First Name</lablel>
				<input
				onChange ={handleChange}
				firstName="firstName"
				type="text"
				placeholder='Jane'
				value={formValues.firstName}
				required/>
			</div>
			<div>
				<label htmlFor="lastName">Last Name</label>
				<input
				onChange ={handleChange}
				lastName="lastName"
				type="text"
				placeholder='Patel'
				value={formValues.lastName}
				required/>
			</div>
			<div>
				<label htmlFor="username">username Name</label>
				<input
				onChange ={handleChange}
				username="username"
				type="text"
				placeholder='caliGirl89'
				value={formValues.username}
				required/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
				onChange ={handleChange}
				password="password"
				type="text"
				placeholder=''
				value={formValues.password}
				required/>
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input
				onChange ={handleChange}
				email="email"
				type="text"
				placeholder='janePatel@mail.com'
				value={formValues.email}
				required/>
			</div>
			<div>
				<label htmlFor="phoneNumber">Phone Number</label>
				<input
				onChange ={handleChange}
				phoneNumber="phoneNumber"
				type="text"
				placeholder='555-789-2460'
				value={formValues.phoneNumber}
				required/>
			</div>
			<div>
				<label htmlFor="age">Age</label>
				<input
				onChange ={handleChange}
				age="age"
				type="text"
				placeholder='28'
				value={formValues.age}
				required/>
			</div>
			<div>
				<label htmlFor="profilePicture">Profile Picture</label>
				<input
				onChange ={handleChange}
				profilePicture="profilePicture"
				type="text"
				placeholder='Input your picture URL'
				value={formValues.profilePicture}
				required/>
			</div>
			<div>
				<label htmlFor="about">About</label>
				<input
				onChange ={handleChange}
				about="about"
				type="text"
				placeholder='My name is Jane and I am looking for a buddy to go on extreme adventures'
				value={formValues.about}
				required/>
			</div>
<button
	disabled={
		formValues.age<18
	}>
		Sign Up
</button>


		</form>
	</div>);
};

export default Register;
