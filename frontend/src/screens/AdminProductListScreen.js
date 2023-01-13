import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import ProductListToolbar from '../components/ProductComponents/ProductListToolBar';
import Progress from '../components/Progress';
import AdminProductCard from '../components/ProductComponents/AdminProductCard';

const AdminProductListScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: productSuccessDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, productSuccessDelete]);

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      {loading && <Progress />}
      <Container maxWidth="xl">
        <ProductListToolbar />
        <Grid container spacing={3}>
          {products?.map((product) => (
            <React.Fragment key={product._id}>
              <Grid item lg={4} md={6} xs={12}>
                <AdminProductCard
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  description={product.description}
                  id={product._id}
                  updatedAt={product.updatedAt}
                  createdAt={product.createdAt}
                  countInStock={product.countInStock}
                  category={product.category}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Box>
  )
};

export default AdminProductListScreen;