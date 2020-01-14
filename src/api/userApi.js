import axios from 'axios';

import { handleResponse, handleError } from "./apiUtils";
import { API_BASE_URL } from './configure';

// export function getUser(user) {
//   return axios.get(`${API_BASE_URL}?email=${user.email}`)
//     .then(handleResponse)
//     .catch(handleError);
// }

export function registerUser(user) {
  return axios(API_BASE_URL+'register', {
    method: "GET",
    config: { headers: {'Content-Type': 'application/json' }},
    data: user,
  })
    .then(handleResponse)
    .catch(handleError);
}