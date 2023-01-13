import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import { Box, Container } from '@mui/material';
import CustomerListResults from '../components/CustomerComponents/CustomerListResults';
import CustomerListToolbar from '../components/CustomerComponents/CustomerListToolBar';
import Progress from '../components/Progress';

const AdminUserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users: customers, loading } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: userSuccessDelete } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, userSuccessDelete]);

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      <Container maxWidth="xl">
        {loading && <Progress />}
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  );
};

export default AdminUserListScreen;