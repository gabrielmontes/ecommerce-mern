import {
  Typography,
  Box,
  Grid
} from '@mui/material';

export default function ProductItems(props) {
  const { product } = props;
  
  return (
    <Box style={{ margin: 10 }} >
      <Grid container spacing={2} sx={{ width: 200 }}>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            ₡{product.price}
          </Typography>
        </Grid>
      </Grid>
    </Box >
  );
}