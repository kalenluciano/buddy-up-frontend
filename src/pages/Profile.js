import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import Client from '../services/api'

const Profile = ({ user }) => {
  let navigate = useNavigate()
  const { user_id } = useParams()
  const userId = parseInt(user_id)
  const [profile, setProfile] = useState([])

  // get user info

  const getProfile = async () => {
    const response = await axios.get(`${BASE_URL}/users/${userId}`)
    setProfile(response.data)
  }

  const handleUpdateClick = () => {
    navigate(`/update-profile/${userId}`)
  }

  const handleDeleteClick = async () => {
    await Client.delete(`${BASE_URL}/users/${userId}`)
  }

  useEffect(() => {
    getProfile()
  }, [user])

  return (
    <div className="profile">
      <div className="profileImage">
        {/* display user info */}
        <img src={profile.profilePicture} alt={profile.name} />
      </div>
      <section className="profileRight">
        <h1>
          {profile.firstName} {profile.lastName}
        </h1>
        <h2>EMAIL</h2>
        <h3>{profile.email}</h3>
        <h2>CONTACT NUMBER</h2>
        <h3>{profile.phoneNumber}</h3>
        <h2>AGE</h2>
        <h3>{profile.age}</h3>
        <h2>ABOUT ME</h2>
        <p>{profile.about}</p>

        {/* conditionally render an update and delete profile */}
        {user && user.id === userId && (
          <div>
            <h2>USERNAME</h2>
            <h3>{profile.username}</h3>
            <button onClick={handleDeleteClick}>Delete Profile</button>
            <button onClick={handleUpdateClick}>Update Profile</button>
          </div>
        )}
        <div></div>
      </section>
    </div>
  )
}

export default Profile
