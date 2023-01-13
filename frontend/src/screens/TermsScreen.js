import React from 'react';
import MainBox from '../components/MainBox';
import ListItemText from '@mui/material/ListItemText';
import {
  Grid,
  Typography,
  List,
  ListItem,
  Card,
  CardContent
} from '@mui/material';

const TermsScreen = () => {
  return (
    <MainBox title="Preguntas Frecuentes" maxw="md">
      <Grid container spacing={5} mt={2}>
        <Grid item xs={12} md={6} >
          <Card>
            <CardContent>
              <Typography variant="h6">
                ¿Cómo los contacto?
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Correo electrónico: " secondary="contacto@latrojacr.net" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Whatsapp: " secondary="+50661542266." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Dirección: " secondary="Heredia, Mini Bodegas #1073-1075" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                ¿Cómo puedo hacer mi pago?
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Contra entrega: " secondary="El pago debe de realizarse en efectivo o sinpe móvil al numero 8888-8888." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Transferencia bancaria: " secondary="Contamos con cuentas en colones y dolares del BAC Credomatic." />
                </ListItem>
              </List>
            </CardContent >
          </Card >
        </Grid>
      </Grid>
    </MainBox >
  );
}

export default TermsScreen;