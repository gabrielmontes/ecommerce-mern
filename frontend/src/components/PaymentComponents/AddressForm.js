import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Cities from '../../utils/Cities';

const AddressForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState('');
  const [city, setcity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [canton, setCanton] = useState('');
  const [district, setDistrict] = useState('');

  const submitHandler = () => {
    dispatch(saveShippingAddress({ address, city, postalCode, canton, district }))
  };

  useImperativeHandle(ref, () => ({
    submitHandler,
  }));

  useEffect(() => {
    setAddress(shippingAddress?.address || '');
    setcity(shippingAddress?.city || '');
    setPostalCode(shippingAddress?.postalCode || '');
    setCanton(shippingAddress?.canton || '');
    setDistrict(shippingAddress?.district || '');
  }, [shippingAddress]);

  return (
    <Box component="form">
      <Typography variant="h6" gutterBottom>
        Dirección de envío:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Dirección exacta"
            fullWidth
            value={address}
            variant="standard"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="city"
            select
            value={city}
            label="Provincia"
            onChange={(e) => {
              setcity(e.target.value);
              setCanton('');
              setDistrict('');
            }}
            variant="standard">
            {Cities?.map((state) => (
              <MenuItem key={state.title} value={state.title}>
                {state.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Cantón"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setCanton(e.target.value);
              setDistrict('');
            }}
            value={canton}
            disabled={(!city) ? true : false}
            select>
            {Cities.filter(City => City.title === city).map((city) => (
              city?.district.map((district) => (
                <MenuItem key={district.title} value={district.title}>
                  {district.title}
                </MenuItem>
              ))
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={district}
            required
            id="district"
            name="district"
            label="Distrito"
            fullWidth
            variant="standard"
            onChange={(e) => setDistrict(e.target.value)}
            disabled={(!canton) ? true : false}
            select>
            {Cities?.filter(City => City.title === city).map((Canton) => (
              Canton?.district.filter(selectedCanton => selectedCanton.title === canton)?.map((districts) => (
                districts.districts.map((district) => (
                  <MenuItem key={district.title} value={district.title}>
                    {district.title}
                  </MenuItem>
                ))
              ))
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={postalCode}
            required
            id="zip"
            name="zip"
            label="Código postal"
            fullWidth
            type="number"
            variant="standard"
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
)

export default AddressForm;