import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from '@mui/material';
import AccountProfile from '../components/AccountComponents/AccountProfile';
import { AccountProfileDetails } from '../components/AccountComponents/AccountProfileDetails';

const Page = () => {
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const userInfo = useSelector((state) => state.userLogin);

  const [user, setUser] = useState(userInfo.userInfo);

  useEffect(() => {
    if (userUpdateProfile.userInfo) {
      setUser(userUpdateProfile.userInfo);
    }
  }, [userUpdateProfile]);

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      <Container maxWidth="xl">        
      <Typography sx={{ mb: 3 }} variant="h4">
        Cuenta
      </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile user={user} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails user={user} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Page;