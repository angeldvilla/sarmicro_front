import { GET_CLIENTES, GET_POLIZAS } from "../actions/actionTypes";

const initialState = {
    clientesData: {},
    polizasData: {},
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
        }

    default:
      return {
        ...state,
      };
  }
}
