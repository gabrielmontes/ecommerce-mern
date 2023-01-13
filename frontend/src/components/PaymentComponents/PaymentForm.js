import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { savePaymentMethod } from '../../actions/cartActions'
import { useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const PaymentForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const submitHandler = () => {
    dispatch(savePaymentMethod(value));
  }

  useImperativeHandle(ref, () => ({
    submitHandler,
  }));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box component="form">
      <Typography variant="h6">
        Detalles del pago:
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Contra entrega"
                control={<Radio />}
                label={
                  <React.Fragment>
                    <Typography variant="body1" color="text.primary">
                      Sinpe Movil:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      El pago debe de realizarse en efectivo o sinpe móvil al 8888-8888.
                    </Typography>
                  </React.Fragment>
                }
              />
              <FormControlLabel
                value="Transferencia bancaria"
                control={<Radio />}
                label={
                  <React.Fragment>
                    <Typography variant="body1" color="text.primary">
                      Transferencia Bancaria:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Contamos con cuentas en colones y cólares del BAC Credomatic.
                    </Typography>
                  </React.Fragment>
                }
              />
            </RadioGroup>
          </FormControl>
          <List dense>
            <ListItem disablePadding>
              <ListItemText secondary="Una vez realizado el pago, por favor envíe una captura de pantalla y su nombre completo
              al mismo número de celular." />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
});

export default PaymentForm;