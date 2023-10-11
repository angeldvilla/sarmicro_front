import {
  GET_USERS,
  LOGOUT,
  POST_LOGIN,
  POST_REGISTER,
} from "../actions/actionTypes";

const initialState = {
  authUser: {},
  userData: {},
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LOGIN:
      return {
        ...state,
        authUser: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        authUser: {},
        userData: {},
      };

    case POST_REGISTER:
      return {
        ...state,
        userData: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
