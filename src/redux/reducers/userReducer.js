import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return [...state, { ...action.user }];
    case types.LOGIN_USER_SUCCESS:
      return action.user;
    default:
      return state;
  }
}