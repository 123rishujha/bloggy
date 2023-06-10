const { BlogModel } = require("../models/blogModel");

const createBlog = async (req, res, next) => {
  const userId = req.user?._id;
  if (!userId) {
    let error = new Error("403 you are not authorize");
    next(error);
  }
  const { title, content } = req.body;
  let payload = { author: userId };
  if (title) {
    payload.title = title;
  }
  if (content) {
    payload.content = content;
  }
  //    console.log("payload",payload)
  try {
    let blog = new BlogModel(payload);
    let savedBlog = await blog.save();
    console.log(savedBlog);
    res.json({
      success: true,
      message: "blog create successfully",
      blog: savedBlog,
    });
  } catch (error) {
    console.log("error createBlog while creating blog");
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const { title, content, coverImage } = req.body;
  //   console.log(
  //     `blogId: ${blogId},title: ${title}, content: ${content}, userId: ${req.user._id}`
  //   );

  try {
    let blog = await BlogModel.findOne({ _id: blogId, author: req.user._id });
    if (!blog) {
      let error = new Error("Blog not found");
      next(error);
      return;
    }
    if (!blog.author.equals(req.user._id)) {
      console.log("checking author of blog", blog.author.equals(req.user._id));
      return res.status(403).json({
        success: false,
        message: "Forbidden, You are not author of this blog",
      });
    }
    blog.title = title || blog.title;
    blog.coverImage = coverImage || blog.coverImage;
    blog.content = content || blog.content;
    let updatedBlog = await blog.save();
    res.json({
      success: true,
      message: "updated successfully",
      result: updatedBlog,
    });
  } catch (error) {
    console.log("error updateBlog while updating blog", error);
    next(error);
  }
};

const getBlogs = async (req, res, next) => {
  let filter = req.body?.userId ? { author: req.body?.userId } : {};
  // console.log("userId",userId);

  try {
    let blogs = await BlogModel.find(filter)
      .sort({ updatedAt: -1 })
      .populate("author");
    // console.log("blogs", blogs);
    res.json({ success: true, result: blogs });
  } catch (err) {
    // console.log("error in getBlogs");
    next(err);
  }
};

const getSingleBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    let blog = await BlogModel.findById(blogId);
    if (!blog) {
      res.json({ success: false, message: "404 blog Not Found" });
      return;
    }
    res.json({ success: true, result: blog });
  } catch (err) {
    console.log("error in getSingleBlog controllers");
    next(err);
  }
};

module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  getSingleBlog,
};
