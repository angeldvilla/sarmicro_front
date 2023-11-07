import axios from "axios";
import { ENDPOINT, PAGOS_URL } from "./path.js";
import { GET_PAGOS } from "./actionTypes.js";
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
      await axios.post(pagosPath, pagoData);
      toast.success("Pago creado con exito");
      dispatch(getPagos());
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
      await axios.put(pagosPath, pagoData);
      toast.success("Pago actualizado correctamente");
      dispatch(getPagos());
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
      toast.success("Pago eliminadao correctamente");
      dispatch(getPagos());
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el pago, intentar de nuevo");
    }
  };
};
