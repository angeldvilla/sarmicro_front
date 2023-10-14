import {
  CREATE_VALOR_POLIZA,
  GET_VALOR_POLIZA,
  LOGOUT,
  UPDATE_VALOR_POLIZA,
} from "../actions/actionTypes";

const initialState = {
  valuesData: [],
};

export default function ValuesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VALOR_POLIZA:
      return {
        ...state,
        valuesData: action.payload,
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
      };

    default:
      return {
        ...state,
      };
  }
}
