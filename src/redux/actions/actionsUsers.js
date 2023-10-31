import axios from "axios";
import { toast } from "sonner";
import {
  GET_USERS,
  GET_PERMISSIONS,
  GET_ROLES,
  GET_ROLES_USER,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_PERMISSIONS,
  CREATE_ROLES,
  UPDATE_ROLES,
} from "./actionTypes";
import {
  ENDPOINT,
  USERS_URL,
  PERMISSIONS_URL,
  ROLES_URL,
  ROLES_USER_URL,
} from "./path";

// Acción para obtener datos de usuarios
export const getUsers = () => {
  return async (dispatch) => {
    const usersPath = `${ENDPOINT}${USERS_URL}`;
    try {
      const { data } = await axios.get(usersPath);
      return dispatch({
        type: GET_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("No hay datos de usuarios");
    }
  };
};

//Accion para crear un usuario
export const createUser = (userData) => {
  return async (dispatch) => {
    const usersPath = `${ENDPOINT}${USERS_URL}`;
    try {
      const { data } = await axios.post(usersPath, userData);
      toast.success("Usuario creado con éxito");
      dispatch(getUsers());
      return dispatch({
        type: CREATE_USER,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear los datos del usuario, intentar de nuevo");
    }
  };
};

//Acción para actualizar un usuario
export const updateUser = (userData, id) => {
  return async (dispatch) => {
    const usersPath = `${ENDPOINT}${USERS_URL}/${id}`;
    try {
      const { data } = await axios.put(usersPath, userData);
      toast.success("Usuario actualizado correctamente");
      dispatch(getUsers());
      return dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "No se pudo actualizar los datos del usuario, intentar de nuevo"
      );
    }
  };
};

//Acción para eliminar un usuario del sistema
export const deleteUser = (id) => {
  return async (dispatch) => {
    const usersPath = `${ENDPOINT}${USERS_URL}/${id}`;
    try {
      await axios.delete(usersPath);
      toast.success("Usuario eliminado correctamente");
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de usuarios");
    }
  };
};

// Acción para obtener datos de permisos
export const getPermissions = () => {
  return async (dispatch) => {
    const permissionsUrl = `${ENDPOINT}${PERMISSIONS_URL}`;
    try {
      const { data } = await axios.get(permissionsUrl);
      return dispatch({
        type: GET_PERMISSIONS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("No hay datos de permisos");
    }
  };
};

//Acción para actualizar permisos
export const updatePermissions = (userData, id) => {
  return async (dispatch) => {
    const permissionsPath = `${ENDPOINT}${PERMISSIONS_URL}/${id}`;
    try {
      const { data } = await axios.put(permissionsPath, userData);
      toast.success("Usuario actualizado correctamente");
      dispatch(getUsers());
      return dispatch({
        type: UPDATE_PERMISSIONS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "No se pudo actualizar los roles del usuario, intentar de nuevo"
      );
    }
  };
};

// Acción para obtener datos de roles
export const getRoles = () => {
  return async (dispatch) => {
    const rolesUrl = `${ENDPOINT}${ROLES_URL}`;
    try {
      const { data } = await axios.get(rolesUrl);
      return dispatch({
        type: GET_ROLES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("No hay datos de roles");
    }
  };
};

export const getRolesuser = () => {
  return async (dispatch) => {
    const rolesUrl = `${ENDPOINT}${ROLES_USER_URL}`;
    try {
      const { data } = await axios.get(rolesUrl);
      return dispatch({
        type: GET_ROLES_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("No hay datos de roles");
    }
  };
}


//Acción para crear roles
export const createRoles = (userData) => {
  return async (dispatch) => {
    const rolesPath = `${ENDPOINT}${ROLES_USER_URL}`;
    try {
      const { data } = await axios.post(rolesPath, userData);
      toast.success("Usuario actualizado correctamente");
      dispatch(getUsers());
      dispatch(getRoles());
      dispatch(getRolesuser());
      return dispatch({
        type: CREATE_ROLES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "No se pudo actualizar los roles del usuario, intentar de nuevo"
      );
    }
  };
};

//Acción para actualizar roles
export const updateRoles = (userData, id) => {
  return async (dispatch) => {
    const rolesPath = `${ENDPOINT}${ROLES_USER_URL}/${id}`;
    try {
      const { data } = await axios.put(rolesPath, userData);
      toast.success("Usuario actualizado correctamente");
      dispatch(getUsers());
      dispatch(getRoles());
      dispatch(getRolesuser());
      return dispatch({
        type: UPDATE_ROLES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "No se pudo actualizar los roles del usuario, intentar de nuevo"
      );
    }
  };
};
