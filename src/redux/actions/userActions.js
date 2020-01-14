import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loginUserSuccess(user) {
  return { type: types.LOGIN_USER_SUCCESS, user };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

export function login(user) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUser(user)
      .then(response => {
        if(response.length > 0){
          dispatch(loginUserSuccess(user));
        } else {
          dispatch(saveUser(user));
        }
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveUser(user) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .saveUser(user)
      .then(savedUser => {
        dispatch(createUserSuccess(savedUser));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}