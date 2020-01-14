import { combineReducers } from "redux";

import apiCallsInProgress from "./apiStatusReducer";
import courses from "./courseReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  apiCallsInProgress,
  courses,
  user
});

export default rootReducer;
