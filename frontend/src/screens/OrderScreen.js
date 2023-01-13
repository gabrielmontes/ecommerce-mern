import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrders, listMyOrders} from '../actions/orderActions';
import { Box, Container, Grid, Typography } from '@mui/material';
import OrderListResults from '../components/OrderComponents/OrderListResults';
import OrderListToolBar from '../components/OrderComponents/OrderListToolBar';
import Progress from '../components/Progress';

const OrderScreen = () => {
  const dispatch = useDispatch();

  const orderListAdmin = useSelector((state) => state.orderList);
  const { loading: loadingAdminOrders, orders: adminOrders } = orderListAdmin;

  const orderListUser = useSelector((state) => state.orderListMy);
  const { loading: loadingUserOrders, orders: userOrders } = orderListUser;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  useEffect(() => {
    if(!userInfo.isAdmin){
      dispatch(listMyOrders());
    };

    dispatch(listOrders());
  }, [dispatch, userInfo.isAdmin])

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      {(loadingAdminOrders || loadingUserOrders) && <Progress />}
      <Container maxWidth="xl">
        <OrderListToolBar />
        <Box sx={{ mt: 3 }}>
        {((userInfo.isAdmin? adminOrders : userOrders)?.length > 0) ? (
            <OrderListResults orders={(userInfo.isAdmin? adminOrders : userOrders)}/>
          ) : (
            <Grid container alignItems="center" justifyContent="center" direction="row" sx={{ height: 300 }}>
              <Typography variant="body1" color="text.secondary" align="center">
                No hay ordenes registradas.
              </Typography>
            </Grid>
          )}
        </Box>
      </Container>
    </Box >
  );
};

export default OrderScreen;