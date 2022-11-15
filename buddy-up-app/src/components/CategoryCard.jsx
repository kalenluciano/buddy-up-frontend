import {useState} from 'react'
import { useEffect } from 'react';

const CategoryCard = ({id, name, image, allActivities}) => {
	const [activityNumber, setActivityNumber] = useState(0)

	const getTotalActivityNumber = () => {
		let total=0 
		allActivities.forEach((activity) => {
			if (activity.categoryId === id) {
				total += 1;
			}
		});
		setActivityNumber(()=>total);
	};

	useEffect(()=>{
		getTotalActivityNumber()
	}, [allActivities])

	return (
		<div>
			<img src={image} alt={name}/>
			<h4>{name}</h4>
			{!!activityNumber && <p>{activityNumber}</p> }
			
		</div>
	);
};

export default CategoryCard;
