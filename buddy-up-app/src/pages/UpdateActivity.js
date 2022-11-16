import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../globals';
import Client from '../services/api';

const UpdateActivity = ({ user }) => {
	const { activity_id } = useParams();
	let navigate = useNavigate();
	const initialFormValues = {
		userId: user?.id,
		activityId: activity_id,
		name: '',
		description: '',
		streetAddress: '',
		streetAddress2: '',
		city: '',
		state: '',
		zipCode: '',
		country: '',
		date: '',
		time: '',
		image: ''
	};

	const [formValues, setFormValues] = useState(initialFormValues);
	const [categories, setCategories] = useState([]);
	const [activity, setActivities] = useState([]);

	const getActivityByActivityId = async () => {
		const activity = await axios.get(
			`${BASE_URL}/activities/${activity_id}`
		);
		setActivities(activity.data);
		const date = new Date(activity.data.date);
		let [month, day, year] = [
			date.getMonth(),
			date.getDate(),
			date.getFullYear()
		];
		let [hour, minutes] = [date.getHours(), date.getMinutes()];
		if (month.toString().length <= 1) {
			month = `0${month}`;
		}
		if (day.toString().length <= 1) {
			day = `0${day}`;
		}
		const yearMonthDay = `${year}-${month}-${day}`;
		const hourMinute = `${hour}:${minutes}`;
		delete activity.data.date;
		setFormValues({
			...activity.data,
			date: yearMonthDay,
			time: hourMinute
		});
	};
	const getCategories = async () => {
		const categories = await axios.get(`${BASE_URL}/categories`);
		setCategories(categories.data);
	};

	const handleChange = (event) => {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		formValues.categoryId = parseInt(formValues.categoryId);
		formValues.date = new Date(`${formValues.date}T${formValues.time}`);
		delete formValues.time;
		const updateActivity = await Client.put(
			`${BASE_URL}/activities/${activity_id}`,
			formValues
		)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				throw error;
			});

		setFormValues(initialFormValues);

		navigate(`/activity/${activity_id}`);
	};

	useEffect(() => {
		getCategories();
		getActivityByActivityId();
	}, [user]);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Update New Activity</h1>
				<div>
					<label htmlFor="name">Activity Name: </label>
					<input
						type="text"
						name="name"
						onChange={handleChange}
						value={formValues.name}
					/>
				</div>
				<div>
					<label htmlFor="categoryId">Add Category: </label>
					<select
						name="categoryId"
						onChange={handleChange}
						value={formValues.categoryId}
					>
						<option defaultValue="select category">
							Select Category
						</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="description">Description: </label>
					<textarea
						name="description"
						cols="30"
						rows="5"
						onChange={handleChange}
						value={formValues.description}
					></textarea>
				</div>
				<div>
					<label>Date: </label>
					<input
						type="date"
						name="date"
						onChange={handleChange}
						value={formValues.date}
					/>
				</div>
				<div>
					<label>Time: </label>
					<input
						type="time"
						name="time"
						onChange={handleChange}
						value={formValues.time}
					/>
				</div>
				<div>
					<label>Street Address: </label>
					<input
						type="text"
						name="streetAddress"
						onChange={handleChange}
						value={formValues.streetAddress}
					/>
				</div>
				<div>
					<label>Street Address 2: </label>
					<input
						type="text"
						name="streetAddress2"
						onChange={handleChange}
						value={formValues.streetAddress2}
					/>
				</div>
				<div>
					<label>City: </label>
					<input
						type="text"
						name="city"
						onChange={handleChange}
						value={formValues.city}
					/>
				</div>
				<div>
					<label>State: </label>
					<input
						type="text"
						name="state"
						onChange={handleChange}
						value={formValues.state}
					/>
				</div>
				<div>
					<label>Zip Code: </label>
					<input
						type="number"
						name="zipCode"
						onChange={handleChange}
						value={formValues.zipCode}
					/>
				</div>
				<div>
					<label>Country: </label>
					<input
						type="text"
						name="country"
						onChange={handleChange}
						value={formValues.country}
					/>
				</div>
				<div>
					<label>Image URL: </label>
					<input
						type="text"
						name="image"
						onChange={handleChange}
						value={formValues.image}
					/>
				</div>

				<button>Submit</button>
			</form>
		</div>
	);
};

export default UpdateActivity;
