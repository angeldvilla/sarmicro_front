import {
  GET_CLIENTES,
  GET_POLIZAS,
  CREATE_POLIZA,
  UPDATE_POLIZA,
  LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  clientesData: [],
  polizasData: [],
};

export default function PaymentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTES:
      return {
        ...state,
        clientesData: action.payload,
      };

    case GET_POLIZAS:
      return {
        ...state,
        polizasData: action.payload,
      };

    case CREATE_POLIZA:
      const newValue = [...state.polizasData, action.payload];
      return {
        ...state,
        polizasData: newValue,
      };

    case UPDATE_POLIZA:
      const updatedValue = [...state.polizasData, action.payload];
      return {
        ...state,
        polizasData: updatedValue,
      };

    case LOGOUT: 
    return {
      ...state,
      clientesData: [],
      polizasData: [],
    }

    default:
      return {
        ...state,
      };
  }
}
