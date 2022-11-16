import { useParams } from 'react-router-dom';

const Profile = () => {
	const { user_id } = useParams();

	// get user info

	return (
		<div>
			{/* display user info */}
			{/* conditionally render an update and delete profile */}
		</div>
	);
};

export default Profile;
