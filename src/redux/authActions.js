import * as REDUX_ACTION from "./reduxConstants";
import { signIn, signUp } from "../api/userApiCalls";

export const logoutSuccess = () => {
  return {
    type: REDUX_ACTION.LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (authState) => {
  return {
    type: REDUX_ACTION.LOGIN_SUCCESS,
    payload: authState,
  };
};

export const updateSuccess = (username, image) => {
  return {
    type: REDUX_ACTION.UPDATE_SUCCESS,
    payload: {
      username,
      image,
    },
  };
};

export const signInHandler = (loginParams) => {
  return async (dispatch) => {
    const response = await signIn(loginParams);
    console.log(response);
    console.log(loginParams);
    const authState = {
      username: response.data.data.username,
      image: response.data.data.image,
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};

export const signUpHandler = (signUpParams) => {
  return async (dispatch) => {
    const response = await signUp(signUpParams);
    await dispatch(signInHandler(signUpParams));
    return response;
  };
};
