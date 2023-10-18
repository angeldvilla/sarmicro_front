import axios from "axios";
import { ENDPOINT, LOGIN_URL, REGISTER_URL, USERS_URL } from "./path.js";
import { POST_LOGIN, POST_REGISTER, LOGOUT, GET_USERS } from "./actionTypes.js";
import { toast } from "sonner";

// Acción para autenticar al usuario y redirigirlo a la página de inicio
export const authLogin = (userData, navigate) => {
  return async (dispatch) => {
    const loginPath = `${ENDPOINT}${LOGIN_URL}`;
    try {
      const { data } = await axios.post(loginPath, userData);

      // Mostrar un mensaje de éxito y redirigir al usuario a la página de inicio
      setTimeout(() => {
        toast.success("Ingreso correctamente!");
        navigate("/inicio");
      }, 1000);
      return dispatch({
        type: POST_LOGIN,
        payload: data,
      });
    } catch (error) {
      // En caso de error, mostrar un mensaje de error
      toast.error(`${error.response.data.mensaje}, intente de nuevo!`);
    }
  };
};

// Acción para registrar un nuevo usuario
export const registerUser = (userData, navigate) => {
  return async (dispatch) => {
    const registerPath = `${ENDPOINT}${REGISTER_URL}`;
    try {
      const { data } = await axios.post(registerPath, userData);

      // Mostrar un mensaje de éxito y redirigir al usuario para iniciar sesión
      toast.success("Cuenta creada!, inicia sesión!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return dispatch({
        type: POST_REGISTER,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      // En caso de error, mostrar un mensaje de error
      toast.error(`${error.response.data.mensaje}, intente de nuevo!`);
    }
  };
};

// Acción para cerrar sesión
export const logoutUser = (unAuthenticated, navigate) => {
  return async (dispatch) => {
    /* const logoutPath = `${ENDPOINT}${LOGOUT_URL}`; */
    try {
      /* await axios.post(logoutPath, unAuthenticated); */

      // Realizar el proceso de cierre de sesión
      setTimeout(() => {
        toast.success("Cerraste sesión, hasta pronto!");
        navigate("/");
      }, 1200);

      return dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al cerrar sesión");
    }
  };
};

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
