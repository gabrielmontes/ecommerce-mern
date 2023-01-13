import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions'
import { useParams } from 'react-router-dom';
import { createProductReview } from '../actions/productActions';
import { styled } from '@mui/material/styles';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import CartSideBar from '../components/CartSideBar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MainBox from '../components/MainBox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import ProductItems from '../components/ProductItems';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [isCartOpen, setisCartOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
  } = productReviewCreate;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setisOpen(false);
    };

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const handleOpen = () => {
    setisOpen(true);
  }

  const handleClose = () => {
    setisOpen(false);
  }

  const handleReview = () => {
    const name = userInfo.name;
    dispatch(createProductReview(id, { rating, name }));
  }

  const handleCart = () => {
    setisCartOpen(true);
  }

  const handleCloseCart = () => {
    setisCartOpen(false);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };
       
  return (
    <MainBox maxw="md">
      <Grid container columns={{ xs: 1, md: 12 }} spacing={3}>
        <Grid item xs={12} md={7}>
          <Card variant="outlined">
            <CardMedia
              sx={{
                objectFit: "cover",
              }}
              component="img"
              height="500"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Nota: ${product.rating}`}
              </Typography>
              <Rating
                disabled={product.reviews.some(review => review.name === userInfo?.name)}
                value={rating}
                onChange={(e) => {
                  handleOpen();
                  setRating(parseInt(e.target.value));
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={5}>
          <Card>
            <CardContent>
              <Stack directon="column" spacing={2}>
                <Typography variant="h3">
                  {product.name}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  Los gastos de envío se calculan en la pantalla de pago.
                </Typography>
                <Paper variant="outlined" square>
                  {product.countInStock > 0 ? (
                    <ProductItems product={product} handleChange={handleChange} value={value}/>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No hay disponibles.
                    </Typography>
                  )}
                </Paper>
                <Button
                  variant="contained"
                  disabled={product.countInStock === 0}
                  onClick={handleCart}>
                  {product.countInStock === 0 ? "No hay disponibles" : "Agregar al carrito"}
                </Button>
                <Divider />
                <Stack direction="row">
                  <Button onClick={handleExpandClick}
                    variant="text"
                    startIcon={<LocalShippingIcon fontSize="small" />}
                    endIcon={<KeyboardArrowDownIcon fontSize="small" />}>
                    Envío
                  </Button>
                  <ExpandMore expand={expanded}
                    aria-expanded={expanded}>
                  </ExpandMore>
                </Stack>
                <Divider />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Enviamos pedidos todos los días.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Costo: ₡2.000 a cualquier parte del país.
                    </Typography>
                  </Stack>
                </Collapse>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Stack spacing={1} mt={2}>
        <Typography variant="h6" color="text.primary">
          Calificaciones:
        </Typography>
        {(product.reviews.length === 0) ? (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body1" color="text.primary">
                El producto no tiene calificaciones registradas.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Haga click sobre las estrellas para calificar el producto.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <>
            {product?.reviews.map((review) => (
              <Card key={review._id} variant="outlined">
                <CardContent>
                  <Stack direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}>
                    <Typography variant="body1" color="text.secondary">
                      {review.name}
                      <br />
                      {review.createdAt.substring(0, 10)}
                    </Typography>
                    <Rating value={review.rating} readOnly />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Stack>
      {isOpen && <Dialog fullWidth open={isOpen} maxWidth="sm">
        <DialogTitle>
          {!userInfo ? "Debe crear una cuenta" : "¿Está seguro?"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {!userInfo ? (
              "Para crear una cuenta seleccione el ícono de usuario en la barra superior ."
            ) : (
              `¿Desea calificar con un ${rating} al producto: ${product.name}?`
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            {userInfo ? "Cancelar" : "Aceptar"}
          </Button>
          {userInfo &&
            <Button onClick={handleReview} variant="contained" color="primary" disabled={(!userInfo)}>
              Aceptar
            </Button>
          }
        </DialogActions>
      </Dialog>
      }
      {isCartOpen && <CartSideBar isOpen={isCartOpen} handleClose={handleCloseCart} id={id} item={value}/>}
    </MainBox >
  )
}

export default ProductScreen;