import { combineReducers } from "redux";
import AuthReducer from "./Authreducer";
import PaymentsReducer from "./Paymentsreducer";
import ValuesReducer from "./Valuesreducer";
import VehiclesReducer from "./Vehiclesreducer";
import CuotasReducer from "./Cuotasreducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  payments: PaymentsReducer,
  values: ValuesReducer,
  cuotas: CuotasReducer,
  vehicles: VehiclesReducer,
});

export default rootReducer;
