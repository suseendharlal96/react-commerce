import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/Checkout/CheckoutForm";
import * as actions from "./store/actions";

const App = (props) => {
  useEffect(() => {
    props.getCart();
  }, []);
  return (
    <BrowserRouter>
      <Navbar cartItems={props.cart && props.cart.total_items} />
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>
        <Route path="/cart">
          <Cart cartItems={props.cart} />
        </Route>
        <Route
          path="/checkout"
          render={(props) => <CheckoutForm {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  loading: state.cartReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(actions.getCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
