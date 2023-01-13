
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import Money from '@mui/icons-material/Money';

export const PendingOrders = (props) => {
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              ORDENES PENDIENTES
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {props.pending}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            >
              <Money />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};

export default PendingOrders;