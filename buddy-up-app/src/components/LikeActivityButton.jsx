import axios from "axios"
import { BASE_URL } from "../globals"

const LikeActivityButton = ({likedActivity, toggleLikedActivity, userId, selectActivityId, setUserActivityList, userActivityList}) => {
    const updateUserActivityList = async () => {
        const response = await axios.get(`${BASE_URL}/user-activities/user/${userId}`)
        setUserActivityList(response.data[0].created_list)
    }
    
    const handleLikeClick = async () => {
        const response = await axios.post(`${BASE_URL}/user-activities/user/${userId}/activity/${selectActivityId}`)
        updateUserActivityList()
        toggleLikedActivity(!likedActivity)
    }

    const handleDropClick = async () => {
        const userActivities = await axios.get(`${BASE_URL}/user-activities/pk`)
        const userActivitiesList = userActivities.data
        const userActivity = userActivitiesList.filter(userActivity => userActivity.activityListedId === selectActivityId && userActivity.userCreatedId === userId)
        if (userActivity[0]) {
            await axios.delete(`${BASE_URL}/user-activities/${userActivity[0].id}`)
        }
        updateUserActivityList()
        toggleLikedActivity(!likedActivity)
    }

    return (
        <div>
            {!likedActivity && <button onClick={handleLikeClick}>Like Activity</button>}
            {likedActivity && <button onClick={handleDropClick}>Drop Activity</button>}
        </div>
    )
}

export default LikeActivityButton