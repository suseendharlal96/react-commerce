import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Button,
  ListItemText,
} from "@material-ui/core";
import { connect } from "react-redux";

import useStyles from "./checkoutformstyles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ConfirmationForm from "./ConfirmationForm";
import { commerce } from "../../lib/commerce";
import * as actions from "../../store/actions";

const CheckoutForm = (props) => {
  const classes = useStyles();
  const options = ["Shipping address", "Payment Details"];
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setToken] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({});
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(props.cart.id, {
          type: "cart",
        });
        setToken(token);
      } catch (error) {}
    };
    generateToken();
  }, []);
  const nextStep = (shippingData) => {
    setShippingDetails(shippingData);
    setActiveStep((prevState) => prevState + 1);
  };
  const purchase = () => {
    props.clearOrders();
    setShippingDetails({});
    setTimeout(() => {
      setIsPurchased(true);
    }, 3000);
  };
  const Form = () =>
    activeStep === 0 ? (
      checkoutToken ? (
        <AddressForm
          checkoutToken={checkoutToken}
          shippingDetails={shippingDetails}
          nextStep={nextStep}
        />
      ) : (
        <CircularProgress />
      )
    ) : (
      shippingDetails && (
        <PaymentForm
          checkoutToken={checkoutToken}
          shippingDetails={shippingDetails}
          purchase={purchase}
          backStep={() => setActiveStep((prevState) => prevState - 1)}
          nextStep={() => setActiveStep((prevState) => prevState + 1)}
        />
      )
    );
  return (
    <>
      <div className={classes.toolbar}>
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography align="center" className={classes.stepper}>
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {options.map((option) => (
                <Step key={option}>
                  <StepLabel>{option}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === options.length ? (
              isPurchased ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Order Received
                  </Typography>
                  <List disablePadding>
                    {props.order &&
                      props.order.items.map((product) => (
                        <ListItem
                          style={{ padding: "10px 0" }}
                          key={product.name}
                        >
                          <ListItemText
                            primary={product.name}
                            secondary={`Quantity: ${product.quantity}`}
                          />
                          <Typography variant="body2">
                            {product.line_total.formatted_with_symbol}
                          </Typography>
                        </ListItem>
                      ))}
                    <ListItem style={{ padding: "10px 0" }}>
                      <ListItemText primary="Name" />
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: 700 }}
                      >
                        {props.order.customer.firstname +
                          " " +
                          props.order.customer.lastname}
                      </Typography>
                    </ListItem>
                    <ListItem style={{ padding: "10px 0" }}>
                      <ListItemText primary="Email" />
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: 700 }}
                      >
                        {props.order.customer.email}
                      </Typography>
                    </ListItem>
                  </List>
                  <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    color="primary"
                  >
                    New Purchase?
                  </Button>
                </>
              ) : (
                <CircularProgress />
              )
            ) : (
              <Form />
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  order: state.orderReducer.order,
});

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(actions.getCart()),
  clearOrders: () => dispatch(actions.clearOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
