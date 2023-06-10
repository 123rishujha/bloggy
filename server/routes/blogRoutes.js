const express = require("express");

const { createBlog,getBlogs,updateBlog, getSingleBlog } = require('../controllers/blogControllers')
const { authMiddleware } = require("../middlewares/authMiddleware")


const blogRoutes = express.Router();

//create blog -> /api/blogs
blogRoutes.post("/",authMiddleware,createBlog);
//get blog -> /api/blogs --> (Note: if you will provide userId then it will return the blogs of particular user otherwise it will return all the blogs)
blogRoutes.get("/",authMiddleware,getBlogs);
//get single blog -> /api/blogs/:blogId
blogRoutes.get("/:blogId",authMiddleware,getSingleBlog);
//patch  blog -> /api/blogs/:blogId
blogRoutes.patch("/:blogId",authMiddleware,updateBlog);


module.exports = {
    blogRoutes
}