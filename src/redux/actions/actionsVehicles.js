import axios from "axios";
import { ENDPOINT, VEHICULOS_URL, REGISTER_ALL_POLIZAS } from "./path.js";
import {
  GET_VEHICULOS,
  CREATE_VEHICULO,
  UPDATE_VEHICULO,
} from "./actionTypes.js";
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


//Accion para registrar todas las polizas del parque automotor
export const registerAllPolizas = () => {
  return async () => {
    const vechiculosPath = `${ENDPOINT}${REGISTER_ALL_POLIZAS}`;
    try {
      await axios.post(vechiculosPath);
      toast.success("Polizas Registradas");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar las polizas, intentar de nuevo");
    }
  };
};

//Accion para crear un vehiculo
export const createVehicle = (vehicleData) => {
  return async (dispatch) => {
    const vechiculosPath = `${ENDPOINT}${VEHICULOS_URL}`;
    try {
      const { data } = await axios.post(vechiculosPath, vehicleData);
      toast.success("Vehiculo creado con éxito");
      if (data) {
        return dispatch({
          type: CREATE_VEHICULO,
          payload: data,
        });
      }
      dispatch(getVehiculos());
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear los datos del vehiculo, intentar de nuevo");
    }
  };
};

//Acción para actualizar un vehiculo
export const updateVehicle = (vehicleData, id) => {
  return async (dispatch) => {
    const vechiculosPath = `${ENDPOINT}${VEHICULOS_URL}/${id}`;
    try {
      const { data } = await axios.put(vechiculosPath, vehicleData);
      toast.success("Vehiculo actualizado correctamente");
      if (data) {
        return dispatch({
          type: UPDATE_VEHICULO,
          payload: data,
        });
      }
      dispatch(getVehiculos());
    } catch (error) {
      console.error(error);
      toast.error(
        "No se pudo actualizar los datos del vehiculo, intentar de nuevo"
      );
    }
  };
};

//Acción para eliminar un vehiculo
export const deleteVehicle = (id) => {
  return async (dispatch) => {
    const vechiculosPath = `${ENDPOINT}${VEHICULOS_URL}/${id}`;
    try {
      await axios.delete(vechiculosPath);
      toast.success("Vehiculo eliminado correctamente");
      dispatch(getVehiculos());
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de vehiculos");
    }
  };
};
