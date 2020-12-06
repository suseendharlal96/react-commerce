import { commerce } from "../../lib/commerce";
import * as actionType from "./actionTypes";


export const getCart = () => async (dispatch) => {
  dispatch({
    type: actionType.cart.GET_CART,
  });
  try {
    const res = await commerce.cart.retrieve();
    dispatch({
      type: actionType.cart.CART_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    const { cart } = await commerce.cart.add(productId, quantity);
    dispatch({
      type: actionType.cart.CART_SUCCESS,
      payload: cart,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = (productId, quantity) => async (dispatch) => {
  try {
    const { cart } = await commerce.cart.update(productId, { quantity });
    dispatch({
      type: actionType.cart.CART_SUCCESS,
      payload: cart,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeItemFromCart = (productId) => async (dispatch) => {
  try {
    const { cart } = await commerce.cart.remove(productId);
    dispatch({
      type: actionType.cart.CART_SUCCESS,
      payload: cart,
    });
  } catch (err) {
    console.log(err);
  }
};

export const emptyCart = () => async (dispatch) => {
  try {
    const { cart } = await commerce.cart.empty();
    dispatch({
      type: actionType.cart.CART_SUCCESS,
      payload: cart,
    });
  } catch (err) {
    console.log(err);
  }
};
