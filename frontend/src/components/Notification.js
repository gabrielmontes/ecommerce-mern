import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HIDE_MESSAGE } from '../constants/notificationConstants';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert  elevation={10} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const [isOpen, setIsOpen] = useState();
  const [severity, setSeverity] = useState();

  const notification = useSelector(state => state.notification);

  function handleClose() {
    dispatch({ type: HIDE_MESSAGE });
  }

  useEffect(() =>{
    if(notification){
      setMessage(notification.notification);
      setIsOpen(notification.isOpen);
      setSeverity(notification.severity);
    }
  }, [notification])

  return (
    <Stack spacing={2} sx={{ minWidth: 200 }}>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Notification;