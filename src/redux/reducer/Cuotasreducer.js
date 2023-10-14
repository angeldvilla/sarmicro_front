import {
  CREATE_CUOTA,
  GET_CUOTAS,
  LOGOUT,
  UPDATE_CUOTA,
} from "../actions/actionTypes";

const initialState = {
  cuotasData: [],
};

export default function CuotasReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CUOTAS:
      return {
        ...state,
        cuotasData: action.payload,
      };

    case CREATE_CUOTA:
      const newCuotValue = [...state.cuotasData, action.payload];
      return {
        ...state,
        cuotasData: newCuotValue,
      };

    case UPDATE_CUOTA:
      const updateCuota = [...state.cuotasData, action.payload];
      return {
        ...state,
        cuotasData: updateCuota,
      };

    case LOGOUT:
      return {
        ...state,
        cuotasData: [],
      };

    default:
      return {
        ...state,
      };
  }
}
