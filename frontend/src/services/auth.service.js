import axios from "axios";
import { RESPONSE_SUCCESS } from "../actions/types";

const API_URL = "http://127.0.0.1:8000/api/";

const register = (username, email, password,userType,companyName) => {
  return axios.post(API_URL + "users/create", {
    name: username,
    email,
    password,
    userType,
    companyName
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "users/login", {
      email:username,
      password,
    })
    .then((response) => {
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
