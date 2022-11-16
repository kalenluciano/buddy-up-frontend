import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../globals';
import BuddyList from '../components/BuddyList';
import BuddySwipe from '../components/BuddySwipe';
import SignUp from '../components/SignUp';
import LikeActivityButton from '../components/LikeActivityButton';

const Activity = ({ user, authenticated }) => {
	const [selectActivity, setSelectActivity] = useState({});
	const [likedActivity, toggleLikedActivity] = useState(false);
	const [userActivityList, setUserActivityList] = useState([]);

	let { activity_id } = useParams();

	const activity = async () => {
		const response = await axios.get(
			`${BASE_URL}/activities/${activity_id}`
		);
		setSelectActivity(response.data);
	};

	const getUserActivityList = async () => {
		const response = await axios.get(
			`${BASE_URL}/user-activities/user/${user.id}`
		);
		setUserActivityList(response.data[0].created_list);
	};

	const checkActivityListForLike = () => {
		const userActivity = userActivityList.filter(
			(userActivity) => userActivity.id === selectActivity.id
		);
		if (userActivity[0]) {
			toggleLikedActivity(true);
		}
	};

	useEffect(() => {
		activity();
		if (user) {
			getUserActivityList();
		}
	}, [user]);

	useEffect(() => {
		checkActivityListForLike();
	}, [selectActivity]);

	return (
		<div>
			<img src = {selectActivity.image} alt={selectActivity.name}/>
			<div>
				<h1>{selectActivity.name}</h1>
			</div>
			<h2>{selectActivity.date}</h2>
			<p>{selectActivity.description}</p>
			<h4>
				{selectActivity.streetAddress}
				{selectActivity.streetAddress2}
				{selectActivity.city}
				{selectActivity.state}
				{selectActivity.zipCode}
				{selectActivity.country}
			</h4>
			{!authenticated && !user && <SignUp />}
			{authenticated && user && (
				<LikeActivityButton
					likedActivity={likedActivity}
					toggleLikedActivity={toggleLikedActivity}
					userId={user.id}
					selectActivityId={selectActivity.id}
					setUserActivityList={setUserActivityList}
					userActivityList={userActivityList}
				/>
			)}
			{authenticated && user && likedActivity && (
				<BuddySwipe user={user} />
			)}
			{authenticated && user && likedActivity && <BuddyList />}
		</div>
	);
};

export default Activity;
