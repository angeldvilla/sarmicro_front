import axios from "axios";
import { ENDPOINT, LOGIN_URL, REGISTER_URL } from "./path.js";
import { POST_LOGIN, POST_REGISTER } from "./actionTypes.js";

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
  
