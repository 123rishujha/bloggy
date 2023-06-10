import axios from "axios";

export const loginUser = async (payload) => {
  // console.log("url", `${process.env.REACT_APP_BASE_URL}/api/user/login`);
  return await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/user/login`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const logoutUser = async () =>{
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/logout`,{},{withCredentials: true})
}

export const getUserProfile = async (userId) => {
  if (userId) {
    return await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/user/profile/${userId}`,
      {
        withCredentials: true,
      }
    );
  } else {
    return await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/user/profile`,
      {
        withCredentials: true,
      }
    );
  }
};

export const getSearchUsers = async (query) => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/user?search=${query}`,
    {
      withCredentials: true,
    }
  );
};
