import * as actionType from "./actionTypes";
import { commerce } from "../../lib/commerce";

export const handleCaptureCheckout = (newOrder) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.order.ORDER_SUCCESS,
      payload: newOrder,
    });
    const { cart } = await commerce.cart.empty();
    dispatch({
      type: actionType.cart.CART_SUCCESS,
      payload: cart,
    });
  } catch (error) {
    console.log(error.data.error.message);
  }
};

export const clearOrders = () => (dispatch) => {
  dispatch({
    type: actionType.order.CLEAR_ORDERS,
  });
};
