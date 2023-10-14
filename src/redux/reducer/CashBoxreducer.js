import {
    CREATE_PAGO,
    GET_PAGOS,
    LOGOUT,
    UPDATE_PAGO,
  } from "../actions/actionTypes";
  
  const initialState = {
    pagosData: [],
  };
  
  export default function CuotasReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PAGOS:
        return {
          ...state,
          pagosData: action.payload,
        };
  
      case CREATE_PAGO:
        const newValuePago = [...state.pagosData, action.payload];
        return {
          ...state,
          pagosData: newValuePago,
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
        };
  
      default:
        return {
          ...state,
        };
    }
  }
  