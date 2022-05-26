import * as REDUX_ACTION from "./reduxConstants";

const defaultAuthState = {
  isLoggedIn: false,
  username: undefined,
  password: undefined,
  image: undefined,
};

const authReducer = (state = { ...defaultAuthState }, action) => {
  if (action.type === REDUX_ACTION.LOGOUT_SUCCESS) {
    return defaultAuthState;
  } else if (action.type === REDUX_ACTION.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true,
    };
  } else if (action.type === REDUX_ACTION.UPDATE_SUCCESS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

export default authReducer;
