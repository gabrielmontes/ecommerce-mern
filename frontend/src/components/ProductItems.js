import {
  Typography,
  Box,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Grid
} from '@mui/material';

export default function ProductItems(props) {
  const { product } = props;

  return (
    <Box style={{ margin: 10 }} >
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={props.value}
          onChange={props.handleChange}>
          <FormControlLabel
            value={`${product.text},${product.price}`}
            control={<Radio />}
            label={
              <Grid container spacing={2} sx={{ width: 200 }}>
                <Grid item xs={6}>
                  <Typography fontWeight={500} variant="body2" color="text.secondary">
                    {product.text}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    ₡{product.price}
                  </Typography>
                </Grid>
              </Grid>
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}