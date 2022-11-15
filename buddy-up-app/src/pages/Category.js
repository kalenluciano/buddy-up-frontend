import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import ActivityCard from '../components/ActivityCard'

const Category = () => {
<<<<<<< HEAD
	return <div>

		
	</div>;
};
=======
  let { categoryId } = useParams()
  const navigate = useNavigate()

  const [categoriesId, setCategoriesId] = useState(null)
  const [activities, setActivities] = useState([])

  const getActivitiesByCategoryId = async () => {
    const response = await axios.get(
      `${BASE_URL}/activities/categories/${categoryId}`
    )
    setCategoriesId(categoriesId)
    setActivities(response.data)
  }
  useEffect(() => {
    getActivitiesByCategoryId()
  }, [categoriesId])

  return categoryId !== null ? (
    <div>
      <h1>hello</h1>
      {activities.map((activity) => (
        <Link to={`/activity/${activity.id}`} key={activity.id}>
          <ActivityCard
            name={activity.name}
            date={activity.date}
            streetAddress={activity.streetAddress}
            city={activity.city}
            state={activity.state}
            zipCode={activity.zipCode}
            country={activity.country}
          />
        </Link>
      ))}
    </div>
  ) : null
}
>>>>>>> ff8bcee4361be50564450b4d2eeb58cef5baeace

export default Category
