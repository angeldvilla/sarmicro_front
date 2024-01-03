import axios from "axios";
import {
  ENDPOINT,
  VEHICULOS_URL,
  REGISTER_ALL_POLIZAS,
  REGISTER_OFF_VEHICULOS,
  VEHICULOS_OFF_URL,
  DELETE_VEHICLE_DESVINCULATE_URL,
  PARQUE_AUTOMOTOR_URL,
  EXPORT_EXCEL_VINCULADO_URL,
  EXPORT_EXCEL_DESVINCULADO_URL,
  PROPIETARY_URL,
  BRANDS_URL
} from "./path.js";
import {
  GET_VEHICULOS,
  CREATE_VEHICULO,
  UPDATE_VEHICULO,
  GET_OFF_VEHICULOS,
  GET_EXPORT_EXCEL_VINCULADOS,
  GET_EXPORT_EXCEL_DESVINCULADOS,
  GET_PROPIETARY,
  GET_BRANDS,
  LOADING,
} from "./actionTypes.js";
import { toast } from "sonner";

export const viewLoader = (isLoading) => {
  return {
    type: LOADING,
    payload: isLoading,
  };
};

// Acción para obtener datos de vehiculos
export const getVehiculos = () => {
  return async (dispatch) => {
    const vechiculosPath = `${ENDPOINT}${PARQUE_AUTOMOTOR_URL}`;
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

// Acción para obtener datos de vehiculos desvinculados
export const getOffVehiculos = () => {
  return async (dispatch) => {
    const vechiculosPath = `${ENDPOINT}${VEHICULOS_OFF_URL}`;
    try {
      const { data } = await axios.get(vechiculosPath);
      return dispatch({
        type: GET_OFF_VEHICULOS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de vehiculos");
    }
  };
};

// Acción para obtener datos de propietarios de vehiculos
export const getPropietarys = () => {
  return async (dispatch) => {
    const propietaryPath = `${ENDPOINT}${PROPIETARY_URL}`;
    try {
      const { data } = await axios.get(propietaryPath);
      return dispatch({
        type: GET_PROPIETARY,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de propietarios");
    }
  };
};

// Acción para obtener datos de marcas de los vehiculos
export const getAllBrands = () => {
  return async (dispatch) => {
    const brandsPath = `${ENDPOINT}${BRANDS_URL}`;
    try {
      const { data } = await axios.get(brandsPath);
      return dispatch({
        type: GET_BRANDS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de marcas");
    }
  };
};

// Acción para obtener datos de vehiculos
export const registerDesvinculate = (idMovil) => {
  return async () => {
    const vechiculosPath = `${ENDPOINT}${REGISTER_OFF_VEHICULOS}/${idMovil}`;
    try {
      await axios.get(vechiculosPath);
      toast.success("Vehiculo registrado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo registrar el vehiculo, intentar de nuevo");
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
      dispatch(viewLoader(true));

      const { data } = await axios.post(vechiculosPath, vehicleData);
      toast.success("Vehiculo creado con éxito");
      dispatch(getVehiculos());
      return dispatch({
        type: CREATE_VEHICULO,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear los datos del vehiculo, intentar de nuevo");
    }
  };
};

// Acción para actualizar un vehiculo
export const updateVehicle = (vehicleData, id) => {
  return async (dispatch) => {
    const vechiculosPath = `${ENDPOINT}${VEHICULOS_URL}/${id}`;
    try {
      const { data } = await axios.put(vechiculosPath, vehicleData);
      toast.success("Vehiculo actualizado correctamente");
      dispatch(getVehiculos());
      dispatch(getOffVehiculos());
      return dispatch({
        type: UPDATE_VEHICULO,
        payload: data,
      });
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
      dispatch(getOffVehiculos());
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de vehiculos");
    }
  };
};


//Acción para eliminar un vehiculo y todas sus polizas
export const deleteVehicleAll = (vehicleData) => {
  return async (dispatch) => {
    const vehiculosPath = `${ENDPOINT}${DELETE_VEHICLE_DESVINCULATE_URL}`;
    try {
      /* const { data } = */
      await axios.post(vehiculosPath, vehicleData);
      toast.success("Vehiculo eliminado correctamente");
      dispatch(getVehiculos());
      dispatch(getOffVehiculos());
      /* return dispatch({
        type: DELETE_VEHICLE_ALL,
        payload: data,
      }) */
    } catch (error) {
      console.log(error);
      toast.error("No se pudo borrar el vehiculo, intentar de nuevo");
    }
  };
};

//Accion para traer informacion completa y exportar vehiculos vinculados en Excel
export const getExportVinculadosExcel = () => {
  return async (dispatch) => {
    const vehiculosPath = `${EXPORT_EXCEL_VINCULADO_URL}`;
    try {
      const { data } = await axios.get(vehiculosPath);
      return dispatch({
        type: GET_EXPORT_EXCEL_VINCULADOS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de vehiculos para exportar");
    }
  };
};

//Accion para traer informacion completa y exportar vehiculos desvinculados en Excel
export const getExportDesvinculadosExcel = () => {
  return async (dispatch) => {
    const vehiculosPath = `${EXPORT_EXCEL_DESVINCULADO_URL}`;
    try {
      const { data } = await axios.get(vehiculosPath);
      return dispatch({
        type: GET_EXPORT_EXCEL_DESVINCULADOS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      toast.error("No hay datos de vehiculos para exportar");
    }
  };
};