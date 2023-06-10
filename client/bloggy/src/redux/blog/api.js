import axios from "axios";

export const createAPI = async () => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/blogs`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const updateAPI = async (payload, blogId) => {
  return axios.patch(
    `${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}`,payload,
    {
      withCredentials: true,
    }
  );
};

export const getBlogsAPI = async () => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/api/blogs`, {
    withCredentials: true,
  });
};

export const getSingleBlogAPI = async (blogId) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}`, {
    withCredentials: true,
  });
};
