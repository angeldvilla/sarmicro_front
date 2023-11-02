import {
  GET_USERS,
  POST_REGISTER,
  GET_PERMISSIONS,
  GET_ROLES,
  CREATE_USER,
  UPDATE_USER,
  LOGOUT,
  UPDATE_PERMISSIONS,
  UPDATE_ROLES,
  GET_ROLES_USER,
  CREATE_ROLES,
  GET_PERMISSIONSANDROLES,
} from "../actions/actionTypes";

const initialState = {
  usersData: [],
  permissionsData: [],
  rolesData: [],
  userRoles: [],
  permissionRoles: [],
};

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersData: action.payload,
      };

    case POST_REGISTER:
      return {
        ...state,
        usersData: action.payload,
      };

    case GET_PERMISSIONS:
      return {
        ...state,
        permissionsData: action.payload,
      };

    case GET_ROLES:
      return {
        ...state,
        rolesData: action.payload,
      };

    case GET_ROLES_USER:
      return {
        ...state,
        userRoles: action.payload,
      };

    case CREATE_USER:
      const newUser = [...state.usersData, action.payload];
      return {
        ...state,
        usersData: newUser,
      };

    case UPDATE_USER:
      const updatedUsers = [...state.usersData, action.payload];
      return {
        ...state,
        usersData: updatedUsers,
      };

    case GET_PERMISSIONSANDROLES:
      return {
        ...state,
        permissionRoles: action.payload,
      };

    case UPDATE_PERMISSIONS:
      const updatedPermissions = [...state.permissionsData, action.payload];
      return {
        ...state,
        permissionsData: updatedPermissions,
      };

    case CREATE_ROLES:
      const newRole = [...state.rolesData, action.payload];
      return {
        ...state,
        rolesData: newRole,
      };

    case UPDATE_ROLES:
      const updatedRoles = [...state.rolesData, action.payload];
      return {
        ...state,
        rolesData: updatedRoles,
      };

    case LOGOUT:
      return {
        ...state,
        usersData: [],
        permissionsData: [],
        rolesData: [],
        userRoles: [],
        permissionRoles: [],
      };
    default:
      return {
        ...state,
      };
  }
}
