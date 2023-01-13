
import React, { useEffect, useState } from 'react';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { NavItem } from './NavItem';
import { useNavigate } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import {
  Button,
  Stack,
  Box,
  Typography,
  Divider
} from '@mui/material';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const userInfo = useSelector((state) => state.userLogin);

  const [user, setUser] = useState(userInfo.userInfo);

  useEffect(() => {
    if (userUpdateProfile.userInfo) {
      setUser(userUpdateProfile.userInfo);
    }
  }, [userUpdateProfile]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const items = [
    {
      href: user.isAdmin ? '/admin/dashboard' : '/',
      icon: (<HomeIcon fontSize="small" />),
      title: 'Inicio',
    },
    {
      href: user.isAdmin ? '/admin/products' : '/products',
      icon: (<InventoryIcon fontSize="small" />),
      title: user.isAdmin ? 'Productos' : 'Tienda',
    },
    {
      href: user.isAdmin ? '/admin/orders' : '/orders',
      icon: (<ShoppingBasketIcon fontSize="small" />),
      title: 'Ordenes',
    },
    {
      href: user.isAdmin ? '/admin/users' : null,
      icon: user.isAdmin ? (<PeopleIcon fontSize="small" />) : null,
      title: user.isAdmin ? 'Usuarios' : null,
    },
    {
      href: '/account', 
      icon: (<SettingsIcon fontSize="small" />),
      title: 'Cuenta',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#111827',
      }}>
      <Box sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: '11px',
          borderRadius: 1
        }}>
        <Box sx={{ px: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: '11px',
              borderRadius: 1
            }}>
            <div>
              <Typography color="neutral.100" variant="subtitle1" sx={{ textTransform: "capitalize" }}>
                {user.name} {user.lastname}
              </Typography>
            </div>
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#2D3748', my: 3 }} />
        <Box sx={{ flexGrow: 1 }}>
          {items?.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              state={item.state}
            />
          ))}
        </Box>
        <Stack mx={2} mt={2}>
          <Button onClick={handleLogout} variant="contained">
            Cerrar sesión
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Layout;  