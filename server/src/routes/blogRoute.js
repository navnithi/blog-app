
const express = require("express");
const { getAllBlogs, createBlog, updateblog, deleteBlog, getSingleBlog } = require("../controllers/blogcontroller");
const upload = require("../middleware/fileUpload");
const blogRouter = express.Router();

blogRouter.route("/").get(getAllBlogs).post(upload.single("image"), createBlog);

blogRouter.route("/:id").get(getSingleBlog).put( updateblog).delete(deleteBlog);


blogRouter.use("*", (req, res, next) => { 
  res.send("Route not found");
});

module.exports = blogRouter;
