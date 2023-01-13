import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import {  deleteProduct } from '../actions/productActions';
import {  deleteUser } from '../actions/userActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';

const DeleteUserProduct = (props) => {
  const dispatch = useDispatch();

  const { id, variant, text } = props;
  const [isOpen, setisOpen] = useState(true);

  const handleClose = () => {
    setisOpen(false);
  }

  const handleDeletion = () => {
    if(variant === "user"){
      dispatch(deleteUser(id));
    }

    if(variant === "product"){
      dispatch(deleteProduct(id));
    }
    
    handleClose();
  }


  return (
    <Dialog fullWidth open={isOpen} maxWidth="sm">
      <DialogTitle>
        ¿Está seguro?
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => setisOpen(false)}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleDeletion} >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default DeleteUserProduct;