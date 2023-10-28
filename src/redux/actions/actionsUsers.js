import axios from "axios";
import { toast } from "sonner";
import { GET_USERS, CREATE_USER, UPDATE_USER } from "./actionTypes";
import { ENDPOINT, USERS_URL } from "./path";

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
