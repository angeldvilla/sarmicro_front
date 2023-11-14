import axios from "axios";
import { ENDPOINT, DETAIL_POLICYS_URL, BALANCE_URL } from "./path";
import { GET_BALANCES, GET_DETAIL_POLICYS } from "./actionTypes";
import { toast } from "sonner";

export const getDetailsPolicys = () => {
  return async (dispatch) => {
    const pathDetails = `${ENDPOINT}${DETAIL_POLICYS_URL}`;
    try {
      const { data } = await axios.get(pathDetails);
      return dispatch({
        type: GET_DETAIL_POLICYS,
        payload: data,
      });
    } catch (error) {
      toast.error("Error al obtener los datos de polizas eliminadas");
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
