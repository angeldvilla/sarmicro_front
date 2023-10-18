import axios from "axios";
import { ENDPOINT, DETAIL_POLICYS_URL } from "./path";
import { GET_DETAIL_POLICYS } from "./actionTypes";
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
