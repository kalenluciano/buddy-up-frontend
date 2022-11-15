import axios from "axios"
import { BASE_URL } from "../globals"

const LikeActivityButton = ({likedActivity, toggleLikedActivity, userId, selectActivityId, setUserActivityList, userActivityList}) => {
    const handleLikeClick = async () => {
        await axios.post(`${BASE_URL}/user-activities/user/${userId}/activity/${selectActivityId}`)
        toggleLikedActivity(!likedActivity)
    }

    const handleDropClick = async () => {
        // Need to get userActivity PK, working on backend controller to do this
        const userActivity = userActivityList.filter(userActivity => userActivity.id === selectActivityId)
        if (userActivity[0]) {
            await axios.delete(`${BASE_URL}/user-activities/${userActivity[0].id}`)
        }
        const response = await axios.get(`${BASE_URL}/user-activities/user/${userId}`)
        setUserActivityList(response.data[0].created_list)
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