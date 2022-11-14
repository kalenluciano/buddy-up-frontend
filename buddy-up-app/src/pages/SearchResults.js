import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../globals';
import { useState } from 'react';

const SearchResults = () => {
	const [searchResults, setSearchResults] = useState('');

	const { activity } = useParams();

	const getSearchResults = async () => {
		const response = await axios.get(`${BASE_URL}/activities`);
		setSearchResults(response.data);
	};

	return <div></div>;
};

export default SearchResults;
