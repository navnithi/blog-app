/* eslint-disable no-undef */
import React, { useState } from 'react'

import axios from "axios";
import { toast } from 'react-toastify';
import { createBlogRequest } from '../services/BlogServices';

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleTitleChange = (event) =>{
        setTitle(event.target.value)
    }

     const handleDescriptionChange = (event) => {
       setDescription(event.target.value);
     };

      const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };

      const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
            const newBlog = new FormData();
            newBlog.append("title", title);
            newBlog.append("description", description);
            newBlog.append("image", image);
            /* for (const [key, value] of newBlog) {
                console.log(key, value)}*/

                
            const response = await createBlogRequest(newBlog);
            console.log(response);
            toast(response.message);
           
             setTitle("");
            setDescription("");
            setImage("");

            
        } catch (error) {
            console.log(error.response.data.error.message);
            
            toast(error.response.error.message);
        }
        
      };
    
  return (
    <div>
      <h1>CreateBlog</h1>

      {image && (
        <div>
            <img 
            className='blog-img'
            src={(URL.createObjectURL(image))}
            alt='user'/>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="image">Select Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept='image/*'
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="title">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <button type='submit'>Create Post</button>
      </form>
    </div>
  );
}

export default CreateBlog