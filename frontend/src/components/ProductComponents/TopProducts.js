import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { autoPlay } from 'react-swipeable-views-utils';
import Grid from '@mui/material/Grid';
import ProductsCard from './ProductsCard';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import useMediaQuery from '@mui/material/useMediaQuery';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const TopProducts = (props) => {
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productTopRated);
  const { products } = productList;

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = products.length;

  const phone =  useMediaQuery("(max-width: 460px)");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  
  return (
    <React.Fragment>
      {phone || props.phone ? (
        <Box sx={{ maxWidth: 325, flexGrow: 1 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents>
            {products?.map((product) => (
              <div key={product._id}>
                {Math.abs(activeStep) <= 2 ? (
                  <ProductsCard
                    name={product.name}
                    onClick={() => navigate(`/product/${product._id}`)}
                    image={product.image}
                    description={product.description}
                    height="250"
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          />
        </Box>
      ) : (
        <Grid container spacing={5} direction={{ xs: "column", md: "row" }} mt={2.5}>
          {(products)?.slice(0, 3)?.map((product) => (
            <Grid item xs={6} md={4} key={product._id}>
              <ProductsCard
                name={product.name}
                onClick={() => navigate(`/product/${product._id}`)}
                image={product.image}
                height="250"
                description={product.description}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  )
}

export default TopProducts;