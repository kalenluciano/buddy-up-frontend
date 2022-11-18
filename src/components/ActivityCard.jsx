import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styling/ActivityCard.css'

const ActivityCard = ({id, image, name, streetAddress, city, state, zipCode, country, date}) => {
	const [calendarDate, setcalendarDate] = useState('')
	const [time, setTime] = useState('')

	const formatDate = () => {
		const dateToConvert = new Date(date);
		const newDate = dateToConvert.toDateString()
		const newTime = dateToConvert.toLocaleTimeString('en-US')
		setcalendarDate(newDate)
		setTime(newTime)
	}

	useEffect(()=>{
		formatDate()
	}, [])

	return (
	<div className='activityCardWithTitle'>
		<h2>{name}</h2>
		<Link className="activityCard" to={`/activity/${id}`} >
		<img className="activityCardImage" src={image} alt ={name}/>
		<div className="activityDescription">
			<div>
				<h3>{calendarDate}</h3>
				<h4>{time}</h4>
			</div>
			<div>
				<p>{streetAddress}</p>
				<p>{city}, {state} {zipCode}, {country}</p>
			</div>
		</div>
		</Link>
	</div>);
};

export default ActivityCard;



