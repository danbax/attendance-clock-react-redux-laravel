import {
  USER_ADDED_SUCCEFULLY,
  USER_ADDED_FAIL,
  USER_DELETED_SUCCEFULLY,
  USER_DELETED_FAIL,
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
  SET_MESSAGE,
  SET_USER_LIST
} from "../actions/types";


const initialState = { usersList: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_LIST:
      return {
        ...state,
        usersList : [...action.payload]
      };
    case USER_ADDED_SUCCEFULLY:
      return {
        ...state,
        usersList: [...state.usersList, action.payload],
      };
    case USER_ADDED_FAIL:
      return {
        ...state,
        usersList: [state.usersList],
      };
    case USER_DELETED_SUCCEFULLY:
      return {
        ...state,
        usersList: [...state.usersList.slice(0, action.payload),
          ...state.usersList.slice(action.payload + 1)],
      };
    case USER_DELETED_FAIL:
      return {
        ...state,
        usersList: [state.usersList],
      };
    default:
      return state;
  }
}
