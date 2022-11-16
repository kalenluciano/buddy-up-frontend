import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../globals";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const BuddySwipe = ({user, selectActivity}) => {
	const [allUserActivitiesList, setAllUserActivitiesList] = useState([])
	
	const getAllUserActivities = async () => {
		const response = await axios.get(`${BASE_URL}/user-activities/activity/${selectActivity.id}`)
		const userActivitiesListFiltered = response.data[0].activities_user_list.filter(userActivity => userActivity.id !== user.id)
		setAllUserActivitiesList(userActivitiesListFiltered)
	}

	useEffect(() => {
		getAllUserActivities()
	}, [])

	return (
		<div>
			<h1>Buddy Swipe</h1>
			{allUserActivitiesList.map((userBuddy) => (
				<UserCard key={userBuddy.id} userBuddy={userBuddy}/>
			))}
		</div>
		);
};

export default BuddySwipe;
