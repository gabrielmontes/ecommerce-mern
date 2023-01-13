import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ProductListToolBar = (props) => {
  const navigate = useNavigate();

  const handleNewProduct = () => {
    navigate('/admin/product');
  };

  return(
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
        Productos:
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button color="primary" variant="contained" onClick={handleNewProduct}>
          Agregar producto
        </Button>
      </Box>
    </Box>
  </Box>
  );
};

export default ProductListToolBar;