import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { listProductByCategories, listProducts } from '../actions/productActions';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MainBox from '../components/MainBox';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Progress from '../components/Progress';
import Button from '@mui/material/Button';
import ProductsCard from '../components/ProductComponents/ProductsCard';

const categories = [
  { value: "beers", label: "Cervezas" },
  { value: "merchandise", label: "Mercancía" },
  { value: "other", label: "Otro" }
];

const StoreScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keyword } = useParams();

  const [isChipVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState([]);
  
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const productList = useSelector((state) => state.productList);
  const { products: productItems, loading: loadingList } = productList;

  const productItemsCategories = useSelector((state) => state.productListByCategories);
  const { products: productListByCategories, loading: loadingListByCategories } = productItemsCategories;

  useEffect(() => {
    if (!checked.length) {
      dispatch(listProducts(keyword));
    }

    dispatch(listProductByCategories({ categories: checked }));
  }, [dispatch, checked, keyword]);

  const handleDelete = (chipToDelete) => () => {
    setChecked((checked) => checked.filter((chip) => chip !== chipToDelete));
  };

  return (
    <MainBox maxw="md">
      {(loadingList || loadingListByCategories) && <Progress />}
      <Stack spacing={1}>
        <Typography variant="h4">
          Productos
        </Typography>
        <Stack direction="row" spacing={2}>
          <React.Fragment>
            <Button onClick={handleClick}
              variant="text"
              endIcon={<KeyboardArrowDownIcon fontSize="small" />}
              sx={{
                minHeight: 0,
                minWidth: 0,
                padding: 0,
                mt: -0.3,
                fontWeight: "normal",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "transparent"
                }
              }}>
              Filtrar productos
            </Button>
            <Popover open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <Box sx={{ p: 1 }}>
                <List>
                  <Typography variant="body2" >
                    {`${checked.length} seleccionados`}
                  </Typography>
                  <Divider />
                  {categories?.map((category) => (
                    <ListItemButton key={category.label}
                      role={undefined}
                      onClick={handleToggle(category.label)}
                      dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(category.label) !== -1}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText primary={category.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Popover>
          </React.Fragment>
          <Box sx={{ flexGrow: 1 }} />
          {(!checked.length) ? (
            <Typography variant="body2" align="center">
              {(productItems?.length === 1) ? `${productItems?.length} producto` : `${productItems?.length} productos`}
            </Typography>
          ) : (
            <Typography variant="body2" align="center">
              {`${productListByCategories?.length} productos`}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          {isChipVisible &&
            <React.Fragment>
              {checked?.map((data) => (
                <Chip key={data} label={data} variant="outlined" onDelete={handleDelete(data)} size="small" />
              ))}
            </React.Fragment>
          }
          {keyword &&
            <React.Fragment>
              <Chip label={keyword}
                variant="outlined"
                onDelete={() => {
                  navigate('/products');
                  dispatch(listProducts());
                }}
                size="small" />
            </React.Fragment>
          }
        </Stack>
      </Stack>
      <Grid container spacing={3} direction="row" mt={1} justifyContent="center" alignItems="center">
        {(checked?.length) ? (
          <React.Fragment>
            {productListByCategories?.map((product) => (
              <Grid item xs={12} md={4} key={product._id}>
                <ProductsCard
                  name={product.name}
                  onClick={() => navigate(`/product/${product._id}`)}
                  image={product.image}
                  height="250"
                  price={product.price}
                  description={product.description}
                />
              </Grid>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {(productItems?.length > 0) ? (
              <React.Fragment>
                {productItems?.map((product) => (
                  <Grid item xs={12} md={4} key={product._id}>
                    <ProductsCard
                      name={product.name}
                      onClick={() => navigate(`/product/${product._id}`)}
                      image={product.image}
                      height="250"
                      price={product.price}
                      description={product.description}
                    />
                  </Grid>
                ))}
              </React.Fragment>
            ) : (
              <Grid container alignItems="center" justifyContent="center" direction="row" sx={{ height: 300 }}>
                <Typography variant="body1" color="text.secondary" align="center">
                  No se encontraron resultados para "{keyword}", revisa la ortografía o usa una palabra diferente.
                </Typography>
              </Grid>
            )}
          </React.Fragment>
        )}
      </Grid>
    </MainBox >
  )
}

export default StoreScreen;