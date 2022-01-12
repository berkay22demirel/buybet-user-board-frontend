import { createStore } from "redux";
import authReducer from "./authReducer";
import { AUTH_LOCAL_STORAGE_KEY } from "./reduxConstants";
import SecureLS from "secure-ls";

const secureLs = new SecureLS();

const configStore = () => {
  const buybetAuth = secureLs.get(AUTH_LOCAL_STORAGE_KEY);

  const store = createStore(
    authReducer,
    buybetAuth,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    secureLs.set(AUTH_LOCAL_STORAGE_KEY, store.getState());
  });

  return store;
};

export default configStore;
