import axios from 'axios'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../globals'
import UserCard from './UserCard'
import Client from '../services/api'
import BuddyList from '../components/BuddyList';
import '../styling/BuddySwipe.css'

const BuddySwipe = ({ user, selectActivity }) => {
  const [poolOfBuddies, setPoolOfBuddies] = useState([])
  const [potentialBuddy, setPotentialBuddy] = useState({})
  const [noMorePotentialBuddies, toggleNoMorePotentialBuddies] = useState(false)
  const [clickNext, toggleClickNext] = useState(false)
  const [clickBuddyUp, toggleClickBuddyUp] = useState(false)
  const [buddyLikes, setBuddyLikes] = useState([]);
  const [potentialBuddyMatches, setPotentialBuddyMatches] = useState([])
  const [connection, toggleConnection] = useState(false)
  const [buddyConnections, setBuddyConnections] = useState([])

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

  const getLikedBuddiesList = async () => {
    const likedBuddiesList = await axios.get(`${BASE_URL}/user-buddies/all/${user.id}`)
    return likedBuddiesList
  }

  const getUserBuddyPairByActivityId = async () => {
    const userBuddyPairByActivityId = await axios.get(`${BASE_URL}/user-buddy-activities/raw/activity/${selectActivity.id}`)
    return userBuddyPairByActivityId
  }

  const getListOfUserBuddyPairById = (buddiesList) => {
    const listOfUserBuddyPairById = buddiesList.data.map(buddy => {
      return buddy.id
    })
    return listOfUserBuddyPairById
  }

  const getFilteredListOfUserRejectedBuddyPairByActivityId = (userRejectedBuddyPairByActivityId, listOfUserRejectedBuddyPairById) => {
    const compare = []
    let match; 
    userRejectedBuddyPairByActivityId.data.forEach(userRejectedBuddy=>{
      compare.push(userRejectedBuddy.userRejectedBuddyId)
      match = listOfUserRejectedBuddyPairById.filter((userRejectedBuddyPairId)=>compare.indexOf(userRejectedBuddyPairId)!==-1)
    })
    const filteredListOfUserRejectedBuddyPairByActivityId = []
    if (match) {
    if (match.length > 0) {
      filteredListOfUserRejectedBuddyPairByActivityId.push(...match)
      }
    }
    return filteredListOfUserRejectedBuddyPairByActivityId
  }

  const getFilteredListOfUserBuddyPairByActivityId = (userBuddyPairByActivityId, listOfUserBuddyPairById) => {
    const compare = []
    let match; 
    userBuddyPairByActivityId.data.forEach(userBuddy=>{
      compare.push(userBuddy.userBuddyId)
      match = listOfUserBuddyPairById.filter((userBuddyPairId)=>compare.indexOf(userBuddyPairId)!==-1)
    })
    const filteredListOfUserBuddyPairByActivityId = []
    if (match) {
      if (match.length > 0) {
      filteredListOfUserBuddyPairByActivityId.push(...match)
      }
    }
    return filteredListOfUserBuddyPairByActivityId
  }

  const getListOfBuddiesToRemove = (buddiesList, filteredListOfUserBuddyPairByActivityId) => {
    const listOfBuddiesToRemove = []
    buddiesList.data.forEach((buddy)=>
    { filteredListOfUserBuddyPairByActivityId.forEach((activityBuddy)=>{ 
      if (buddy.id===activityBuddy){
        listOfBuddiesToRemove.push(buddy)
      }
    })
    })
    return listOfBuddiesToRemove
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

  const getPotentialBuddyMatches = (userActivitiesListFilteredOutUser, listOfBuddiesToRemove) => {
    const potentialBuddiesMatches = []
    userActivitiesListFilteredOutUser.forEach((buddy)=> { 
      listOfBuddiesToRemove.forEach((buddyPotentials)=>{ 
        if (buddy.id===buddyPotentials.buddyId && !potentialBuddiesMatches.includes(buddy)){
          potentialBuddiesMatches.push(buddy)
      }
    })
    })
    return potentialBuddiesMatches
  }

  const filterPotentialBuddyPool = (potentialBuddyFilter, userActivitiesListFilteredOutUser) => {
    potentialBuddyFilter.forEach((filteredBuddy) => {
      if (userActivitiesListFilteredOutUser.includes(filteredBuddy)) {
        userActivitiesListFilteredOutUser.splice(userActivitiesListFilteredOutUser.indexOf(filteredBuddy), 1)
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
      const listOfUserRejectedBuddyPairById = getListOfUserBuddyPairById(rejectedBuddiesList)
      const filteredListOfUserRejectedBuddyPairByActivityId = getFilteredListOfUserRejectedBuddyPairByActivityId(userRejectedBuddyPairByActivityId, listOfUserRejectedBuddyPairById)
      const listOfRejectsToRemove = getListOfBuddiesToRemove(rejectedBuddiesList, filteredListOfUserRejectedBuddyPairByActivityId)
      const potentialBuddiesRejected = getPotentialBuddyRejects(userActivitiesListFilteredOutUser, listOfRejectsToRemove)
      filterPotentialBuddyPool(potentialBuddiesRejected, userActivitiesListFilteredOutUser)

      // Filter out liked buddies for this activity
      const likedBuddiesList = await getLikedBuddiesList()
      const userBuddyPairByActivityId = await getUserBuddyPairByActivityId()
      const listOfUserBuddyPairById = getListOfUserBuddyPairById(likedBuddiesList)
      const filteredListOfUserBuddyPairByActivityId = getFilteredListOfUserBuddyPairByActivityId(userBuddyPairByActivityId, listOfUserBuddyPairById)
      const listOfBuddyLikesToRemove = getListOfBuddiesToRemove(likedBuddiesList, filteredListOfUserBuddyPairByActivityId)
      setBuddyLikes(listOfBuddyLikesToRemove)
      const potentialBuddyMatches = getPotentialBuddyMatches(userActivitiesListFilteredOutUser, listOfBuddyLikesToRemove)
      setPotentialBuddyMatches(potentialBuddyMatches)
      filterPotentialBuddyPool(potentialBuddyMatches, userActivitiesListFilteredOutUser)
    } 
  setPoolOfBuddies(userActivitiesListFilteredOutUser)
}

  const getRandomPotentialBuddy = () => {
    const randomBuddy =
      poolOfBuddies[Math.floor(Math.random() * poolOfBuddies.length)]
    setPotentialBuddy(randomBuddy)
  }

  const removeRejectedBuddyFromPool = async () => {
    const potentialBuddyId = potentialBuddy.id
    const userRejectedBuddy = await Client.post(
      `${BASE_URL}/next-buddies/user/${user.id}/rejected-buddy/${potentialBuddyId}`
    )
    const userRejectBuddyId = userRejectedBuddy.data[0][0].id
    const userRejectedBuddyActivity = await Client.post(
      `${BASE_URL}/next-buddy-activities/user-rejected-buddy/${userRejectBuddyId}/activity/${selectActivity.id}`
    )
  }

  const removeMatchedBuddyFromPool = async () => {
    const potentialBuddyId = potentialBuddy.id
    const userMatchedBuddy = await Client.post(`${BASE_URL}/user-buddies/raw/user/${user.id}/buddy/${potentialBuddyId}`)
    const userMatchedBuddyId = userMatchedBuddy.data[0][0].id
    const userBuddyActivity = await Client.post(
      `${BASE_URL}/user-buddy-activities/user-buddy/${userMatchedBuddyId}/activity/${selectActivity.id}`
    )
  }

  const getNextUser = async () => {
    await removeRejectedBuddyFromPool()
    toggleClickNext(!clickNext)
  }

  const addUserToBuddyList = async () => {
    await removeMatchedBuddyFromPool()
    toggleClickBuddyUp(!clickBuddyUp)
  }

  const setMatches = async () => {
    const buddyMatches = []
    buddyLikes.forEach((buddyLike) => {
      potentialBuddyMatches.forEach((potentialConnection) => {
        if (potentialConnection.id===buddyLike.userId && !buddyMatches.includes(potentialConnection)){
          buddyMatches.push(potentialConnection)
      }})
    })
    setBuddyConnections(buddyMatches)
    if (buddyConnections.length > 0) {
      toggleConnection(true)
    }
  }

  useEffect(() => {
    getPoolOfBuddies()
  }, [user, clickNext, clickBuddyUp])

  useEffect(() => {
    if (poolOfBuddies.length > 0) {
      getRandomPotentialBuddy()
      toggleNoMorePotentialBuddies(false)
    } else {
      toggleNoMorePotentialBuddies(true)
    }
    setMatches()
  }, [poolOfBuddies])

  return (
    <div className='buddySwipeAndMatch'>
      <div className='buddySwipe'>
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
      <div className='buddyMatch'>
        {user && (<h1>Buddy Matches</h1>)}
        {user && !connection && (<h3>Waiting for Buddies To Match...</h3>)}
        <div className="buddyMatchList">
          {user && connection && (
            buddyConnections.map((buddyConnection) => 
            <BuddyList key={buddyConnection.id} buddyConnection={buddyConnection} />
          )
          )}
        </div>
      </div>
    </div>
  )
}

export default BuddySwipe
