import axios from "axios";
import { ENDPOINT, CLIENTES_URL } from "./path.js";
import { GET_CLIENTES, GET_POLIZAS } from "./actionTypes.js";
import { toast } from "sonner";

// Acción para obtener datos de clientes
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
      toast.error("No hay datos de clientes");
    }
  };
};

//Acción para crear obtener datos de polizas
export const getPolizas = () => {
  return async (dispatch) => {
    const polizasPath = `${ENDPOINT}${CLIENTES_URL}`;
    try {
      const { data } = await axios.get(polizasPath);
      return dispatch({
        type: GET_POLIZAS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
};