import axios from "axios";

export const getChats = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/chat`, {
    withCredentials: true,
  });
};

export const accessChats = async (payload) =>{ //payload => { userId}
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/api/chat`,payload,{
    withCredentials: true
  })
}
