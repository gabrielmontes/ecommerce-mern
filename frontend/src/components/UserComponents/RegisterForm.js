
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import PasswordTextField from '../PasswordTextField';
import CustomTextField from '../CustomTextField';

const RegisterForm = (props) => {
  const dispatch = useDispatch();

  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState('');

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo } = userRegister;

  const handleUserRegister = () => {
    dispatch(register(name, lastname, email, pass));

    if(userInfo){
      props.value('1');
    }
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={1} component="form" onSubmit={handleUserRegister} >
        <Typography variant="h6" textAlign="center">
          Crear una cuenta
        </Typography>
        <CustomTextField setValue={setName} label="Nombre" type="text" error="Digite el nombre"/>
        <CustomTextField setValue={setLastname} label="Apellidos" type="text" error="Digite los apellidos"/>
        <CustomTextField setValue={setEmail} label="Correo electrónico" type="email" error="Digite el correo electrónico"/>
        <PasswordTextField pass={setPass} />
        <Button fullWidth type="submit" variant="contained">
          Registrarse
        </Button>
      </Stack>
    </Container>
  );
}

export default RegisterForm;