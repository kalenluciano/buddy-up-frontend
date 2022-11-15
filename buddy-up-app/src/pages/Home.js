import { useState, useEffect } from 'react';
import { BASE_URL } from '../globals';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
import { Link } from 'react-router-dom';

const Home = () => {
	const [categories, setCategories] = useState([]);
	const [allActivities, setAllActivities] = useState([]);

	const getAllCategories = async () => {
		const response = await axios.get(`${BASE_URL}/categories`);
		setCategories(response.data);
	};

	const getAllActivities = async () => {
		const response = await axios.get(`${BASE_URL}/activities`);
		setAllActivities(response.data);
	};

	useEffect(() => {
		getAllCategories();
		getAllActivities();
	}, []);

	return (
		<div>
			<h1>Activities & Events Around You!</h1>
			{categories.map((category) => (
				<Link key={category.id} to={`/category/${category.id}`}>
					<CategoryCard
						id={category.id}
						name={category.name}
						image={category.image}
						allActivities={allActivities}
					/>
				</Link>
			))}
		</div>
	);
};

export default Home;
