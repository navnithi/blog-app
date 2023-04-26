import React, { useEffect, useState } from 'react'
import { getAllBlogRequest, getAllBlogs } from '../services/BlogServices'
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async() => {
    const response = await getAllBlogRequest();
    setBlogs(response.data);
  }

  useEffect(() => {
    
    fetchBlogs();
  
    
  }, [])
  
  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.length > 0 && blogs.map ((blog) => <Blog key={blog._id} blog = {blog}/>)}
    </div>
  );
}

export default Blogs