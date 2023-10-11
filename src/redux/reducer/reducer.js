import { combineReducers } from "redux";
import AuthReducer from "./Authreducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;
