import axios from "axios";
import { ENDPOINT, VEHICULOS_URL } from "./path.js";
import { GET_VEHICULOS } from "./actionTypes.js";
import { toast } from "sonner";

// Acción para obtener datos de vehiculos
export const getVehiculos = () => {
  return async (dispatch) => {
    const vechiculosPath = `${ENDPOINT}${VEHICULOS_URL}`;
    try {
      const { data } = await axios.get(vechiculosPath);
      return dispatch({
        type: GET_VEHICULOS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de vehiculos");
    }
  };
};