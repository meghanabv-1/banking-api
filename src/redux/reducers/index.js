import { combineReducers } from "redux";

import apiCallsInProgress from "./apiStatusReducer";
import collections from "./collectionReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  apiCallsInProgress,
  collections,
  user
});

export default rootReducer;
