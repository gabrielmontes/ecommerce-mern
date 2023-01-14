import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { listTopProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, getUrlValidation } from '../actions/userActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PasswordTextField from '../components/PasswordTextField';
import TopProducts from '../components/ProductComponents/TopProducts';
import MainBox from '../components/MainBox';
import {
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  Container
} from '@mui/material/';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const { id, token } = useParams();

  const handleStore = () => {
    navigate('/products');
  };

  const [isForgotPage, setisForgotPage] = useState(true);
  const [pass, setPass] = useState("");

  const userUpdate = useSelector((state) => state.userUpdatePassword);
  const { status: success } = userUpdate;

  const urlValidation = useSelector((state) => state.userUrlValidation);
  const { error } = urlValidation;


  const handleForgotPassword = () => {
    dispatch(updatePassword(id, token, pass));

    if (success) {
      setisForgotPage(false);
    }
  };

  const handleClose = () => {
    setisForgotPage(false);
  }

  useEffect(() => {
    dispatch(listTopProducts());

    if (location.pathname === "/") {
      setisForgotPage(false);
    };

    if (id && token) {
      const handleValidURL = () => {
        dispatch(getUrlValidation(id, token));
      };

      handleValidURL();
      if (error) navigate('/error');
    }
  }, [dispatch, navigate, error, id, token, location.pathname]);

  return (
    <>
      {isForgotPage &&
        <Dialog open={true} maxWidth='xs' fullWidth>
          <Container maxWidth="xs">
            <Stack spacing={2} mb={2}>
              <IconButton onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" textAlign="center">
                Nueva contraseña
              </Typography>
              <Typography variant="body2">
                La contraseña debe tener al menos 8 caracteres con al menos un carácter numérico
                y una letra mayúscula.
              </Typography>
              <PasswordTextField pass={setPass} />
              <Button onClick={handleForgotPassword} fullWidth variant="contained" color="primary">
                Reestablecer
              </Button>
            </Stack>
          </Container>
          <Outlet />
        </Dialog>
      }
      <MainBox maxw="md" height="60vh">
        <Stack alignItems="center" spacing={2}>
          <TopProducts />
        </Stack>
      </MainBox>
      <Stack backgroundColor="text.primary" height={200} mb={5} spacing={2} mt={5}
        direction="column" alignItems="center" justifyContent="center">
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" color="#FFF" align="center">
              Mern ecommerce
            </Typography>
            <Typography variant="body2" color="#FFF" align="center">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default HomeScreen;