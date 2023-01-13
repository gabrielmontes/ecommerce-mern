import {
  Typography,
  Box,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Grid,
  GridItem
} from '@mui/material';

export default function ProductItems(props) {
  const { product } = props;

  const items = [
    { text: "6 unidades:", price: `${product.sixpackPrice}` },
    { text: "12 unidades:", price: `${product.twelvepackPrice}` },
    { text: "24 unidades:", price: `${product.boxPrice}` }
  ]

  return (
    <Box style={{ margin: 10 }} >
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={props.value}
          onChange={props.handleChange}
        >
          {items.map((item) => {
            return <FormControlLabel key={item.text}
              value={`${item.text},${item.price}`}
              control={<Radio />}
              label={
                <Grid container spacing={2} sx={{ width: 200 }}>
                  <Grid item xs={6}>
                  <Typography fontWeight={500} variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    ₡{item.price}
                  </Typography>
                  </Grid>
                </Grid>
              }
            />
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}