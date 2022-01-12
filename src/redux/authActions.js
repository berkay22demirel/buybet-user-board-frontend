import * as REDUX_ACTION from "./reduxConstants";
import { signIn } from "../api/userApiCalls";

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

export const SignInHandler = (loginParams) => {
  return async (dispatch) => {
    const response = await signIn(loginParams);
    const authState = {
      ...loginParams,
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};
