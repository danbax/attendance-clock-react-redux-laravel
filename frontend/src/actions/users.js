import {
  USER_ADDED_SUCCEFULLY,
  USER_ADDED_FAIL,
  USER_DELETED_SUCCEFULLY,
  USER_DELETED_FAIL,
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
  SET_MESSAGE,
  SET_USER_LIST
} from "./types";

import UserService from "../services/user.service";


export const setUserList = () => (dispatch) => {
  return UserService.users().then(
    (response) => {
      dispatch({
        type: SET_USER_LIST,
        payload: response.data.data
      });
      return Promise.resolve();

      },
    (error) => {
      return Promise.reject();
    }
  );
};

export const addUser = (username, email, password) => (dispatch) => {
  return UserService.addUser(username, email, password).then(
    (response) => {
      if(response.data.status==RESPONSE_SUCCESS){
        dispatch({
          type: USER_ADDED_SUCCEFULLY,
          payload: response.data.data
        });
        return Promise.resolve();
      }
      if(response.data.status==RESPONSE_ERROR){
        const message =response.data.error;

      dispatch({
        type: USER_ADDED_FAIL,
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
        type: USER_ADDED_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteUser = (userId) => (dispatch) => {
  return UserService.deleteUser(userId).then(
    (response) => {
      if(response.data.status==RESPONSE_SUCCESS){
        dispatch({
          type: USER_DELETED_SUCCEFULLY,
          payload: response.data.data
        });
        return Promise.resolve();
      }
      if(response.data.status==RESPONSE_ERROR){
        const message =response.data.error;

      dispatch({
        type: USER_DELETED_FAIL,
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
        type: USER_DELETED_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};