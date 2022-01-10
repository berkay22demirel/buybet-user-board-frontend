import * as REDUX_ACTION from "./reduxConstants";

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
