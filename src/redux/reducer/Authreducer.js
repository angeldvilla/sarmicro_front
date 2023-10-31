import { POST_LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
  authUser: {},
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
      };

    default:
      return {
        ...state,
      };
  }
}
