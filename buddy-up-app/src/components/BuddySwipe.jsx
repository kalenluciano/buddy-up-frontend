import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../globals";
import UserCard from "./UserCard";

const BuddySwipe = ({user, selectActivity}) => {
	const [poolOfBuddies, setPoolOfBuddies] = useState([])
	const [potentialBuddy, setPotentialBuddy] = useState({})
	const [noMorePotentialBuddies, toggleNoMorePotentialBuddies] = useState(false)
	
	const getAllUserActivities = async () => {
		const response = await axios.get(`${BASE_URL}/user-activities/activity/${selectActivity.id}`)
		const userActivitiesListFiltered = response.data[0].activities_user_list.filter(userActivity => userActivity.id !== user.id)
		setPoolOfBuddies(userActivitiesListFiltered)
	}

	const getRandomPotentialBuddy = () => {
		const randomBuddy = poolOfBuddies[Math.floor(Math.random() * poolOfBuddies.length)]
		setPotentialBuddy(randomBuddy)
	}

	const getNextUser = () => {
		console.log('Next')
	}

	const addUserToBuddyList = () => {
		console.log("Added")
	}

	useEffect(() => {
		getAllUserActivities()
	}, [])

	useEffect(() => {
		if (poolOfBuddies.length > 0) {
			getRandomPotentialBuddy()
			toggleNoMorePotentialBuddies(false)
		} else {
			toggleNoMorePotentialBuddies(true)
		}
	}, [poolOfBuddies])

	return (
		<div>
			<h1>Buddy Swipe</h1>
			{noMorePotentialBuddies ? <h3>Waiting for More Buddies...</h3> : <UserCard userBuddy={potentialBuddy} getNextUser={getNextUser} addUserToBuddyList={addUserToBuddyList} />}
		</div>
		);
};

export default BuddySwipe;
