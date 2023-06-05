import * as types from "./chat.types";

const initChat = {
  loading: false,
  error: false,
  chats: [],
};

export const chatReducer = (state = initChat, { type, payload }) => {
  switch (type) {
    case types.CHAT_LOADING: {
      return { ...state, loading: true, error: false };
    }

    case types.CHAT_ERROR: {
      return { ...state, loading: false, error: true };
    }

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
