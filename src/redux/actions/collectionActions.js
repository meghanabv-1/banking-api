import * as types from "./actionTypes";
import * as collectionApi from "../../api/collectionApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCollectionSuccess(collections) {
  return { type: types.LOAD_COLLECTIONS_SUCCESS, collections };
}

export function createCollectionSuccess(collection) {
  return { type: types.CREATE_COLLECTION_SUCCESS, collection };
}

export function updateCollectionSuccess(collection) {
  return { type: types.UPDATE_COLLECTION_SUCCESS, collection };
}

export function deleteCollectionOptimistic(collection) {
  return { type: types.DELETE_COLLECTION_OPTIMISTIC, collection };
}

export function loadCollections() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return collectionApi
      .getCollections()
      .then(collections => {
        dispatch(loadCollectionSuccess(collections));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCollection(collection) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return collectionApi
      .saveCollection(collection)
      .then(savedCollection => {
        collection.id
          ? dispatch(updateCollectionSuccess(savedCollection))
          : dispatch(createCollectionSuccess(savedCollection));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCollection(collection) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCollectionOptimistic(collection));
    return collectionApi.deleteCollection(collection.id);
  };
}
