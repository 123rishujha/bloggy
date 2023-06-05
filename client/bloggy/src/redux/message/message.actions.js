import * as types from "./message.types";
import * as api from "./api";

// action object functions(:- return action object);

export const messageLoading = () => {
  return { type: types.MESSAGE_LOADING };
};

export const messageError = () => {
  return { type: types.MESSAGE_ERROR };
};

export const sendMessage = (payload) => {
  return { type: types.MESSAGE_POST_SUCCESS, payload };
};

export const getMessages = (payload) => {
  return { type: types.MESSAGES_GET_SUCCESS, payload };
};

// redux functions to update reducers state;

export const getMessagesSuccess = (chatId,socket) => async (dispatch) => {
  dispatch(messageLoading());
  try {
    let response = await api.messages(chatId);
    let actual_data = response?.data;
    console.log("message actual data",actual_data);
    if (actual_data.success) {
      socket.emit("join chat",chatId);
      dispatch(getMessages(actual_data.result));
    }
  } catch (err) {
    console.log(err);
    dispatch(messageError());
  }
};


export const sendMessageSuccess = (chatId,payload,socket) => async (dispatch) => {
  dispatch(messageLoading());
  try {
    let response = await api.postMessages(chatId,payload,socket);
    let actual_data = response?.data;
    if(actual_data?.success) {
      console.log("sendMessageSuccess with sockets",actual_data.result);
      socket.emit("new message",actual_data.result)
      dispatch(sendMessage(actual_data.result));
    }
  } catch (err) {
    console.log(err);
    dispatch(messageError());
  }
};
