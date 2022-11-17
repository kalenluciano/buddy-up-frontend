import axios from 'axios'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import UserCard from './UserCard'
import Client from '../services/api'

const BuddySwipe = ({ user, selectActivity }) => {
  const [poolOfBuddies, setPoolOfBuddies] = useState([])
  const [potentialBuddy, setPotentialBuddy] = useState({})
  const [noMorePotentialBuddies, toggleNoMorePotentialBuddies] = useState(false)
  const [clickNext, toggleClickNext] = useState(false)
  const [clickBuddyUp, toggleClickBuddyUp] = useState(false)


  const getPoolOfBuddies = async () => {
	const listOfActivityRejects = []
	let compare = []
	let match;
    const response = await axios.get(
      `${BASE_URL}/user-activities/activity/${selectActivity.id}`
    )
    const userActivitiesListFiltered =
      response.data[0].activities_user_list.filter(
        (userActivity) => userActivity.id !== user.id
      )
    if (user !==null && user) {
      const rejectedBuddiesList = await axios.get(
        `${BASE_URL}/next-buddies/all/user/${user.id}`
      )
      console.log(rejectedBuddiesList)

	  const userRejectedBuddiesActivities = await axios.get(
		`${BASE_URL}/next-buddy-activities/raw/activity/${selectActivity.id}`
	  )
	  console.log(userRejectedBuddiesActivities)
     const listOfRejectees = rejectedBuddiesList.data.map(rejectee=>{
		return rejectee.id
	 })

	 console.log(listOfRejectees)

userRejectedBuddiesActivities.data.forEach(userRejectedBuddy=>{
	
	compare.push(userRejectedBuddy.userRejectedBuddyId)
	console.log(compare)
	console.log(listOfRejectees)
	 match= listOfRejectees.filter((rejectedBuddyActivity)=>compare.indexOf(rejectedBuddyActivity)!==-1)
	
})
listOfActivityRejects.push(match)
		console.log(listOfActivityRejects)

		
	
	//   const filteredOutRejecteeds = userActivitiesListFiltered
    }


    // remove buddies that the user already liked FOR THIS ACTIVITY
    // removed buddies that the user already rejected FOR THIS ACTIVITY
    setPoolOfBuddies(userActivitiesListFiltered)
  }

  const getRandomPotentialBuddy = () => {
    const randomBuddy =
      poolOfBuddies[Math.floor(Math.random() * poolOfBuddies.length)]
    setPotentialBuddy(randomBuddy)
  }

  const removePotentialBuddyFromPool = async () => {
    const potentialBuddyId = potentialBuddy.id
    const userRejectedBuddy = await Client.post(
      `${BASE_URL}/next-buddies/user/${user.id}/rejected-buddy/${potentialBuddyId}`
    )
    const userRejectBuddyId = userRejectedBuddy.data[0][0].id
    const userRejectedBuddyActivity = await Client.post(
      `${BASE_URL}/next-buddy-activities/user-rejected-buddy/${userRejectBuddyId}/activity/${selectActivity.id}`
    )
    console.log(userRejectedBuddyActivity)
  }

  const getNextUser = () => {
    removePotentialBuddyFromPool()
    toggleClickNext(!clickNext)
  }

  const addUserToBuddyList = () => {
    console.log('Added')
  }

  useEffect(() => {
    getPoolOfBuddies()
  }, [user, clickNext])

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
      {noMorePotentialBuddies ? (
        <h3>Waiting for More Buddies...</h3>
      ) : (
        <UserCard
          userBuddy={potentialBuddy}
          getNextUser={getNextUser}
          addUserToBuddyList={addUserToBuddyList}
        />
      )}
    </div>
  )
}

export default BuddySwipe
