import { useState } from "react"
import ProfileInfo from "./ProfileInfo"
import '../styling/UserCard.css'

const UserCard = ({userBuddy, getNextUser, addUserToBuddyList}) => {
    const [showMore, toggleShowMore] = useState(false)

    const setShowMore = () => {
        toggleShowMore(!showMore)
    }

    return (
        <div className="userCard">
            {showMore ? <ProfileInfo user={userBuddy} setShowMore={setShowMore}/> : <img src={userBuddy.profilePicture ? userBuddy.profilePicture : null} alt={`${userBuddy.firstName} ${userBuddy.lastName}`}/>}
            <h3>{userBuddy.firstName} {userBuddy.lastName}</h3>
            <p>{userBuddy.age}</p>
            <button onClick={getNextUser}>Next</button>
            {!showMore && <button onClick={setShowMore}>Show More</button>}
            <button onClick={addUserToBuddyList}>BuddyUp</button>
        </div>
    )
}

export default UserCard