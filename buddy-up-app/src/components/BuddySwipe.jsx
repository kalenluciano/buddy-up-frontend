import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../globals";

const BuddySwipe = ({user, selectActivity}) => {
	const [allUserActivitiesList, setAllUserActivitiesList] = useState([])
	const [userActivitiesListBySelectActivityId, setUserActivitiesListBySelectActivityId] = useState([])

	const getAllUserActivities = async () => {
		const response = await axios.get(`${BASE_URL}/user-activities`)
		setAllUserActivitiesList(response.data)
	}

	const filterUserActivitiesByActivityId = async () => {
		const userActivitiesBySelectActivityId = allUserActivitiesList.filter(userActivity => userActivity.activityListedId === selectActivity.id && userActivity.userCreatedId !== user.id)
		setUserActivitiesListBySelectActivityId(userActivitiesBySelectActivityId)
	}

	useEffect(() => {
		getAllUserActivities()
	}, [])

	useEffect(() => {
		filterUserActivitiesByActivityId()
	}, [allUserActivitiesList])

	return (
		<div>
			<h1>Buddy Swipe</h1>
		</div>
		);
};

export default BuddySwipe;
