import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomerListToolBar = (props) => {
  const navigate = useNavigate();

  const handleNewUser = () =>{
    navigate('/admin/user');
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Usuarios
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleNewUser}>
            Crear usuario
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerListToolBar;