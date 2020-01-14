import axios from 'axios';

import { handleResponse, handleError } from "./apiUtils";
import { API_BASE_URL } from './configure';

export function getCollections() {
  return axios.get(API_BASE_URL)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCollection(collection) {
  return axios(API_BASE_URL + (collection.id || ""), {
    method: collection.id ? "PUT" : "POST",
    config: { headers: {'Content-Type': 'application/json' }},
    data: collection,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCollection(collectionId) {
  return axios.delete(API_BASE_URL + collectionId)
    .then(handleResponse)
    .catch(handleError);
}
