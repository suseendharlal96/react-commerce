import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import CartItem from "./CartItem/CartItem";
import useStyles from "./cartstyles";

const Cart = ({ cartItems, updateCart, removeItemFromCart, emptyCart }) => {
  console.log("cart");
  const classes = useStyles();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link to="/" className={classes.link}>
        start adding some !
      </Link>
    </Typography>
  );

  if (!cartItems.line_items) return "Loading";

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cartItems.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              updateCart={updateCart}
              removeItemFromCart={removeItemFromCart}
              item={lineItem}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal: {cartItems.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={emptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cartItems.line_items.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};
export default Cart;
