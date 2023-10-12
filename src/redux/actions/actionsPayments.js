import axios from "axios";
import { ENDPOINT, CLIENTES_URL, POLIZAS_URL } from "./path.js";
import {
  CREATE_POLIZA,
  GET_CLIENTES,
  GET_POLIZAS,
  UPDATE_POLIZA,
} from "./actionTypes.js";
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
    const polizasPath = `${ENDPOINT}${POLIZAS_URL}`;
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

export const createPoliza = (polizaData) => {
  return async (dispatch) => {
    const polizaPath = `${ENDPOINT}${POLIZAS_URL}`;
    try {
      const { data } = await axios.post(polizaPath, polizaData);
      toast.success("Pago de poliza creado con exito");
      if (data) {
        return dispatch({
          type: CREATE_POLIZA,
          payload: data,
        });
      }
      dispatch(getPolizas());
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear el pago de poliza, intentar de nuevo");
    }
  };
};

export const updatePoliza = (polizaData, id) => {
  return async (dispatch) => {
    const polizaPath = `${ENDPOINT}${POLIZAS_URL}/${id}`;
    try {
      const { data } = await axios.put(polizaPath, polizaData);
      toast.success("Pago de poliza actualizado correctamente");
      if (data) {
        return dispatch({
          type: UPDATE_POLIZA,
          payload: data,
        });
      }
      dispatch(getPolizas());
    } catch (error) {
      console.log(error);
      toast.error("No se pudo actualizar el pago de poliza, intentar de nuevo");
    }
  };
};
