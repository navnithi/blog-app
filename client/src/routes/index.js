import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from '../pages/Home'
import Blogs from '../pages/Blogs';
import Navbar from '../layout/Navbar';
import CreateBlog from '../pages/CreateBlog';

const Index = () => {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Index