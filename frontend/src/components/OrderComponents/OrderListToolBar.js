import {
  Box,
  Typography
} from '@mui/material';

const OrderListToolBar = (props) => {
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
          Ordenes
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderListToolBar;