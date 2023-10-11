import { combineReducers } from "redux";
import AuthReducer from "./Authreducer";

const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
});

export default rootReducer;
