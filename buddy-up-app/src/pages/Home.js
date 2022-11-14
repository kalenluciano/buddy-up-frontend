import { useState, useEffect } from 'react';
import { BASE_URL } from '../globals';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
	const [categories, setCategories] = useState([]);

	const getAllCategories = async () => {
		const response = await axios.get(`${BASE_URL}/categories`);
		setCategories(response.data);
	};

	useEffect(() => {
		getAllCategories();
	}, []);

	return (
		<div>
			<h1>Activities Around You!</h1>
			{categories.map((category) => (
				<Link key={category._id} to={`/category/${category._id}`}>
					<CategoryCard
						id={category._id}
						name={category.name}
						image={category.image}
					/>
				</Link>
			))}
		</div>
	);
};

export default Home;
