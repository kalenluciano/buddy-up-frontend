import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../globals';
import { useEffect, useState } from 'react';
import ActivityCard from '../components/ActivityCard';
import { Link } from 'react-router-dom';

const SearchResults = () => {
	const [searchResults, setSearchResults] = useState([]);

	const { activity } = useParams();

	const getSearchResults = async () => {
		const response = await axios.get(`${BASE_URL}/activities`);
		const activitySearchResults = response.data;
		const filteredResults = activitySearchResults.filter(
			(activitySearchResult) =>
				activitySearchResult.toLowerCase() === activity.toLowerCase()
		);
		setSearchResults(filteredResults);
	};

	useEffect(() => {
		getSearchResults();
	}, []);

	return (
		<div>
			{searchResults.map((activitySearchResult) => (
				<Link
					key={activitySearchResult.id}
					to={`/activity/${activitySearchResult.id}`}
				>
					<ActivityCard />
				</Link>
			))}
		</div>
	);
};

export default SearchResults;
