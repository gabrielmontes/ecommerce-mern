import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import TopProducts from './ProductComponents/TopProducts';

const CartSideBar = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (props?.id) {
      dispatch(addToCart(props?.id, props.item.split(',')[0], props.item.split(',')[1]));
    };
  }, [dispatch, props.id, props.item]);

  const checkoutHandler = () => {
    props.handleClose(false);
    navigate('/checkout');
  }

  const handleStore = () => {
    navigate('/products');
    props.handleClose(false);
  }

  const handleClose = () => {
    props.handleClose(false);
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  return (
    <Drawer anchor={"right"} open={props.isOpen} onClose={handleClose}>
      <Box width={275}>
        {cartItems.length === 0 ? (
          <Stack mx={2} mt={2} spacing={1}>
            <Typography variant="h6" textAlign="center">
              El carrito está vacío.
            </Typography>
            <Divider />
            <Typography variant="body2" textAlign="center" mt={1}>
              Productos destacados:
            </Typography>
            <TopProducts phone={true} />
            <Button onClick={handleStore} variant="contained">
              Volver a la tienda
            </Button>
          </Stack>
        ) : (
          <Grid container spacing={2} alignContent="center" justifyContent="center">
            <Grid item xs={11}>
              <Typography variant="h6">
                Carrito de compras
              </Typography>
              <Stack spacing={1}>
                <Divider />
                {cartItems?.map((item) => (
                  <React.Fragment key={item.product}>
                    <Grid container direction="row">
                      <Grid item md={4}>
                        <Box component="img" heigth={75} width={75} src={item.image} alt={item.name} sx={{ mr: 2 }} />
                      </Grid>
                      <Grid item md={8}>
                        <Typography variant="body2" fontWeight="bold">
                          Nombre: {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cantidad: {item.qty}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Precio: ₡{item.price}
                        </Typography>
                        <Button variant="text" sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
                          onClick={() => removeFromCartHandler(item.product)}>
                          Eliminar
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider />
                  </React.Fragment>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={11}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  El total, los impuestos y {' '}
                  <Link color="inherit" href="https://tienda.latrojacr.net/terms/">
                    gastos de envío
                  </Link>{' '}
                  se calculan en la pantalla de pago.
                </Typography>
                <Divider />
                <Button variant="contained" onClick={checkoutHandler}>
                  Continuar con el pago
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>
    </Drawer>
  )
}
export default CartSideBar;