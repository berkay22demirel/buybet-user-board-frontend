import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "./authReducer";
import { AUTH_LOCAL_STORAGE_KEY } from "./reduxConstants";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";

const secureLs = new SecureLS();

const configStore = () => {
  const buybetAuth = secureLs.get(AUTH_LOCAL_STORAGE_KEY);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    authReducer,
    buybetAuth,
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    secureLs.set(AUTH_LOCAL_STORAGE_KEY, store.getState());
  });

  return store;
};

export default configStore;
