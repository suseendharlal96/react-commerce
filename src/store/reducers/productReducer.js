import * as actionType from "../actions/actionTypes";
const initState = {
  products: null,
  loading: false,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.products.GET_PRODUCTS:
      return {
        ...state,
        loading: true,
      };

    case actionType.products.PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default productReducer;
