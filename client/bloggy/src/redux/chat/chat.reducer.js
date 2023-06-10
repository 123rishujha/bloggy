import * as types from "./chat.types";

const initChat = {
  loading: false,
  error: false,
  chats: [],
  alert: null,
};

export const chatReducer = (state = initChat, { type, payload }) => {
  switch (type) {
    case types.CHAT_LOADING: {
      return { ...state, loading: true, error: false, alert: null };
    }

    case types.CHAT_ERROR: {
      return { ...state, loading: false, error: true, alert: null };
    }

    case types.CHAT_ALERT: {
      return { ...state, loading: false, alert: payload };
    }

    // case types.CHAT_SELECTED : {
    //   return {...state,loading: false, error: false,singleChat: {...payload}}
    // }

    case types.CHATS_GET_SUCCESS: {
      return { ...state, loading: false, error: false, chats: payload };
    }

    case types.CHAT_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        chats: [...state.chats, payload],
      };
    }

    default: {
      return { ...state };
    }
  }
};
