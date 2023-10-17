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
      const updatedVehicleIndex = state.vechiculosData.findIndex(
        (vehicle) => vehicle.id_movil === action.payload.id_movil
      );
      if (updatedVehicleIndex !== -1) {
        const updatedData = [...state.vechiculosData];
        updatedData[updatedVehicleIndex] = action.payload;
        return {
          ...state,
          vechiculosData: updatedData,
        };
      }
      return state; // En caso de que no se encuentre el vehículo, retornamos el estado actual.

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
