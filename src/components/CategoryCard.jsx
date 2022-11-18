import {useState} from 'react'
import { useEffect } from 'react';
import '../styling/CategoryCard.css'

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
		<div className='categoryCard'>
			<img className='categoryCardImage' src={image} alt={name}/>
			<div className='categoryDescription'>
				<h4>{name}</h4>
				<p>{activityNumber}</p>
			</div>
		</div>
	);
};

export default CategoryCard;
