
import { deliverOrder, payOrder } from '../../actions/orderActions';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CustomTextField from '../CustomTextField.js';

const OrderDetails = ({ order, user }) => {
  const dispatch = useDispatch();

  const handleAdminDeliver = () => {
    dispatch(deliverOrder(order));
  }

  const handleAdminPay = () => {
    dispatch(payOrder(order));
  }


  return (
    <Card>
      <CardHeader subheader="Detalles de la orden:" title="Orden" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <CustomTextField label="ID" type="text" readonly={true} value={String(order.id).padStart(6, 0)} />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomTextField label="Fecha" type="text" readonly={true} value={String(order.createdAt?.substring(0, 10))} />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomTextField label="Método de pago" type="text" readonly={true} value={String(order.paymentMethod)} />
          </Grid>
          <Grid item md={6} xs={12}>
            <CustomTextField label="Total" type="text" readonly={true} value={`₡${order.totalPrice}`} />
          </Grid>
          {(user.isAdmin) &&
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAdminDeliver} checked={!!order.isDelivered} disabled={order.isDelivered}/>
                    }
                    label="Entregar orden"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAdminPay} checked={!!order.isPaid}  disabled={order.isPaid}/>
                    }
                    label="Orden pagada"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          }
        </Grid>
      </CardContent>
    </Card>
  )
};

export default OrderDetails;