const LikeActivityButton = ({likedActivity, toggleLikedActivity}) => {
    const handleClick = () => {
        toggleLikedActivity(!likedActivity)
    }

    return (
        <div>
            <button onClick={handleClick}>{likedActivity ? "Drop Activity" : "Like Activity"}</button>
        </div>
    )
}

export default LikeActivityButton