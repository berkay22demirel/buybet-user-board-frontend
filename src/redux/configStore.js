import { createStore } from "redux";
import authReducer from "./authReducer";
import { AUTH_LOCAL_STORAGE_KEY } from "./reduxConstants";

const configStore = () => {
  const buybetAuth = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

  let stateInLocalStorage = undefined;

  if (buybetAuth) {
    try {
      stateInLocalStorage = JSON.parse(buybetAuth);
    } catch (error) {}
  }

  const store = createStore(
    authReducer,
    stateInLocalStorage,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    localStorage.setItem(
      AUTH_LOCAL_STORAGE_KEY,
      JSON.stringify(store.getState())
    );
  });

  return store;
};

export default configStore;
