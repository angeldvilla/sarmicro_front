import axios from "axios";
import { toast } from "sonner";
import { ENDPOINT, VALOR_POLIZA_URL } from "./path.js";
import {
  CREATE_VALOR_POLIZA,
  GET_VALOR_POLIZA,
  UPDATE_VALOR_POLIZA,
} from "./actionTypes";

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

//Accion para crear valor de poliza
export const createValorPoliza = (valueData) => {
  return async (dispatch) => {
    const valoresPolizasPath = `${ENDPOINT}${VALOR_POLIZA_URL}`;
    try {
      const { data } = await axios.post(valoresPolizasPath, valueData);
      toast.success("Valor de poliza creado con éxito");
      dispatch(getValoresPolizas());
      return dispatch({
        type: CREATE_VALOR_POLIZA,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al crear valor de poliza");
    }
  };
};

//Acción para editar valor de poliza
export const updateValorPoliza = (valueData, id) => {
  return async (dispatch) => {
    const valoresPolizasPath = `${ENDPOINT}${VALOR_POLIZA_URL}/${id}`;
    try {
      const { data } = await axios.put(valoresPolizasPath, valueData);
      toast.success("Valor de poliza se edito correctamente");
      dispatch(getValoresPolizas());
      return dispatch({
        type: UPDATE_VALOR_POLIZA,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al editar valor de poliza");
    }
  };
};

//Acción para editar valor de poliza
export const deleteValorPoliza = (id) => {
  return async (dispatch) => {
    const valoresPolizasPath = `${ENDPOINT}${VALOR_POLIZA_URL}/${id}`;
    try {
      await axios.delete(valoresPolizasPath);
      toast.success("Valor de poliza se eliminó correctamente");
      dispatch(getValoresPolizas());
    } catch (error) {
      console.log(error);
      toast.error("Error al editar valor de poliza");
    }
  };
};
