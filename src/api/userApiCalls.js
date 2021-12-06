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
