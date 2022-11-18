import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../globals';
import ActivityCard from '../components/ActivityCard';
import '../styling/Category.css';

const Category = () => {
	let { category_id } = useParams();

	const navigate = useNavigate();

	const [categoriesId, setCategoriesId] = useState(null);
	const [activities, setActivities] = useState([]);

	const getActivitiesByCategoryId = async () => {
		const response = await axios.get(
			`${BASE_URL}/activities/category/${category_id}`
		);
		setCategoriesId(categoriesId);
		setActivities(response.data);
	};
	useEffect(() => {
		getActivitiesByCategoryId();
	}, [categoriesId]);

	return category_id !== null ? (
		<div className="activityList">
			{activities.map((activity) => (
				<ActivityCard
					key={activity.id}
					name={activity.name}
					image={activity.image}
					date={activity.date}
					streetAddress={activity.streetAddress}
					city={activity.city}
					state={activity.state}
					zipCode={activity.zipCode}
					country={activity.country}
					id={activity.id}
				/>
			))}
		</div>
	) : null;
};

export default Category;
