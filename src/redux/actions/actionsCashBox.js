import axios from "axios";
import { ENDPOINT, PAGOS_URL } from "./path.js";
import { CREATE_PAGO, GET_PAGOS, UPDATE_PAGO } from "./actionTypes.js";
import { toast } from "sonner";

// Acción para obtener datos de pagos
export const getPagos = () => {
  return async (dispatch) => {
    const pagosPath = `${ENDPOINT}${PAGOS_URL}`;
    try {
      const { data } = await axios.get(pagosPath);
      return dispatch({
        type: GET_PAGOS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de Pagos");
    }
  };
};

// Acción para crear pagos
export const createPago = (pagoData) => {
  return async (dispatch) => {
    const pagosPath = `${ENDPOINT}${PAGOS_URL}`;
    try {
      const { data } = await axios.post(pagosPath, pagoData);
      toast.success("Pago creado con exito");
      dispatch(getPagos());
      return dispatch({
        type: CREATE_PAGO,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el pago, intentar de nuevo");
    }
  };
};

// Acción para editar pagos
export const updatePago = (pagoData, id) => {
  return async (dispatch) => {
    const pagosPath = `${ENDPOINT}${PAGOS_URL}/${id}`;
    try {
      const { data } = await axios.put(pagosPath, pagoData);
      toast.success("Pago se edito correctamente");
      dispatch(getPagos());
      return dispatch({
        type: UPDATE_PAGO,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al editar el pago, intentar de nuevo");
    }
  };
};

// Acción para eliminar pagos
export const deletePago = (id) => {
  return async (dispatch) => {
    const pagosPath = `${ENDPOINT}${PAGOS_URL}/${id}`;
    try {
      await axios.delete(pagosPath);
      toast.success("Pago eliminada correctamente");
      dispatch(getPagos());
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el pago, intentar de nuevo");
    }
  };
};
