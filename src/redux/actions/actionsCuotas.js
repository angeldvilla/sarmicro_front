import axios from "axios";
import { ENDPOINT, CUOTAS_URL } from "./path.js";
import { GET_CUOTAS, UPDATE_CUOTA } from "./actionTypes.js";
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

// Acción para crear cuotas
export const createCuota = (cuotaData) => {
  return async (dispatch) => {
    const cuotasPath = `${ENDPOINT}${CUOTAS_URL}`;
    try {
      const { data } = await axios.post(cuotasPath, cuotaData);
      toast.success("Cuota creada con exito");
      if (data) {
        return dispatch({
          type: GET_CUOTAS,
          payload: data,
        });
      }
      dispatch(getCuotas());
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la cuota, intentar de nuevo");
    }
  };
};

// Acción para editar cuotas
export const updateCuota = (cuotaData, id) => {
  return async (dispatch) => {
    const cuotasPath = `${ENDPOINT}${CUOTAS_URL}/${id}`;
    try {
      const { data } = await axios.get(cuotasPath, cuotaData);
      toast.success("Cuota se edito correctamente");
      if (data) {
        return dispatch({
          type: UPDATE_CUOTA,
          payload: data,
        });
      }
      dispatch(getCuotas());
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
