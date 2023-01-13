import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const LoginScreen = () => {
  const [value, setValue] = useState('1');
  const [isOpen, setisOpen] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setisOpen(false);
  }

  useEffect(() => {
    if (userInfo) {
      setisOpen(false);
    }

  }, [userInfo]);

  return (
    <Dialog open={isOpen} maxWidth='xs' fullWidth >
      <Stack>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary">
              <Tab label="Iniciar sesión" value="1" />
              <Tab label="Registrarse" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <LoginForm />
          </TabPanel>
          <TabPanel value="2">
            <RegisterForm value={setValue}/>
          </TabPanel>
        </TabContext>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </Dialog>
  )
}

export default LoginScreen;