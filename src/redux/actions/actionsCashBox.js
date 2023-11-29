import axios from "axios";
import { ENDPOINT, PAGOS_URL, BALANCE_URL } from "./path.js";
import { GET_PAGOS, GET_BALANCES, SAVE_PAGO } from "./actionTypes.js";
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

export const getBalances = () => {
  return async (dispatch) => {
    const pathBalance = `${ENDPOINT}${BALANCE_URL}`;
    try {
      const { data } = await axios.get(pathBalance);
      return dispatch({
        type: GET_BALANCES,
        payload: data,
      });
    } catch (error) {
      toast.error("Error al obtener los datos de saldos de polizas");
    }
  };
};

// Acción para crear pagos
export const createPago = (pagoData) => {
  return async (dispatch) => {
    const pagosPath = `${ENDPOINT}${PAGOS_URL}`;
    try {
      const { data } = await axios.post(pagosPath, pagoData);

      dispatch(savePago(data?.egreso));

      toast.success("Pago creado con exito");
      dispatch(getPagos());
      window.open("http://localhost:3000/recibo-de-egreso");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el pago, intentar de nuevo");
    }
  };
};

// Acción para guardar la respuesta del pago en el estado
export const savePago = (egreso) => {
  return {
    type: SAVE_PAGO,
    payload: egreso,
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
