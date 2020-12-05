import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/Checkout/CheckoutForm";
import { commerce } from "./lib/commerce";
import * as actions from "./store/actions";

const App = (props) => {
  const [cart, setCart] = useState({});
  useEffect(() => {
    props.getCart();
  }, []);

  // const getCart = async () => {
  //   const res = await commerce.cart.retrieve();
  //   console.log(res);
  //   setCart(res);
  // };
  // const addItemToCart = async (productId, quantity) => {
  //   const { cart } = await commerce.cart.add(productId, quantity);
  //   setCart(cart);
  // };
  // const updateCart = async (productId, quantity) => {
  //   const { cart } = await commerce.cart.update(productId, { quantity });
  //   setCart(cart);
  // };
  // const removeItemFromCart = async (productId) => {
  //   const { cart } = await commerce.cart.remove(productId);
  //   setCart(cart);
  // };
  // const emptyCart = async () => {
  //   const { cart } = await commerce.cart.empty();
  //   setCart(cart);
  // };
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
          render={(props) => <CheckoutForm {...props} cart={cart.id} />}
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
