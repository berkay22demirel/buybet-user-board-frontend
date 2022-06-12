import axios from "axios";

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + ":" + password)}`;
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const signIn = (login) => {
  return axios.post("/api/1.0/auth", {}, { auth: login });
};

export const signUp = (user) => {
  return axios.post("/api/1.0/users", user);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};

export const getUser = (username) => {
  return axios.get("/api/1.0/users/" + username);
};

export const updateUser = (username, user) => {
  return axios.put("/api/1.0/users/" + username, user);
};

export const createPost = (post) => {
  return axios.post("/api/1.0/posts", post);
};

export const getPosts = (username, page = 0) => {
  const path = username
    ? "/api/1.0/users/" + username + "/posts?page="
    : "/api/1.0/posts?page=";
  return axios.get(path + page);
};

export const getOldPost = (lastId, username) => {
  const path = username
    ? "/api/1.0/users/" + username + "/posts/"
    : "/api/1.0/posts/";
  return axios.get(path + lastId);
};
