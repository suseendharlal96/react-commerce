import * as actionType from "../actions/actionTypes";

const initState = {
  order: {},
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.order.ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };

    case actionType.order.CLEAR_ORDERS:
      return {
        ...state,
        order: null,
      };

    default:
      return state;
  }
};

export default orderReducer;
