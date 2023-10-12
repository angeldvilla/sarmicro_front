import { combineReducers } from "redux";
import AuthReducer from "./Authreducer";
import PaymentsReducer from "./Paymentsreducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  payments: PaymentsReducer
});

export default rootReducer;
