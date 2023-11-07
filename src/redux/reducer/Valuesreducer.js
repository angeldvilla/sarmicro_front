import {
  CREATE_VALOR_POLIZA,
  GET_VALOR_POLIZA,
  GET_TIPO_POLIZAS,
  LOGOUT,
  UPDATE_VALOR_POLIZA,
  GET_TIPO_EMPRESA,
  GET_NAME_COMPANY,
  EDIT_COMPANY,
} from "../actions/actionTypes";

const initialState = {
  valuesData: [],
  typesPolicys: [],
  typesEnterprise: [],
  companyData: [],
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

    case GET_NAME_COMPANY:
      return {
        ...state,
        companyData: action.payload,
      };

    case EDIT_COMPANY:
      const editValueCompany = [...state.companyData, action.payload];
      return {
        ...state,
        companyData: editValueCompany,
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
