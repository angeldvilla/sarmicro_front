import axios from "axios";
import { toast } from "sonner";
import { ENDPOINT, VALOR_POLIZA_URL } from "./path.js";
import { CREATE_VALOR_POLIZA, GET_VALOR_POLIZA } from "./actionTypes";

//Acción para traer valores de polizas
export const getValoresPolizas = () => {
  return async (dispatch) => {
    const valoresPolizasPath = `${ENDPOINT}${VALOR_POLIZA_URL}`;
    try {
      const { data } = await axios.get(valoresPolizasPath);
      return dispatch({
        type: GET_VALOR_POLIZA,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener valores de polizas");
    }
  };
};

export const createValorPoliza = (valueData) => {
  return async (dispatch) => {
    const valoresPolizasPath = `${ENDPOINT}${VALOR_POLIZA_URL}`;
    try {
      const { data } = await axios.post(valoresPolizasPath, valueData);
      toast.success("Valor de poliza creado con éxito");
      if (data) {
        return dispatch({
          type: CREATE_VALOR_POLIZA,
          payload: data,
        });
      }
      dispatch(getValoresPolizas());
    } catch (error) {
      console.log(error);
      toast.error("Error al crear valor de poliza");
    }
  };
};
