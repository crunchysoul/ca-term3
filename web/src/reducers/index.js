import {combineReducers} from "redux";
import sessionReducer from "./session.js";
import userReducer from "./user.js";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
});

export default rootReducer;
