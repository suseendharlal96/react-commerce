import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";

import useStyles from "./checkoutformstyles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ConfirmationForm from "./ConfirmationForm";
import { commerce } from "../../lib/commerce";
import * as actions from "../../store/actions";

const CheckoutForm = (props) => {
  console.log(props.cart);
  const classes = useStyles();
  const options = ["Shipping address", "Payment Details"];
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setToken] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({});
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(props.cart.id, {
          type: "cart",
        });
        console.log("token", token);
        setToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, []);
  const nextStep = (shippingData) => {
    console.log(shippingData);
    setShippingDetails(shippingData);
    setActiveStep((prevState) => prevState + 1);
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
          backStep={() => setActiveStep((prevState) => prevState - 1)}
        />
      )
    );
  return (
    <>
      <div className={classes.toolbar}>
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography className={classes.stepper}>Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {options.map((option) => (
                <Step key={option}>
                  <StepLabel>{option}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === options.length ? <ConfirmationForm /> : <Form />}
          </Paper>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(actions.getCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
