import axios from "axios";
import { toast } from "sonner";
import {
  ENDPOINT,
  TIPO_EMPRESA_URL,
  TIPO_POLIZA_URL,
  VALOR_POLIZA_URL,
  NEW_COMPANY,
} from "./path.js";
import {
  CREATE_VALOR_POLIZA,
  EDIT_COMPANY,
  GET_NAME_COMPANY,
  GET_TIPO_EMPRESA,
  GET_TIPO_POLIZAS,
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

//Acción para traer los tipos de polizas
export const getTipoPolizas = () => {
  return async (dispatch) => {
    const valoresPolizasPath = `${ENDPOINT}${TIPO_POLIZA_URL}`;
    try {
      const { data } = await axios.get(valoresPolizasPath);
      return dispatch({
        type: GET_TIPO_POLIZAS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener valores de polizas");
    }
  };
};

//Accion para traer el tipo de empresa
export const getTipoEmpresas = () => {
  return async (dispatch) => {
    const valoresPolizasPath = `${ENDPOINT}${TIPO_EMPRESA_URL}`;
    try {
      const { data } = await axios.get(valoresPolizasPath);
      return dispatch({
        type: GET_TIPO_EMPRESA,
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
      toast.success("Valor de poliza actualizado correctamente");
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
      toast.success("Valor de poliza eliminado correctamente");
      dispatch(getValoresPolizas());
    } catch (error) {
      console.log(error);
      toast.error("Error al editar valor de poliza");
    }
  };
};

//Accion para traer valores de compañias de poliza
export const getCompany = () => {
  return async (dispatch) => {
    const companyPath = `${ENDPOINT}${NEW_COMPANY}`;
    try {
      const { data } = await axios.get(companyPath);
      return dispatch({
        type: GET_NAME_COMPANY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener datos de compañias de poliza");
    }
  };
};


//Acción para editar compañia de poliza
export const updateCompany = (companyData, id) => {
  return async (dispatch) => {
    const companyPath = `${ENDPOINT}${NEW_COMPANY}/${id}`;
    try {
      const { data } = await axios.put(companyPath, companyData);
      toast.success("compañia de poliza actualizada correctamente");
      dispatch(getValoresPolizas());
      dispatch(getCompany());
      return dispatch({
        type: EDIT_COMPANY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al editar la compañia de poliza");
    }
  };
};
