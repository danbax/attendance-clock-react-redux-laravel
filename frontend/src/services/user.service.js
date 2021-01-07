import axios from "axios";
import authHeader from "./auth-header";
import { RESPONSE_SUCCESS } from "../actions/types";

const API_URL = "http://127.0.0.1:8000/api/";

const users = () => {
  let user  = JSON.parse(localStorage.getItem('user'));
  return axios
    .post(API_URL + "users/getUsersInMyCompany", {
      clientId : user.clientId,
      token : user.token
    })
    .then((response) => {
      if (response.status == RESPONSE_SUCCESS) {
        console.log(response);
      }

      return response;
    });
};


const addUser = (name,email,password) => {
  let user  = JSON.parse(localStorage.getItem('user'));
  return axios
    .post(API_URL + "users/addUser", {
      clientId : user.clientId,
      token : user.token,
      name,
      email,
      password
    })
    .then((response) => {
      if (response.status == RESPONSE_SUCCESS) {
        console.log(response);
      }

      return response;
    });
};

const deleteUser = (userId) => {
  let user  = JSON.parse(localStorage.getItem('user'));
  return axios
    .post(API_URL + "users/deleteUser", {
      clientId : user.clientId,
      token : user.token,
      userId
    })
    .then((response) => {
      if (response.status == RESPONSE_SUCCESS) {
        console.log(response);
      }

      return response;
    });
};



export default {
  users,
  addUser,
  deleteUser
};