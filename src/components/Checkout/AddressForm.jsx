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
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";

import CustomInput from "./CustomInputField";
import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkoutToken, nextStep }) => {
  console.log(checkoutToken);
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
    console.log("countries", countries);
    setShippingCountries(countries);
    console.log(Object.keys(countries)[0]);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    console.log(subdivisions);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
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
    setShippingOption(options[0].id);
  };

  return (
    <>
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
            <CustomInput required name="firstName" label="First Name" />
            <CustomInput required name="lastName" label="Last name" />
            <CustomInput required name="address1" label="Address line 1" />
            <CustomInput required name="email" label="Email" />
            <CustomInput required name="city" label="City" />
            <CustomInput required name="zip" label="Zip / Postal code" />
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
              Proceed to payment
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
