import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { register } from '../../actions/userActions'
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PasswordTextField from '../PasswordTextField';
import CustomTextField from '../CustomTextField';

const NewUserForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState('');

  const submitHandler = () => {
    dispatch(register(name, lastname, email, pass));
  }

  useImperativeHandle(ref, () => ({
    submitHandler,
  }));

  return (
    <Box component="form">
      <Typography variant="h6">
        Detalles de la cuenta:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomTextField setValue={setName} label="Nombre" type="text" error="Digite el nombre"/>
            </Grid>
            <Grid item xs={6}>
              <CustomTextField setValue={setLastname} label="Apellidos" type="text" error="Digite los apellidos"/>
            </Grid>
            <Grid item xs={6}>
              <CustomTextField setValue={setEmail} label="Correo" type="email" error="Digite el correo electrónico"/>
            </Grid>
            <Grid item xs={6}>
              <PasswordTextField pass={setPass} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});

export default NewUserForm;