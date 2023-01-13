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
    text: `La Troja Cervecería Artesanal, fue fundada en el 2011, en el cantón de Moravia, provincia de San José.
    Somos una PYME y estamos registrados ante el Ministerio de Economia, Industria y Comercio de Costa Rica desde el año 2020.`
  },
  {
    title: "Misión:",
    text: `Brindar al mercado costarricense cervezas artesanales de calidad,
    por medio de la constante  innovación de nuestros procesos de elaboracion de nuestras cervezas.`
  },
  {
    title: "Visión:",
    text: `Ser una cervecería artesanal líder en el país, reconocida por la calidad, el sabor y originalidad de cada una de nuestras cervezas.`
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