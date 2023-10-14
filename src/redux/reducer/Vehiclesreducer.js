import {
  GET_VEHICULOS,
  CREATE_VEHICULO,
  UPDATE_VEHICULO,
  LOGOUT,
} from "../actions/actionTypes";

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

    case CREATE_VEHICULO:
      const newValue = [...state.vechiculosData, action.payload];
      return {
        ...state,
        vechiculosData: newValue,
      };

    case UPDATE_VEHICULO:
      const updateValue = [...state.vechiculosData, action.payload];
      return {
        ...state,
        vechiculosData: updateValue,
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
