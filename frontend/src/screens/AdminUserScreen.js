import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newUser, updateUser, getUserDetails } from '../actions/userActions.js';
import { USER_UPDATE_RESET } from '../constants/userConstants'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Container,
  Typography,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import Progress from '../components/Progress.js';
import CustomTextField from '../components/CustomTextField';
import PasswordTextField from '../components/PasswordTextField';

const AdminUserScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, success: successUpdate } = userUpdate;

  const userCreate = useSelector((state) => state.Create);
  const { loading: loadingCreate, success: successCreate } = userCreate || "";

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setisAdmin] = useState(false);
  const [pass, setPass] = useState('');

  const handleIsAdmin = () => {
    setisAdmin(!isAdmin);
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/users');
    };

    if (successCreate) {
      navigate('/admin/users');
    };

    if (user._id !== id) {
      dispatch(getUserDetails(id));
    };

    setName(user.name || '');
    setLastname(user.lastname || '');
    setEmail(user.email || '');
    setisAdmin(user.isAdmin || false);
  }, [dispatch, navigate, id, user, successUpdate, successCreate]);

  const handleUser = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(updateUser({ _id: id, name, lastname, email, isAdmin, pass }));
    } else {
      dispatch(newUser(name, lastname, email, pass, isAdmin));
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      {(loading || loadingUpdate || loadingCreate) && <Progress />}
      <Container maxWidth="xl">
        <Typography sx={{ mb: 3 }} variant="h4">
          {id ? "Editar" : "Crear"} usuario
        </Typography>
        <Box component="form" sx={{ flexGrow: 1 }} onSubmit={handleUser}>
          <Card>
            <CardHeader subheader="Llenar los campos con *" title={(id) ? "Editar usuario" : "Nuevo usuario"} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <CustomTextField setValue={setName} label="Nombre" type="text" value={name} error="Digite el nombre" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomTextField setValue={setLastname} label="Apellidos" type="text" value={lastname} error="Digite los apellidos"/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomTextField setValue={setEmail} label="Correo electrónico" type="text" value={email} error="Digite el correo electrónico" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <PasswordTextField pass={setPass} />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControlLabel label="Administrador" onClick={handleIsAdmin}
                    control={(
                      <Checkbox color="secondary" />
                    )}
                    checked={isAdmin}
                    componentsProps={{
                      typography: {
                        variant: "primary"
                      }
                    }}
                  />
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
      </Container>
    </Box>
  )
};

export default AdminUserScreen;