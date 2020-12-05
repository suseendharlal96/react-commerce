import * as actionType from "../actions/actionTypes";

const initState = {
  order: null,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.order.ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
