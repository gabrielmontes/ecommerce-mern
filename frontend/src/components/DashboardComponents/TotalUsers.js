import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import People from '@mui/icons-material/People';

const TotalUsers = (props) => {
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL DE USUARIOS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {props.users.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56
              }}
            >
              <People />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalUsers;