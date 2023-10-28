import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  usersData: [],
};

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersData: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        usersData: [],
      };

    case CREATE_USER:
      const newUser = [...state.usersData, action.payload];
      return {
        ...state,
        userData: newUser,
      };

    case UPDATE_USER:
      const updatedUsers = [...state.usersData, action.payload];
      return {
        ...state,
        userData: updatedUsers,
      };

    default:
      return {
        ...state,
      };
  }
}
