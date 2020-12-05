import * as actionType from "./actionTypes";
import { commerce } from "../../lib/commerce";

export const handleCaptureCheckout = (checkoutTokenId, newOrder) => async (
  dispatch
) => {
  try {
    const incomingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );
    dispatch({
      type: actionType.order.ORDER_SUCCESS,
      payload: incomingOrder,
    });
    const newCart = await commerce.cart.refresh();
    dispatch({
      type: actionType.cart.CART_SUCCESS,
      payload: newCart,
    });
  } catch (error) {
    console.log(error.data.error.message);
  }
};
