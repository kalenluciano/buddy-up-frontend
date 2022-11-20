import { Link } from "react-router-dom";
import "../styling/BuddyList.css"

const BuddyList = ({buddyConnection}) => {
	console.log(buddyConnection)
	return (
	<Link to={`/profile/${buddyConnection.id}`}>
		<img className="buddyMatchImage" src={buddyConnection.profilePicture} alt={buddyConnection.name}/>
	</Link>
	);
};

export default BuddyList;
