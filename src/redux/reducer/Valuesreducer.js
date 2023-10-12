import {
  CREATE_VALOR_POLIZA,
  GET_VALOR_POLIZA,
  LOGOUT,
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
      const updatedValues = [...state.valuesData, action.payload];
      return {
        ...state,
        valuesData: updatedValues,
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
