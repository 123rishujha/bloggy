import * as types from "./user.types";

const init = {
  isAuth: false,
  token: null,
  alert: null,
  user: {},
  users: [],
  loading: false,
  error: false,
};

export const userReducer = (state = init, { type, payload }) => {
  // console.log("types", type);
  switch (type) {
    case types.USER_LOADING: {
      return { ...state, loading: true, error: false,alert:null };
    }

    case types.USER_ERROR: {
      return { ...state, loading: false, error: true,alert:null };
    }
    
    case types.USER_ALERT : {
      return {...state,alert: payload}
    }

    case types.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        token: payload,
      };
    }
    
    case types.USER_LOGOUT_SUCCESS: {
      return {...init};
    }

    case types.USER_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        user: payload,
      };
    }

    case types.USER_SEARCH_SUCCESS: {
      // console.log("reducer called");
      return { ...state, loading: false, error: false, users: payload };
    }

    default: {
      return state;
    }
  }
};
