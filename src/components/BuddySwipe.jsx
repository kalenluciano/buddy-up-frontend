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

  const getUsersWhoLikedActivity = async () => {
    const usersWhoLikedActivity = await axios.get(
      `${BASE_URL}/user-activities/activity/${selectActivity.id}`
    )
    return usersWhoLikedActivity
  }

  const filterOutUserFromUsersWhoLikedActivity = (usersWhoLikedActivity) => {
    const userActivitiesListFilteredOutUser =
    usersWhoLikedActivity.data[0].activities_user_list.filter(
      (userActivity) => userActivity.id !== user.id
    )
    return userActivitiesListFilteredOutUser
  }

  const getRejectedBuddiesList = async () => {
    const rejectedBuddiesList = await axios.get(
      `${BASE_URL}/next-buddies/all/user/${user.id}`
    )
    return rejectedBuddiesList
  }

  const getUserRejectedBuddyPairByActivityId = async () => {
    const userRejectedBuddyPairByActivityId = await axios.get(
      `${BASE_URL}/next-buddy-activities/raw/activity/${selectActivity.id}`
      )
    return userRejectedBuddyPairByActivityId
  }

  const getListOfUserRejectedBuddyPairById = (rejectedBuddiesList) => {
    const listOfUserRejectedBuddyPairById = rejectedBuddiesList.data.map(rejectee => {
      return rejectee.id
    })
    return listOfUserRejectedBuddyPairById
  }

  const getFilteredListOfUserRejectedBuddyPairByActivityId = (userRejectedBuddyPairByActivityId, listOfUserRejectedBuddyPairById) => {
    const compare = []
    let match; 
    userRejectedBuddyPairByActivityId.data.forEach(userRejectedBuddy=>{
      compare.push(userRejectedBuddy.userRejectedBuddyId)
      match = listOfUserRejectedBuddyPairById.filter((userRejectedBuddyPairId)=>compare.indexOf(userRejectedBuddyPairId)!==-1)
    })
    const filteredListOfUserRejectedBuddyPairByActivityId = [...match]
    return filteredListOfUserRejectedBuddyPairByActivityId
  }

  const getListOfRejectsToRemove = (rejectedBuddiesList, filteredListOfUserRejectedBuddyPairByActivityId) => {
    const listOfRejectsToRemove = []
    rejectedBuddiesList.data.forEach((rejectedBuddy)=>
    { filteredListOfUserRejectedBuddyPairByActivityId.forEach((activityRejects)=>{ 
      if (rejectedBuddy.id===activityRejects){
        listOfRejectsToRemove.push(rejectedBuddy)
      }
    })
    })
    return listOfRejectsToRemove
  }

  const getLikedBuddiesList = async () => {

  }

  const getUserBuddyPairByActivityId = async () => {

  }

  const getPotentialBuddyRejects = (userActivitiesListFilteredOutUser, listOfRejectsToRemove) => {
    const potentialBuddiesRejected = []
    userActivitiesListFilteredOutUser.forEach((buddy)=> { 
      listOfRejectsToRemove.forEach((reject)=>{ 
        if (buddy.id===reject.rejectedBuddyId && !potentialBuddiesRejected.includes(buddy)){
          potentialBuddiesRejected.push(buddy)
      }
    })
    })
    return potentialBuddiesRejected
  }

  const getPotentialBuddyPoolFilteredOutUserAndRejects = (potentialBuddiesRejected, userActivitiesListFilteredOutUser) => {
    potentialBuddiesRejected.forEach((rejectee) => {
      if (userActivitiesListFilteredOutUser.includes(rejectee)) {
        userActivitiesListFilteredOutUser.splice(userActivitiesListFilteredOutUser.indexOf(rejectee), 1)
      }
    })
  }

  const getPoolOfBuddies = async () => {
    const usersWhoLikedActivity = await getUsersWhoLikedActivity()
    const userActivitiesListFilteredOutUser = filterOutUserFromUsersWhoLikedActivity(usersWhoLikedActivity)
    if (user !== null && user ) {
      // Filter out rejected buddies for this activity
      const rejectedBuddiesList = await getRejectedBuddiesList()
      const userRejectedBuddyPairByActivityId = await getUserRejectedBuddyPairByActivityId()
      const listOfUserRejectedBuddyPairById = getListOfUserRejectedBuddyPairById(rejectedBuddiesList)
      const filteredListOfUserRejectedBuddyPairByActivityId = getFilteredListOfUserRejectedBuddyPairByActivityId(userRejectedBuddyPairByActivityId, listOfUserRejectedBuddyPairById)
      const listOfRejectsToRemove = getListOfRejectsToRemove(rejectedBuddiesList, filteredListOfUserRejectedBuddyPairByActivityId)
      const potentialBuddiesRejected = getPotentialBuddyRejects(userActivitiesListFilteredOutUser, listOfRejectsToRemove)
      getPotentialBuddyPoolFilteredOutUserAndRejects(potentialBuddiesRejected, userActivitiesListFilteredOutUser)

      // Filter out liked buddies for this activity
      const likedBuddiesList = await getLikedBuddiesList()
      const userBuddyPairByActivityId = await getUserBuddyPairByActivityId()

    } 
  setPoolOfBuddies(userActivitiesListFilteredOutUser)
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
