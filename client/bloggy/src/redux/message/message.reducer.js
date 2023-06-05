import * as types from "./message.types";

const initMessage = {
  messages: [],
  loading: false,
  error: false,
};

export const messageReducer = (state = initMessage, { type, payload }) => {
  switch (type) {
    case types.MESSAGE_LOADING: {
      return { ...state, loading: true, error: false };
    }
    case types.MESSAGE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case types.MESSAGES_GET_SUCCESS: {
      return { ...state, loading: false, error: false, messages: payload };
    }
    case types.MESSAGE_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        messages: [...state.messages, payload],
      };
    }
    
    case type.MESSAGE_POST_SUCCESS : {
        return {...state,loading:false, error:false,messages: [...state.messages,payload]}
    }
    
    default: {
      return state;
    }
  }
};
