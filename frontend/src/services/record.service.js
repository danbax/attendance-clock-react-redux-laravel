import axios from "axios";
import authHeader from "./auth-header";
import { RESPONSE_SUCCESS } from "../actions/types";

const API_URL = "http://127.0.0.1:8000/api/";

const records = (userId) => {
  let user  = JSON.parse(localStorage.getItem('user'));
  return axios
    .post(API_URL + "records/getUserRecords", {
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

const enter = () => {
  let user  = JSON.parse(localStorage.getItem('user'));
  return axios
    .post(API_URL + "records/enter", {
      clientId : user.clientId,
      token : user.token
    })
    .then((response) => {
      return response;
    });
};

const exit = () => {
  let user  = JSON.parse(localStorage.getItem('user'));
  return axios
    .post(API_URL + "records/exit", {
      clientId : user.clientId,
      token : user.token
    })
    .then((response) => {
      return response;
    });
};

const lastRecord = () => {
  let user  = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  return axios
    .post(API_URL + "records/getUserLastRecord", {
      clientId : user.clientId,
      token : user.token
    })
    .then((response) => {
      console.log(response);
      if (response.status == RESPONSE_SUCCESS) {
        console.log(response);
        
      }

      return response;
    });
};


export default {
  records,
  lastRecord,
  enter,
  exit,
};