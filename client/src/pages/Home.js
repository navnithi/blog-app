import React from 'react'
import blogImg from '../images/myImage.png'
import '../index.css'

const Home = () => {

  return (
    <div>
      <h1>Home Page</h1>
      <div className="post">
        <img src={blogImg} alt="post" />
      </div>
    </div>
  );
}

export default Home