
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';

export const Budget = (props) => {
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL DE VENTAS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              ₡{props.budget}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56
              }}
            >
              ₡
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};

export default Budget;