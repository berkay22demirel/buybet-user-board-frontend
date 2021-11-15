import axios from "axios";

export const signup = (user) => {
  return axios.post("/api/1.0/users", user);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
