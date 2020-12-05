import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App.jsx";
import productReducer from "./store/reducers/productReducer";
import cartReducer from "./store/reducers/cartReducer";

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
