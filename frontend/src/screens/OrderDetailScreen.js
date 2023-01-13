import {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';
import {
  Box,
  Grid,
  Container,
  Typography,
} from '@mui/material';
import Progress from '../components/Progress.js';
import OrderProductList from '../components/OrderComponents/OrderProductsList';
import OrderDetails from '../components/OrderComponents/OrderDetails';

const AdminOrderDetailScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id])

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      {loading && <Progress />}
      <Container maxWidth="xl">
        <Typography sx={{ mb: 3 }} variant="h4">
          Detalle de la orden
        </Typography>
        <Box component="form">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <OrderProductList products={order.orderItems} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <OrderDetails order={order} user={userInfo} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
};

export default AdminOrderDetailScreen;