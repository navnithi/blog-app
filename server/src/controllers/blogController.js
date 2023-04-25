const { successHandler } = require("./requestHandler");

const getAllBlogs = async(req, res, next) =>{
    try {
        return successHandler(res, 200, "Returned all blogs", []);
         
        
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
   return successHandler(res, 200, "Blog created", []);
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