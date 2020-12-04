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

import useStyles from "./checkoutformstyles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ConfirmationForm from "./ConfirmationForm";
import { commerce } from "../../lib/commerce";

const CheckoutForm = ({ cart }) => {
  console.log(cart);
  const classes = useStyles();
  const options = ["Shipping address", "Payment Details"];
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setToken] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({});
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart, {
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
    setShippingDetails(shippingData);
    setActiveStep((prevState) => prevState + 1);
  };
  const Form = () =>
    activeStep === 0
      ? checkoutToken && (
          <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} />
        )
      : shippingDetails && <PaymentForm shippingDetails={shippingDetails} />;
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

export default CheckoutForm;
