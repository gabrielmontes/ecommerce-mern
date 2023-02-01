import React, { forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../actions/orderActions';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const ReviewForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  console.log(cartItems);
  
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => Number(acc) + Number(item.price), 0)
  );

  cart.shippingPrice = addDecimals(2000);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice)
  ).toFixed(2);

  const submitHandler = () => {
    dispatch(
      createOrder({
        created_by: userInfo._id,
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        fullName: `${userInfo.name} ${userInfo.lastname}`,
        email: userInfo.email
      })
    );
  };

  useImperativeHandle(ref, () => ({
    submitHandler,
  }));


  return (
    <React.Fragment>
      <Typography variant="subtitle1">
        Resumen del pedido:
      </Typography>
      <List dense>
        {cartItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={`Cantidad: ${product.qty}`} />
            <Typography variant="body2" color="text.secondary">
              {`₡ ${Number(product.price)}`}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Costo de envío:" />
          <Typography variant="body2" color="text.secondary">
            ₡ 2000
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total:" />
          <Typography variant="body2" color="text.secondary">
            {`₡ ${parseInt(cart.itemsPrice) + parseInt(2000)}`}
          </Typography>
        </ListItem>
        <Divider />
      </List>
      <Stack direction="row"
        spacing={1} justifyContent="space-between"
        alignItems="center">
        <Stack>
          <Typography variant="subtitle1">
            Envío
          </Typography>
          <Typography color="text.secondary">
            {shippingAddress.address}.
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {`${shippingAddress.city}, 
            ${shippingAddress.canton}, 
            ${shippingAddress.district}.`}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">
            Método de pago
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {paymentMethod}.
          </Typography>
        </Stack>
      </Stack>
    </React.Fragment>
  );
});

export default ReviewForm;