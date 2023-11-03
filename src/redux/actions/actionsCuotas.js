import axios from "axios";
import { ENDPOINT, CUOTAS_URL, PAGOS_URL } from "./path.js";
import { CREATE_CUOTA, GET_CUOTAS, UPDATE_CUOTA } from "./actionTypes.js";
import { toast } from "sonner";

// Acción para obtener datos de cuotas
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

// Acción para crear cuotas
export const createCuota = (cuotaData) => {
  return async (dispatch) => {
    const cuotasPath = `${ENDPOINT}${PAGOS_URL}`;
    try {
      const { data } = await axios.post(cuotasPath, cuotaData);
      toast.success("Pago de cuota registrado con exito");
      dispatch(getCuotas());
      return dispatch({
        type: CREATE_CUOTA,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar el pago de la cuota, intentar de nuevo");
    }
  };
};

// Acción para editar cuotas
export const updateCuota = (cuotaData, id) => {
  return async (dispatch) => {
    const cuotasPath = `${ENDPOINT}${CUOTAS_URL}/${id}`;
    try {
      const { data } = await axios.put(cuotasPath, cuotaData);
      toast.success("Cuota actualizada correctamente");
      dispatch(getCuotas());
      return dispatch({
        type: UPDATE_CUOTA,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al editar la cuota, intentar de nuevo");
    }
  };
};

// Acción para eliminar cuotas
export const deleteCuota = (id) => {
  return async (dispatch) => {
    const cuotasPath = `${ENDPOINT}${CUOTAS_URL}/${id}`;
    try {
      await axios.delete(cuotasPath);
      toast.success("Cuota eliminada correctamente");
      dispatch(getCuotas());
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de cuotas");
    }
  };
};
