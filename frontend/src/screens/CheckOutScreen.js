import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainBox from '../components/MainBox';
import AddressForm from '../components/PaymentComponents/AddressForm';
import PaymentForm from '../components/PaymentComponents/PaymentForm';
import ReviewForm from '../components/PaymentComponents/ReviewForm';
import NewUserForm from '../components/PaymentComponents/NewUserForm';

export default function Checkout() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  const addressRef = useRef();
  const paymentRef = useRef();
  const reviewRef = useRef();
  const newuserRef = useRef();

  useEffect(() => {
    if (userInfo) {
      setSteps(['Dirección de envío', 'Detalles del pago  ', 'Confirme su orden']);
      setActiveStep(1);
    };

    setSteps(['Datos de usuario', 'Dirección de envío', 'Detalles del pago  ', 'Confirme su orden']);
  }, [userInfo]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <NewUserForm ref={newuserRef} />;
      case 1:
        return <AddressForm ref={addressRef} />;
      case 2:
        return <PaymentForm ref={paymentRef} />;
      case 3:
        return <ReviewForm ref={reviewRef} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        newuserRef.current.submitHandler();
        break;
      case 1:
        addressRef.current.submitHandler();
        break;
      case 2:
        paymentRef.current.submitHandler();
        break;
      case 3:
        reviewRef.current.submitHandler();
        break;
      default:
        throw new Error('Error');
    }

    if (userInfo) setActiveStep(activeStep - 1);

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStore = () => {
    navigate("/products");
  };

  return (
    <MainBox maxw="sm">
      <Paper variant="outlined" sx={{ p: 2, minHeight: '35vh', mb: 5 }}>
        <Stack>
          <Typography component="h1" variant="h4" align="center">
            Confirmar pedido
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
              {steps?.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por su orden.
                </Typography>
                {success && (
                  <React.Fragment>
                    <Typography variant="body2" color="text.secondary">
                      Su número de orden es la #{String(order.id).padStart(6, 0)}.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Se ha enviado una confirmación de su pedido por correo electrónico.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                      <Button onClick={handleStore} variant="contained" >
                        Volver a la tienda
                      </Button>
                    </Box>

                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} disabled={((activeStep - 1) === 0)}>
                      Volver
                    </Button>
                  )}
                  <Button variant="contained" onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={(cartItems.length === 0) ? true : false}>
                    {activeStep === steps.length - 1 ? 'Realizar pedido' : 'Continuar'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Stack>
      </Paper>
    </MainBox>
  );
}