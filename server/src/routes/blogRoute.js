
const express = require("express");
const { getAllBlogs } = require("../controllers/blogcontroller");
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);


blogRouter.get("*", (req, res) => { 
  res.status(404).json({
    message: "404 not found",
  });
});

module.exports = blogRouter;
