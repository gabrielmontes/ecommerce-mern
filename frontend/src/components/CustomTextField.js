import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

const CustomTextField = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  function validateValue(value){
    return (value?.length === 0);
  }

  const handleChange = (event) => {
    props.setValue(event.target.value);
  };

  useEffect(() => {
    if (validateValue(props.value)) {
      setErrorMessage(props.error);
    };

    if (validateValue(props.value) && errorMessage) {
      setErrorMessage("");
    };
  }, [props.error, errorMessage]);

  return (
    <TextField
      helperText={(validateValue(props.value)) && props.error}
      required
      fullWidth
      type={props.type}
      value={props.value}
      onChange={handleChange}
      label={props.label}
      variant="outlined"
      select={(props.select) ? true : false}
      inputProps={
        { readOnly: props.readonly, }
      }
    >
      {props.children}
    </TextField>
  );
}

export default CustomTextField;