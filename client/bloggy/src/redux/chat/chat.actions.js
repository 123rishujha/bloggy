import * as types from "./chat.types";
import * as api from "./api";

// action object functions(:- return action object);

export const chatLoading = () => {
  return { type: types.CHAT_LOADING };
};

export const chatError = () => {
  return { type: types.CHAT_ERROR };
};

export const chatAlert = (payload) =>{
  return {type: types.CHAT_ALERT,payload}
}

export const postChat = (payload) => {
  return { type: types.CHAT_POST_SUCCESS, payload };
};

export const getChats = (payload) => {
  return { type: types.CHATS_GET_SUCCESS, payload };
};

// export const chatSelected = (payload) => {
//   return {type: types.CHAT_SELECTED,payload};
// }


// redux functions to update reducers state;

export const getChatsSuccess = () => async (dispatch) => {
  //get profile of loggedIn User
  console.log("getChatsSuccess");
  dispatch(chatLoading());
  try {
    let response = await api.getChats();
    let actual_data = response?.data;
    console.log(actual_data);
    if (actual_data.success) {
      dispatch(getChats(actual_data.result));
    }
  } catch (err) {
    console.log(err);
    dispatch(chatError());
  }
};

export const accessChatSuccess = (userId) => async (dispatch) => {
  dispatch(chatLoading());
  try {
    let response = await api.accessChats({userId});
    let actual_data = response?.data;
    console.log(actual_data);
    dispatch(getChatsSuccess());
    dispatch(chatAlert("You can start chating"));
    // dispatch(chatSelected(actual_data));
  } catch (err) {
    console.log(err);
    dispatch(chatError());
    dispatch(chatAlert("Something went wrong while creating chat"));
  }
}
