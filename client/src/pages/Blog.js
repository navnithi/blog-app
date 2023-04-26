import React from 'react'

const Blog = (props) => {
    const {title, image, description} = props.blog;

    const imageUrl = "http://127.0.0.1:8080" + image;
    console.log(imageUrl);
    
  return (
    <div className='card'>
      <img src='{imageUrl}' alt='{title}'/>
      <h2>{title}</h2>
      <p>{description}</p>
     
    </div>
  );
}

export default Blog