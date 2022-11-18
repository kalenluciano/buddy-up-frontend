import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../globals';
import BuddySwipe from '../components/BuddySwipe';
import SignUp from '../components/SignUp';
import LikeActivityButton from '../components/LikeActivityButton';
import Client from '../services/api';
import '../styling/Activity.css';

const Activity = ({ user, authenticated }) => {
	const [selectActivity, setSelectActivity] = useState({});
	const [likedActivity, toggleLikedActivity] = useState(false);
	const [userActivityList, setUserActivityList] = useState([]);
	const [calendarDate, setcalendarDate] = useState('');
	const [time, setTime] = useState('');

	let { activity_id } = useParams();
	let navigate = useNavigate();

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

	const formatDate = () => {
		const dateToConvert = new Date(selectActivity.date);
		const newDate = dateToConvert.toDateString();
		const newTime = dateToConvert.toLocaleTimeString('en-US');
		setcalendarDate(newDate);
		setTime(newTime);
	};

	const handleUpdateClick = () => {
		navigate(`/update-activity/${selectActivity.id}`);
	};

	const handleDeleteClick = async () => {
		const deletedActivityCategoryId = selectActivity.categoryId;
		await Client.delete(`${BASE_URL}/activities/${selectActivity.id}`);
		navigate(`/category/${deletedActivityCategoryId}`);
	};

	useEffect(() => {
		activity();
		if (user) {
			getUserActivityList();
		}
	}, [user]);

	useEffect(() => {
		checkActivityListForLike();
		formatDate();
	}, [selectActivity, userActivityList]);

	return (
		<div className="activity">
			<div className="activityInfo">
				<img
					className="activityImage"
					src={selectActivity.image}
					alt={selectActivity.name}
				/>
				<div className="activityDetails">
					<h1>{selectActivity.name}</h1>
					<h2>{calendarDate}</h2>
					<h3>{time}</h3>
					<p>{selectActivity.description}</p>
					<p>{selectActivity.streetAddress}</p>
					<p>{selectActivity.streetAddress2}</p>
					<p>
						{selectActivity.city}, {selectActivity.state}{' '}
						{selectActivity.zipCode} {selectActivity.country}
					</p>
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
					{authenticated && user.id === selectActivity.userId && (
						<button onClick={handleUpdateClick}>
							Update Activity
						</button>
					)}
					{authenticated && user.id === selectActivity.userId && (
						<button onClick={handleDeleteClick}>
							Delete Activity
						</button>
					)}
				</div>
			</div>
			{authenticated && user && likedActivity && (
				<BuddySwipe
					authenticated={authenticated}
					user={user}
					selectActivity={selectActivity}
				/>
			)}
		</div>
	);
};

export default Activity;
