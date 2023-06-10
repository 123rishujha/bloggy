import * as types from "./blog.types";
import * as api from "./api";

export const loadingBlog = () => {
  return { type: types.LOADING_BLOG };
};

export const errorBlog = () => {
  return { type: types.ERROR_BLOG };
};
export const createBlog = (payload) => {
  return { type: types.CREATE_BLOG, payload };
};

export const getBlogs = (payload) => {
  return { type: types.GET_BLOGS, payload };
};

export const getSingleBlog = (payload) => {
  return { type: types.GET_BLOG, payload };
};

export const updateBlog = (payload) => {
  return { type: types.PATCH_BLOG, payload };
};

export const alertBlog = (payload) => {
  return { type: types.BLOG_ALERT, payload };
};

//redux funtions to update reducer;

export const createBlogSuccess = () => async (dispatch) => {
  dispatch(loadingBlog());
  try {
    let result = await api.createAPI();
    let blog_res = result.data.blog;
    // console.log(blog_res);
    dispatch(createBlog(blog_res));
    dispatch(alertBlog("blog created successfully"));
  } catch (err) {
    dispatch(errorBlog());
    dispatch(alertBlog("Something went wrong while creating blog"));
  }
};

export const getBlogsSuccess = () => async (dispatch) => {
  dispatch(loadingBlog());
  try {
    let blogs = await api.getBlogsAPI();
    let actual_blogs = blogs.data;
    console.log(actual_blogs);
    dispatch(getBlogs(actual_blogs?.result));
  } catch (err) {
    dispatch(errorBlog());
  }
};

//single blog
export const getSingleBlogSuccess = (blogId) => async (dispatch) => {
  dispatch(loadingBlog());
  try {
    let blog = await api.getSingleBlogAPI(blogId);
    let actual_blog = blog?.data?.result;
    console.log(actual_blog);
    dispatch(getSingleBlog(actual_blog));
  } catch (err) {
    dispatch(errorBlog());
  }
};

export const updateBlogSuccess = (payload, blogId) => async (dispatch) => {
  dispatch(loadingBlog());
  try {
    let result = await api.updateAPI(payload, blogId);
    let blog_res = result.data.result;
    console.log("updatedBlogSuccess", blog_res);
    dispatch(updateBlog(blog_res));
    dispatch(alertBlog("Changes Saved"));
  } catch (err) {
    dispatch(errorBlog());
    dispatch(alertBlog("Something went wrong try again"));
  }
};
