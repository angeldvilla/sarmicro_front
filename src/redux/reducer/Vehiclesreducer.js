import {
  GET_VEHICULOS,
  GET_EXPORT_EXCEL_VINCULADOS,
  GET_EXPORT_EXCEL_DESVINCULADOS,
  GET_OFF_VEHICULOS,
  CREATE_VEHICULO,
  UPDATE_VEHICULO,
  LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  vechiculosData: [],
  offVehiculos: [],
  excelExportVinculados: [],
  excelExportDesvinculados: [],
};

export default function VehiclesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICULOS:
      return {
        ...state,
        vechiculosData: action.payload,
      };

    case GET_OFF_VEHICULOS:
      return {
        ...state,
        offVehiculos: action.payload,
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

    case GET_EXPORT_EXCEL_VINCULADOS:
      return {
        ...state,
        excelExportVinculados: action.payload,
      };

    case GET_EXPORT_EXCEL_DESVINCULADOS:
      return {
        ...state,
        excelExportDesvinculados: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        vechiculosData: [],
        offVehiculos: [],
      };

    default:
      return {
        ...state,
      };
  }
}
