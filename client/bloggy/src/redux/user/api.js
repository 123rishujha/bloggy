import axios from "axios";

export const loginUser = async (payload) => {
  // console.log("url", `${process.env.REACT_APP_BASE_URL}/api/user/login`);
  return await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/user/login`,
    payload,
    {
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const logoutUser = async () =>{
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/logout`,{},{
    // withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  })
}

export const getUserProfile = async (userId) => {
  if (userId) {
    return await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/user/profile/${userId}`,
      {
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } else {
    return await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/user/profile`,
      {
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
};

export const getSearchUsers = async (query) => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/user?search=${query}`,
    {
      // withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
  );
};
