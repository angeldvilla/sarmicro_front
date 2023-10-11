import axios from "axios";
import {
  ENDPOINT,
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  USERS_URL,
  CLIENTES_URL,
  CUOTAS_URL,
  PAGOS_URL,
} from "./path.js";
import {
  POST_LOGIN,
  POST_REGISTER,
  LOGOUT,
  GET_USERS,
  GET_CLIENTES,
  GET_CUOTAS,
  GET_PAGOS,
} from "./actionTypes.js";

export const authLogin = (userData) => {
  return async (dispatch) => {
    const loginPath = `${ENDPOINT}${LOGIN_URL}`;
    try {
      const { data } = await axios.post(loginPath, userData);

      if (data && data.status === 200) {
        return dispatch({
          type: POST_LOGIN,
          payload: data,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    const registerPath = `${ENDPOINT}${REGISTER_URL}`;
    try {
      const { data } = await axios.post(registerPath, userData);

      if (data && data.status === 200) {
        return dispatch({
          type: POST_REGISTER,
          payload: data,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
};


export const logoutUser = () => {
  return async (dispatch) => {
    const logoutPath = `${ENDPOINT}${LOGOUT_URL}`;
    try {
      const { data } = await axios.post(logoutPath);

      if (data && data.status === 200) {
        return dispatch({
          type: LOGOUT,
          payload: data,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
};


export const getClientes = () => {
  return async (dispatch) => {
    const clientesPath = `${ENDPOINT}${CLIENTES_URL}`;
    try {
      const { data } = await axios.get(clientesPath);

      if (data && data.status === 200) {
        return dispatch({
          type: GET_CLIENTES,
          payload: data,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
};