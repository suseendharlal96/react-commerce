import * as actionTypes from "../actions/actionTypes";

const initState = {
  cart: null,
  loading: false,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.cart.GET_CART:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.cart.CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
