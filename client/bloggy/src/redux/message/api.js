import axios from "axios";

export const messages = async (chatId) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/api/message/${chatId}`, {
    // withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
};

export const postMessages = async (chatId,payload) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/api/message/${chatId}`,payload, {
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};