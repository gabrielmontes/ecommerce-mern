import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainBox from '../components/MainBox';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleStore = () => {
    navigate('/');
  }

  return (
    <MainBox maxw="lg">
      <Stack spacing={4} alignItems="center">
        <Typography variant="h2">
          Oops!
        </Typography>
        <Typography variant="h5">
          Parece que no podemos encontrar la página que estás buscando.
        </Typography>
        <Button variant="contained" onClick={handleStore} sx={{ maxWidth: 200 }}>
          Volver al inicio
        </Button>
      </Stack>
    </MainBox>
  );
}

export default NotFoundPage;