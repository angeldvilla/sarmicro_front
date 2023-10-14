import axios from "axios";
import { ENDPOINT, CUOTAS_URL } from "./path.js";
import { GET_CUOTAS } from "./actionTypes.js";
import { toast } from "sonner";

// Acción para obtener datos de vehiculos
export const getCuotas = () => {
  return async (dispatch) => {
    const cuotasPath = `${ENDPOINT}${CUOTAS_URL}`;
    try {
      const { data } = await axios.get(cuotasPath);
      return dispatch({
        type: GET_CUOTAS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de cuotas");
    }
  };
};
