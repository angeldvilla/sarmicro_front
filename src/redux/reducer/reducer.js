import { combineReducers } from "redux";
import AuthReducer from "./Authreducer";
import PaymentsReducer from "./Paymentsreducer";
import VehiclesReducer from "./Vehiclesreducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  payments: PaymentsReducer,
  vehicles: VehiclesReducer,
});

export default rootReducer;
