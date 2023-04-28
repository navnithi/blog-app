const createError = require("http-errors");
const slugify = require("slugify");
const { successHandler, errorHandler } = require("./requestHandler");
const Blog = require("../models/blogModel");

const getAllBlogs = async(req, res, next) =>{
    try {
        const blogs = await Blog.find({});
        return successHandler(res, 200, "Returned all blogs", blogs);
         
        
    } catch (error) {
        next(error )
        
    }

};

const getSingleBlog = async (req, res, next) => {
  try {
    return successHandler(res, 200, "Returned single blog", []);
    
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    

    if (!title|| !description)
      throw createError(404, "title or description is missing");

    if (title.length < 3)
      throw createError(400, "Title length should be atleast 3 character");

    const image = req.file.path;
    if (image && image.size > Math.pow(1024, 2))
      throw createError(400, "File sizze should be less than 1MB");

    const blog = await Blog.findOne({ title });
    if (blog) throw createError(400, "Blot title already exist. Create a new title");

    const newBlog = new Blog({
        title: title,
        slug:slugify(title),
        description: description,
        image: image,
    })

    const blogData = await newBlog.save();
    if(!blogData)return errorHandler(res, 400, "Blog not created");

   return successHandler(res, 200, "Blog created",blogData);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
   return successHandler(res, 200, "Blog deleted", []);
  } catch (error) {
    next(error);
  }
};

const updateblog = async (req, res, next) => {
  try {
    return successHandler(res, 200, "Blog updated successfully", []);
  } catch (error) {
    next(error);
  }
};

module.exports = {getAllBlogs, getSingleBlog, createBlog, deleteBlog, updateblog}