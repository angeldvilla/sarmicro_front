import {
  GET_VEHICULOS,
  GET_EXPORT_EXCEL_VINCULADOS,
  GET_EXPORT_EXCEL_DESVINCULADOS,
  GET_OFF_VEHICULOS,
  CREATE_VEHICULO,
  UPDATE_VEHICULO,
  LOGOUT,
  LOADING,
  GET_PROPIETARY,
  GET_BRANDS
} from "../actions/actionTypes";

const initialState = {
  vechiculosData: [],
  offVehiculos: [],
  propietaryData: [],
  brandsData: [],
  excelExportVinculados: [],
  excelExportDesvinculados: [],
  isLoading: null,
};

export default function VehiclesReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case GET_VEHICULOS:
      return {
        ...state,
        vechiculosData: action.payload,
        isLoading: false,
      };

    case GET_OFF_VEHICULOS:
      return {
        ...state,
        offVehiculos: action.payload,
        isLoading: false,
      };

    case GET_PROPIETARY:
      return {
        ...state,
        propietaryData: action.payload,
        isLoading: false,
      };

    case GET_BRANDS:
      return {
        ...state,
        brandsData: action.payload,
        isLoading: false,
      };

    case CREATE_VEHICULO:
      const newValue = [...state.vechiculosData, action.payload];
      return {
        ...state,
        vechiculosData: newValue,
        isLoading: false,
      };

    case UPDATE_VEHICULO:
      const updateValue = [...state.vechiculosData, action.payload];
      return {
        ...state,
        vechiculosData: updateValue,
        isLoading: false,
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
