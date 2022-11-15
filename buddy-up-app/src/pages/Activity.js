import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import BuddyList from '../components/BuddyList'
import BuddySwipe from '../components/BuddySwipe'
import SignUp from '../components/SignUp'

const Activity = ({ user, authenticated }) => {
  let { activity_id } = useParams()
  const [selectActivity, setSelectActivity] = useState({})

  const activity = async () => {
    const response = await axios.get(`${BASE_URL}/activities/${activity_id}`)
    console.log(response.data)
    setSelectActivity(response.data)
  }

  useEffect(() => {
    activity()
  }, [])

  return (
    <div>
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
      {authenticated && user ? <BuddySwipe /> : <SignUp />}
      {authenticated && user ? <BuddyList /> : null}
    </div>
  )
}

export default Activity
