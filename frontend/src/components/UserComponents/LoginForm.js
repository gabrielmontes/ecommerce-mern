

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import { resetPassword } from '../../actions/userActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CustomTextField from '../CustomTextField';
import PasswordTextField from '../PasswordTextField';
import Progress from '../Progress';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [openForgot, setOpenForgot] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const userForgotPassword = useSelector((state) => state.userPasswordReset);

  const handleOpenForgot = () => {
    setOpenForgot(!openForgot);
  }

  const handleUserLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, pass));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  return (
    <Container maxWidth="xs">
      {(userLogin.loading || userForgotPassword.loading) && <Progress />}
      {(openForgot) ? (
        <Stack spacing={2}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Reinicie su contraseña
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recibirá un enlace para crear una nueva contraseña por correo electrónico.
          </Typography>
          <CustomTextField setValue={setEmail} label="Correo electrónico" type="email" error="Digite el correo electrónico"/>
          <Button onClick={handleForgotPassword} fullWidth variant="contained">
            Enviar enlace para restablecer la contraseña
          </Button>
          <Link component="button" variant="body2" onClick={handleOpenForgot}>
            Volver al inicio de sesión
          </Link>
        </Stack>
      ) : (
        <Box component="form" onSubmit={handleUserLogin}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom textAlign="center">
            Mern ecommerce
            </Typography>
            <CustomTextField setValue={setEmail} label="Correo electrónico" type="email" error="Digite el correo electrónico"/>
            <PasswordTextField pass={setPass} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Ingresar
            </Button>
            <Link component="button" variant="body2" onClick={handleOpenForgot}>
              ¿Has olvidado la contraseña?
            </Link>
          </Stack>
        </Box>
      )}
    </Container>
  );
}

export default LoginForm;