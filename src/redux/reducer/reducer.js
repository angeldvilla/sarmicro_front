import { combineReducers } from "redux";
import AuthReducer from "./Authreducer";
import PaymentsReducer from "./Paymentsreducer";
import ValuesReducer from "./Valuesreducer";
import VehiclesReducer from "./Vehiclesreducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  payments: PaymentsReducer,
  values: ValuesReducer,
  vehicles: VehiclesReducer,
});

export default rootReducer;
