import * as types from "./user.types";
import * as api from "./api";

// action object functions(:- return action object);

export const userLoading = () => {
  //user request for something means api call in progress so so userLoading
  return { type: types.USER_LOADING };
};

export const userError = () => {
  //user request for something but got error
  return { type: types.USER_ERROR };
};

export const userAlert = (payload) => {
  return {type: types.USER_ALERT,payload}
}

export const userLogin = (payload) => {
  // payload -> result got from api after successful login
  return { type: types.USER_LOGIN_SUCCESS, payload };
};

export const userLogout = () => {
  return { type: types.USER_LOGOUT_SUCCESS };
};

export const userProfile = (payload) => {
  return { type: types.USER_PROFILE_SUCCESS, payload };
};

export const userSearch = (payload) => {
  // console.log("user Search called", payload);
  //payload -> all the users matched user search query -> array of objects
  return { type: types.USER_SEARCH_SUCCESS, payload };
};

// redux functions to update reducers state;

export const LoginSuccess = (payload) => async (dispatch) => {
  dispatch(userLoading());
  try {
    let response = await api.loginUser(payload);
    console.log("Login response", response);
    if (response?.data?.success && response?.data?.token) {
      localStorage.setItem("token", response.data.token);
      dispatch(userLogin(response?.data?.token));//(--***first diapatch userlogin then userAlert)
      dispatch(userAlert("Login successful"));
    }
  } catch (err) {
    // console.log("error part called LoginSuccess", err);
    dispatch(userError());
    dispatch(userAlert("Something went wrong while loging"));//(--***first diapatch userError then userAlert)
    //userError return -> {type: "user/error/" }  and then
    // dispatch({type: "user/error/" })
  }
};

export const logoutSuccess = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    // let response = await api.logoutUser();
    localStorage.clear("token");
    // console.log("logout response", response);
    dispatch(userLogout());
  } catch (err) {
    console.log("error part called logoutSuccess", err);
    dispatch(userError());
    dispatch(userAlert("Something went wrong while loging"));//(--***first diapatch userError then userAlert)
  }
};

export const getProfileSuccess = (userId) => async (dispatch) => {
  //get profile of loggedIn User

  dispatch(userLoading());
  try {
    let response;
    if(userId){
      response = await api.getUserProfile(userId);
    }else{
      response = await api.getUserProfile();
    }
    let actual_data = response?.data;
    // console.log(actual_data);
    if (actual_data.success) {
      dispatch(userProfile(actual_data.user));
    }
  } catch (err) {
    console.log(err);
    dispatch(userError());
  }
};

export const userSearchSuccess = (query) => async (dispatch) => {
  dispatch(userLoading());
  try {
    let response = await api.getSearchUsers(query);
    let actual_data = response?.data;
    // console.log(actual_data, "success", actual_data.success);
    if (actual_data.success) {
      dispatch(userSearch(actual_data.result));
    }
  } catch (error) {
    console.log("error in userSearchSuccess function redux", error);
    dispatch(userError());
  }
};


