import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function collectionReducer(state = initialState.collections, action) {
  switch (action.type) {
    case types.CREATE_COLLECTION_SUCCESS:
      return [...state, { ...action.collection }];
    case types.UPDATE_COLLECTION_SUCCESS:
      return state.map(collection =>
        collection.id === action.collection.id ? action.collection : collection
      );
    case types.LOAD_COLLECTIONS_SUCCESS:
      return action.collections;
    case types.DELETE_COLLECTION_OPTIMISTIC:
      return state.filter(collection => collection.id !== action.collection.id);
    default:
      return state;
  }
}
