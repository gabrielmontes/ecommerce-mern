import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const AccountProfile = (props) => {
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography color="textPrimary" gutterBottom variant="h5" sx={{ textTransform: "capitalize" }}>
            {props.user.name} {props.user.lastname}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {(props.user.isAdmin) ? "Administrador" : "Cliente"}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  )
};

export default AccountProfile;