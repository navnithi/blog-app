import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/UserService'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    k to="/" className="nav__link">
        Home
      </Link>
      <Link to="/blogs" className="nav__link">
        Blogs
      </Link>
      <Link to="/create-blog" className="nav__link">
        NewBlog
      </Link>
      <Link to="/register" className="nav__link">
        Register<nav className="nav">
      <Lin
      </Link>
      <Link to="/login" className="nav__link">
        Login
      </Link>
      <Link to="/profile" className="nav__link">
        Profile
      </Link>
      <Link to="/logout" className="nav__link" onClick={handleLogout}>
        Logout
      </Link>
    </nav>
  );
}

export default Navbar