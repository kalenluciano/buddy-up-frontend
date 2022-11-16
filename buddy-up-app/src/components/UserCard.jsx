import { useState } from "react"
import ProfileInfo from "./ProfileInfo"

const UserCard = ({userBuddy}) => {
    const [showMore, toggleShowMore] = useState(false)

    const setShowMore = () => {
        toggleShowMore(!showMore)
    }

    return (
        <div>
            {showMore ? <ProfileInfo user={userBuddy} setShowMore={setShowMore}/> : <img src={userBuddy.profilePicture ? userBuddy.profilePicture : null} alt={userBuddy.firstName + userBuddy.lastName}/>}
            <h3>{userBuddy.firstName} {userBuddy.lastName}</h3>
            <p>{userBuddy.age}</p>
            {!showMore && <button onClick={setShowMore}>Show More</button>}
        </div>
    )
}

export default UserCard