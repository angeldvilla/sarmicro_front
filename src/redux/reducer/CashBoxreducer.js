import {
  CREATE_PAGO,
  SAVE_PAGO,
  GET_PAGOS,
  LOGOUT,
  UPDATE_PAGO,
  GET_BALANCES,
} from "../actions/actionTypes";

const initialState = {
  pagosData: [],
  balancesData: [],
  egresoData: [],
};

export default function CuotasReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PAGOS:
      return {
        ...state,
        pagosData: action.payload,
      };

    case GET_BALANCES:
      return {
        ...state,
        balancesData: action.payload,
      };

    case CREATE_PAGO:
      const newValuePago = [...state.pagosData, action.payload];
      return {
        ...state,
        pagosData: newValuePago,
      };

    case SAVE_PAGO:
      return {
        ...state,
        egresoData: action.payload,
      };

    case UPDATE_PAGO:
      const updatePago = [...state.pagosData, action.payload];
      return {
        ...state,
        pagosData: updatePago,
      };

    case LOGOUT:
      return {
        ...state,
        pagosData: [],
        balancesData: [],
      };

    default:
      return {
        ...state,
      };
  }
}
