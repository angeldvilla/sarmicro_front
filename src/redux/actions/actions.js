import axios from "axios";
import {
  ENDPOINT,
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USERS_URL,
  CLIENTES_URL,
} from "./path.js";
import {
  POST_LOGIN,
  POST_REGISTER,
  LOGOUT,
  GET_USERS,
  GET_CLIENTES,
} from "./actionTypes.js";
import { toast } from "sonner";

export const authLogin = (userData, navigate) => {
  return async (dispatch) => {
    const loginPath = `${ENDPOINT}${LOGIN_URL}`;
    try {
      const { data } = await axios.post(loginPath, userData);
      console.log(data);

      toast.success("Ingreso correctamente!");
      setTimeout(() => {
        navigate("/inicio");
      }, 1500);
      return dispatch({
        type: POST_LOGIN,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Ups, intente de nuevo!");
    }
  };
};

export const registerUser = (userData, navigate) => {
  return async (dispatch) => {
    const registerPath = `${ENDPOINT}${REGISTER_URL}`;
    try {
      const { data } = await axios.post(registerPath, userData);

      toast.success("Cuenta creada!, inicia sesión!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
      return dispatch({
        type: POST_REGISTER,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
};

export const logoutUser = (navigate) => {
  return async (dispatch) => {
    /*  const logoutPath = `${ENDPOINT}${LOGOUT_URL}`; */
    try {
      /*  const { data } = await axios.get(logoutPath);

      if (data && data.status === 200) {
        return dispatch({
          type: LOGOUT,
          payload: data,
        });
      } */
      toast.success("Hasta pronto!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Error al cerrar sesión");
    }
  };
};

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

export const getClientes = () => {
  return async (dispatch) => {
    const clientesPath = `${ENDPOINT}${CLIENTES_URL}`;
    try {
      const { data } = await axios.get(clientesPath);
      return dispatch({
        type: GET_CLIENTES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
};
