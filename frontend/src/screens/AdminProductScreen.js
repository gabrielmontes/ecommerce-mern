import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../actions/notificationActions';
import { listProductDetails, updateProduct, createProduct } from '../actions/productActions';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCT_UPDATE_RESET, PRODUCT_CREATE_RESET } from '../constants/productConstants';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Grid,
  Container,
  CardHeader,
  MenuItem
} from '@mui/material';
import Progress from '../components/Progress';
import CustomTextField from '../components/CustomTextField';


const AdminProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, success: successUpdate } = productUpdate;

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, success: successCreate } = productCreate;

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('sample');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/products');
    };

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate('/admin/products');
    };

    if (product._id !== id) {
      dispatch(listProductDetails(id));
    }

    setName(product.name || '');
    setPrice(product.price || '');
    setImage(product.image || '');
    setCountInStock(product.countInStock || '');
    setDescription(product.description || '');
    setCategory(product.category || 'sample');
  }, [dispatch, navigate, id, product, successUpdate, successCreate]);


  const handleProduct = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(updateProduct({
        _id: id,
        name,
        price,
        image,
        category,
        description,
        countInStock,
      }));
    } else {
      dispatch(
        createProduct(
          name,
          price,
          image,
          category,
          description,
          countInStock,
        )
      );
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setImage(e.target.value);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/products/upload', formData, config)

      setImage(data);
      dispatch(setMessage("success", "La imagen se subió con éxito."));
    } catch (error) {
      dispatch(setMessage("error", `Error: ${error}.`));
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      {(loading || loadingUpdate || loadingCreate) && <Progress />}
      <Container maxWidth="xl">
        <Typography sx={{ mb: 3 }} variant="h4">
          {id ? "Editar" : "Crear"} Producto
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Avatar src={image} sx={{ width: 150, height: 150, borderRadius: 2 }} />
                  <Typography color="textPrimary" variant="h6" mt={2}>
                    Imagen del producto
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button variant="text" component="label" fullWidth>
                  {id ? "Cambiar" : "Agregar"} Imagen
                  <input type="file" hidden accept="image/*" onChange={uploadFileHandler} />
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <Box component="form" onSubmit={handleProduct} sx={{ flexGrow: 1 }}>
              <Container maxWidth="xl">
                <Card>
                  <CardHeader subheader="Llenar los campos con *" title={id ? "Editar producto" : "Nuevo producto:"} />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <CustomTextField value={name} setValue={setName} label="Nombre" type="text" error="Digite el nombre" />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <CustomTextField value={countInStock} setValue={setCountInStock} label="Cantidad" type="number" error="Digite la cantidad" />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <CustomTextField value={price} setValue={setPrice} label={"Precio por unidad"} type="number" error={"Digite el precio por unidad"} />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <CustomTextField value={description} setValue={setDescription} label="Descripcion" type="text" error="Digite la descripcion" />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2
                    }}
                  >
                    <Button type="submit" color="primary" variant="contained">
                      Guardar
                    </Button>
                  </Box>
                </Card>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminProductScreen;