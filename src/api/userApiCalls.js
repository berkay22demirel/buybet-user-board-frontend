import axios from "axios";

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
