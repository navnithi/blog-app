import React from 'react'
import { useLocation } from 'react-router-dom'
import { getRefreshToken } from '../services/UserService';
import { useEffect, useCallback } from 'react';

const Profile = () => {
    const location = useLocation();
    const {state} = location;

    const handleRefresh = useCallback(async () => {
      try {
        const refreshToken = await getRefreshToken();
        console.log(refreshToken);
        
      } catch (error) {
        console.log(error)
        
      }
    }, []);

    useEffect(() => {
     const interval = setInterval(() => {
      handleRefresh();

     }, 1000 * 20);
     return () => clearInterval(interval)
    }, [handleRefresh])
    
   
  return (
    <div>
      <h2>{state.isAdmin ? "Admin" : "User"} Profile</h2>
      <div className="card center">
        {state && (
          <div className="profile">
            <h3 className="profile__name">Name: {state.name}</h3>
            <p className="profile__name">Email: {state.email}</p>
            <p className="profile__name">Phone: {state.phone}</p>
            <div className='profile__buttons'>
                <button className='btn'>Update</button>
                <button className='btn'>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile