import * as REDUX_ACTION from "./reduxConstants";

const defaultAuthState = {
  isLoggedIn: false,
  username: undefined,
  password: undefined,
};

const authReducer = (state = { ...defaultAuthState }, action) => {
  if (action.type === REDUX_ACTION.LOGOUT_SUCCESS) {
    return defaultAuthState;
  } else if (action.type === REDUX_ACTION.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true,
    };
  }
  return state;
};

export default authReducer;
