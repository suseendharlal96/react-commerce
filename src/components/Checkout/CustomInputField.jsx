import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const CustomInputField = ({ name, label, required }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        as={TextField}
        fullWidth
        name={name}
        label={label}
        required={required}
      />
    </Grid>
  );
};

export default CustomInputField;
