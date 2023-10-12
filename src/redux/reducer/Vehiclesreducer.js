import { GET_VEHICULOS } from "../actions/actionTypes";

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

    default:
      return {
        ...state,
      };
  }
}
