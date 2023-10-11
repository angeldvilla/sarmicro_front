import { POST_LOGIN } from "../actions/actionTypes";

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

    default:
      return {
        ...state,
      };
  }
}
