import {
  CREATE_VALOR_POLIZA,
  GET_VALOR_POLIZA,
  GET_TIPO_POLIZAS,
  LOGOUT,
  UPDATE_VALOR_POLIZA,
  GET_TIPO_EMPRESA,
} from "../actions/actionTypes";

const initialState = {
  valuesData: [],
  typesPolicys: [],
  typesEnterprise: [],
};

export default function ValuesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VALOR_POLIZA:
      return {
        ...state,
        valuesData: action.payload,
      };

    case GET_TIPO_POLIZAS:
      return {
        ...state,
        typesPolicys: action.payload,
      };

    case GET_TIPO_EMPRESA:
      return {
        ...state,
        typesEnterprise: action.payload,
      };

    case CREATE_VALOR_POLIZA:
      const newValue = [...state.valuesData, action.payload];
      return {
        ...state,
        valuesData: newValue,
      };

    case UPDATE_VALOR_POLIZA:
      const updatedValue = [...state.valuesData, action.payload];
      return {
        ...state,
        valuesData: updatedValue,
      };

    case LOGOUT:
      return {
        ...state,
        valuesData: [],
        typesPolicys: [],
      };

    default:
      return {
        ...state,
      };
  }
}
