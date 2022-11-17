const ProfileInfo = ({user, setShowMore}) => {
    return (
        <div>
            <p>{user.about}</p>
            <p>{user.phoneNumber}</p>
            <p>{user.email}</p>
            <button onClick={setShowMore}>Hide</button>
        </div>
    )
}

export default ProfileInfo