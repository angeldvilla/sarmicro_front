import {
  GET_BALANCES,
  GET_DETAIL_POLICYS,
  LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  detailPolicys: {},
  balancesData: [],
};

export default function DetailPolicysReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAIL_POLICYS:
      return {
        ...state,
        detailPolicys: action.payload,
      };
    case GET_BALANCES:
      return {
        ...state,
        balancesData: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        detailPolicys: {},
      };

    default:
      return {
        ...state,
      };
  }
}
