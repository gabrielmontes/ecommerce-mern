import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
import { Sales } from '../components/DashboardComponents/Sales';
import { listOrders, getOrdersCountByDate } from '../actions/orderActions';
import { listUsers } from '../actions/userActions';
import TotalUsers from '../components/DashboardComponents/TotalUsers';
import Budget from '../components/DashboardComponents/Budget';
import PendingOrders from '../components/DashboardComponents/PendingOrders';

const Page = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  useEffect(() => {
    dispatch(listOrders());
    dispatch(listUsers());
  }, [dispatch]);

  const orderDetails = () => {
    let budget = 0;
    let pendingOrders = 0;

    orders?.map((order) => {
      if (!order.isDelivered) {
        pendingOrders += 1;
      };

      return budget += order.totalPrice;
    });

    return {
      budget: budget,
      pendingOrders: pendingOrders,
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers users={users} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PendingOrders pending={orderDetails()?.pendingOrders} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget budget={orderDetails()?.budget} />
          </Grid>
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <Sales/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Page;