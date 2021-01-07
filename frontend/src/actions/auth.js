import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password,userType,companyName) => (dispatch) => {
  return AuthService.register(username, email, password,userType,companyName).then(
    (response) => {
      if(response.data.status==RESPONSE_SUCCESS){
        dispatch({
          type: REGISTER_SUCCESS,
        });
        return Promise.resolve();
      }
      if(response.data.status==RESPONSE_ERROR){
        const message =response.data.error;

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      if(data.data.status == RESPONSE_SUCCESS){
        localStorage.setItem("user", JSON.stringify(data.data.data));
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.data.data },
      });
    }else{
      
      console.log('err');
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: data.data.error,
      });

    }

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
