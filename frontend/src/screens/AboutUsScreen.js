import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material';
import MainBox from '../components/MainBox';

const rows = [
  {
    title: "Historia:",
    text: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."`
  },
  {
    title: "Misión:",
    text: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    title: "Visión:",
    text: `
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    `
  },
]

const AboutUs = () => {
  return (
    <MainBox title='Sobre nosotros' maxw="lg">
      <Grid container spacing={5} mt={2} direction={{ xs: "column", md: "row" }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              {rows.map((row) => (
                <React.Fragment key={row.title}>
                  <Typography variant="h6" fontWeight="bold">
                    {row.title}
                  </Typography>
                  <Typography variant="body2" align="justify">
                    {row.text}
                  </Typography>
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainBox>
  );
}

export default AboutUs;