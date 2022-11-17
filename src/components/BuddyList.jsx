import { Link } from "react-router-dom";

const BuddyList = ({buddyConnection}) => {
	console.log(buddyConnection)
	return (
	<Link to={`/profile/${buddyConnection.id}`}>
		<img src={buddyConnection.profilePicture} alt={buddyConnection.name}/>
	</Link>
	);
};

export default BuddyList;
