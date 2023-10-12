import { GET_VEHICULOS, LOGOUT } from "../actions/actionTypes";

const initialState = {
  vechiculosData: [],
};

export default function VehiclesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICULOS:
      return {
        ...state,
        vechiculosData: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        vechiculosData: [],
      };

    default:
      return {
        ...state,
      };
  }
}
