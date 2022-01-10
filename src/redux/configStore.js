import { createStore } from "redux";
import authReducer from "./authReducer";

const defaultAuthState = {
  isLoggedIn: false,
  username: undefined,
  password: undefined,
};

const configStore = () => {
  return createStore(
    authReducer,
    defaultAuthState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configStore;
