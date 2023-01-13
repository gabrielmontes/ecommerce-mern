import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function MainBox(props) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: (props.height? props.height : '85vh'),
      marginBottom: 2
    }}>
      <CssBaseline />
      <Container maxWidth={props.maxw} >
        <Typography variant="h3">
          {props.title}
        </Typography>
        {props.children}
      </Container>
    </Box>
  );
}