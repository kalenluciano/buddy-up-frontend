import {useState} from 'react'
import axios from 'axios';
import { BASE_URL } from '../globals';
import { useEffect } from 'react';

const CategoryCard = ({id, name, image}) => {
	const [allActivities, setAllActivities] = useState([])
	const [activityNumber, setActivityNumber] = useState(0)
	
	const getAllActivities = async () => {
		const response = await axios.get(`${BASE_URL}/activites`)
		setAllActivities(response.data)
	}

	const getTotalActivityNumber = () => {
		let total = 0
		allActivities.forEach((activity)=>{
			if (activity.categoryId === id) {
				total += 1
			}
		})
		setActivityNumber(total)
	}

	useEffect(()=>{
		getAllActivities()
		getTotalActivityNumber()
	}, [])

	return (
		<div>
			<img src={image} alt={name}/>
			<h4>{name}</h4>
			<p>{activityNumber}</p>
		</div>
	);
};

export default CategoryCard;
