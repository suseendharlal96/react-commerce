import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";

import Summary from "./Summary";
import * as actions from "../../store/actions";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentForm = ({
  checkoutToken,
  backStep,
  shippingDetails,
  nextStep,
  handleCaptureCheckout,
}) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      console.log(error);
    } else {
      const orderData = {
        items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingDetails.firstName,
          lastname: shippingDetails.lastName,
          email: shippingDetails.email,
        },
        shipping: {
          name: "International",
          street: shippingDetails.address1,
          town_city: shippingDetails.city,
          county_state: shippingDetails.shippingSubdivision,
          postal_zip_code: shippingDetails.zip,
          country: shippingDetails.shippingCountry,
        },
        fulfillment: { shipping_method: shippingDetails.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };
  return (
    <>
      <Summary checkoutToken={checkoutToken} />
      <Divider />
      <Typography>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

const mapStateToDispatch = (dispatch) => ({
  handleCaptureCheckout: (id, data) =>
    dispatch(actions.handleCaptureCheckout(id, data)),
});

export default connect(null, mapStateToDispatch)(PaymentForm);
