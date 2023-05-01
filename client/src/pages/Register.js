/* eslint-disable no-undef */
import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { registerUser} from "../services/UserService";


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = new FormData();
      newUser.append("name", name);
      newUser.append("email", email);
      newUser.append("password", password);
      newUser.append("phone", phone);
      newUser.append("image", image);
      /* for (const [key, value] of newBlog) {
                console.log(key, value)}*/

      const response = await registerUser(newUser);
      
      toast(response.message);

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setImage("");
    } catch (error) {
      console.log(error);

      toast(error.response.data.error.message);
    }
  };

  return (
    <div>
      <h1>Register User</h1>

      {image && (
        <div>
          <img
            className="blog-img"
            src={URL.createObjectURL(image)}
            alt="user"
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="passowrd"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="phhone">Phone: </label>
          <input
            type="phone"
            name="phone"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="image">Image: </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-control">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
