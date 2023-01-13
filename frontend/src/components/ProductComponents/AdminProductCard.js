import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteUserProduct from '../DeleleteUserProduct';
import EditIcon from '@mui/icons-material/Edit';

const AdminProductCard = (props) => {
  const { id, name } = props;

  const [showdelete, setShowdelete] = useState(false);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
          <Avatar
            alt="Product"
            src={props.image}
            variant="square"
            sx={{ height: 100, width: 100, borderRadius: 3 }}
          />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {props.name}
        </Typography>
        <Typography align="center" color="textSecondary" variant="body2">
          Última actualización: {props.updatedAt.substring(0, 10)}
        </Typography>
        <Typography align="center" color="textSecondary" variant="body2">
          Categoria: {props.category}
        </Typography>
        <Typography align="center" color="textSecondary" variant="body2">
          Cantidad: {props.countInStock}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
            <IconButton size="small"
              onClick={() => setShowdelete(!showdelete)} >
              <DeleteIcon />
            </IconButton>
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Borrar
            </Typography>
          </Grid>
          <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
            <IconButton size="small" href={`/admin/product/${id}`}>
              <EditIcon />
            </IconButton>
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Editar
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {showdelete &&
        <DeleteUserProduct
          id={id}
          variant="product"
          text={`Desea eliminar el producto: ${name}`}
        />}
    </Card>
  )
};

export default AdminProductCard;