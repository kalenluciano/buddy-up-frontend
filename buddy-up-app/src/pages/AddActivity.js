import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../globals";
import Client from "../services/api";

const AddActivity = ({user}) => {
    let navigate = useNavigate();
    const initialFormValues = {
      userId: user.id,
      categoryId:"",
       name:"",
       description:"",
       streetAddress: "",
       city:"",
       state:"",
       zipCode:"",
       country:"",
      date: "",
      time: "",
      image:"",
      
    };
  
    const [formValues, setFormValues] = useState(initialFormValues);
    const [categories, setCategories] = useState([]);
  
  
  
  
    //functions
    const getCategories = async () => {
      const categories = await axios.get(`${BASE_URL}/categories`);
    //  const names = categories.data.map(({name})=>name)
      setCategories(categories.data);
   
    };

    useEffect(() => {
        getCategories();
       
    }, []);

     const handleChange = (event) => {
      console.log(event.target.id);
      console.log(event.target.value);
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      formValues.categoryId = parseInt(formValues.categoryId)
      formValues.date = new Date (`${formValues.date}T${formValues.time}`)
 delete formValues.time
const categoryId = formValues.categoryId
      const newActivity = await Client
        .post(`${BASE_URL}/activities`, formValues)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
  
      setFormValues(initialFormValues);
  
      navigate(`/category/${categoryId}`);
    };
  
   
  
    return (
      <div>
        <form onSubmit ={handleSubmit}>
          <h1>Creating New Activity</h1>
          <div >
            <label htmlFor= "name"> Activity Name:</label>
            <input
              type="text"
              name ="name"
              onChange={handleChange}
              value={formValues.name}
            />
            </div>
            <div>
            <label htmlFor="categoryId">Add Category</label>
            <select name="categoryId" onChange={handleChange} value={formValues.categoryId}>
              <option defaultValue="select category">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            </div>
            <div>
              <label htmlFor="description">Description</label>
            <textarea
              name="description"
              cols="30"
              rows="5"
              onChange={handleChange}
              value={formValues.description}
            ></textarea>
            </div>
            <div>
            <label>Date </label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={formValues.date}
          /> 
            </div>
            <div>
            <label>Time </label>
          <input
            type="time"
            name="time"
            onChange={handleChange}
            value={formValues.time}
          /> 
            </div>
            <div>
            <label>Street Address:</label>
            <input
              type="text"
              name="streetAddress"
              onChange={handleChange}
              value={formValues.streetAddress}
            />
            </div>
            <div>
              <label>Street Address2:</label>
              <input
              type="text"
              name="streetAddress2"
              onChange={handleChange}
              value={formValues.streetAddress2}
            />
            </div>
            <div>
              <label>City:</label>
              <input
              type="text"
              name="city"
              onChange={handleChange}
              value={formValues.city}
            />
            </div>
            <div>
              <label>State:</label>
              <input
              type="text"
              name="state"
              onChange={handleChange}
              value={formValues.state}
            />
            </div>
            <div>
             <label> zip code:</label>
             <input
              type="text"
              name="zipCode"
              onChange={handleChange}
              value={formValues.zipCode}
            />
             </div>
             <div>
             <label> Country:</label>
             <input
              type="text"
              name="country"
              onChange={handleChange}
              value={formValues.country}
            />
             </div>
             <div>
             <label> Image URL:</label>
             <input
              type="text"
              name="image"
              onChange={handleChange}
              value={formValues.image}
            />
             </div>
             
            <button>
              Submit
            </button>
        
        </form>
      </div>
    );
  };
  
  export default AddActivity;
  