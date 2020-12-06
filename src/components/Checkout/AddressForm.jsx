import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Input,
  CssBaseline,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";

import CustomInput from "./CustomInputField";
import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkoutToken, nextStep, shippingDetails }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  useEffect(() => {
    fetchShippingCountries(checkoutToken && checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingCountry && shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    if (shippingDetails && shippingDetails.shippingCountry) {
      setShippingCountry(shippingDetails.shippingCountry);
    } else {
      setShippingCountry(Object.keys(countries)[0]);
    }
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    if (shippingDetails && shippingDetails.shippingSubdivision) {
      setShippingSubdivision(shippingDetails.shippingSubdivision);
    } else {
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    }
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );
    setShippingOptions(options);
    if (shippingDetails && shippingDetails.shippingOption) {
      setShippingOption(shippingDetails.shippingOption);
    } else {
      setShippingOption(options[0].id);
    }
  };

  return (
    <>
      <CssBaseline />
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            nextStep({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <CustomInput
              value={shippingDetails ? shippingDetails.firstName : ""}
              name="firstName"
              label="First Name"
            />
            <CustomInput
              value={shippingDetails ? shippingDetails.lastName : ""}
              name="lastName"
              label="Last name"
            />
            <CustomInput
              value={shippingDetails ? shippingDetails.address1 : ""}
              name="address1"
              label="Address line 1"
            />
            <CustomInput
              value={shippingDetails ? shippingDetails.email : ""}
              name="email"
              label="Email"
            />
            <CustomInput
              value={shippingDetails ? shippingDetails.city : ""}
              name="city"
              label="City"
            />
            <CustomInput
              value={shippingDetails ? shippingDetails.zip : ""}
              name="zip"
              label="Zip / Postal code"
            />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({ id: code, value: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.value}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            {shippingSubdivisions && (
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Subdivision</InputLabel>
                <Select
                  value={shippingSubdivision}
                  fullWidth
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                >
                  {Object.entries(shippingSubdivisions)
                    .map(([code, name]) => ({ id: code, value: name }))
                    .map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.value}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            )}
            {shippingOptions && (
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Options</InputLabel>
                <Select
                  value={shippingOption}
                  fullWidth
                  onChange={(e) => setShippingOption(e.target.value)}
                >
                  {shippingOptions
                    .map((sO) => ({
                      id: sO.id,
                      label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                    }))
                    .map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            )}
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Confirm
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
