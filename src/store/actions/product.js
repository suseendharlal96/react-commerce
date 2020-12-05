import { commerce } from "../../lib/commerce";
import * as actionType from "./actionTypes";


export const getProducts = () => async (dispatch) => {
  dispatch({
    type: actionType.products.GET_PRODUCTS,
  });
  try {
    const { data } = await commerce.products.list();
    console.log(data);
    dispatch({
      type: actionType.products.PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
