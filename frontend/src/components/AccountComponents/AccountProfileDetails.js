import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../actions/userActions';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import CustomTextField from '../CustomTextField';
import PasswordTextField from '../PasswordTextField';

export const AccountProfileDetails = (props) => {
  const dispatch = useDispatch();

  const [pass, setPass] = useState();
  const [name, setName] = useState(props.user.name);
  const [lastname, setLastname] = useState(props.user.lastname);
  const [email, setEmail] = useState(props.user.email);

  const handleUserProfileEdit = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile({
      name: name,
      lastname: lastname,
      email: email,
      password: pass
    }));
  };

  return (
    <Box component="form" onSubmit={handleUserProfileEdit}>
      <Card>
        <CardHeader subheader="La información puede ser editada." title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <CustomTextField setValue={setName} label="Nombre" type="text" value={name} error="Digite el nombre"/>
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField setValue={setLastname} label="Apellidos" type="text" value={lastname} error="Digite los apellidos"/>
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField setValue={setEmail} label="Correo electrónico" type="text" value={email} error="Digite el correo electrónico"/>
            </Grid>
            <Grid item md={6} xs={12}>
              <PasswordTextField pass={setPass} />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button color="primary" variant="contained" type="submit">
            Guardar
          </Button>
        </Box>
      </Card>
    </Box>
  );
};