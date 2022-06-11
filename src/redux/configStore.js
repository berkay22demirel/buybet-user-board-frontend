import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "./authReducer";
import { AUTH_LOCAL_STORAGE_KEY } from "./reduxConstants";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import { setAuthorizationHeader } from "../api/userApiCalls";

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  const buybetAuth = secureLs.get(AUTH_LOCAL_STORAGE_KEY);
  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    password: undefined,
    image: undefined,
  };
  if (buybetAuth) {
    return buybetAuth;
  }
  return stateInLocalStorage;
};

const updateStateInStorage = (newState) => {
  secureLs.set(AUTH_LOCAL_STORAGE_KEY, newState);
};

const configStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    authReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });

  return store;
};

export default configStore;
