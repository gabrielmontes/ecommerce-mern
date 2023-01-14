import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Footer from './Footer';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import SearchBox from './SearchBox';
import CartSideBar from './CartSideBar';
import LoginScreen from './UserComponents/LoginRegister';
import useMediaQuery from '@mui/material/useMediaQuery';
import Layout from './Layout';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


function CustomIconButton(props) {
  return (
    <IconButton
      onClick={props.onClick}>
      {props.children}
    </IconButton>
  );
}

export default function NavBar(props) {
  const navigate = useNavigate();
  const drawerWidth = 260;

  let location = useLocation();

  const [isLogin, setisLogin] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isCartOpen, setisCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const phone = useMediaQuery("(max-width: 460px)");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart;

  const count = cartItems.length;

  const handleHome = () => {
    navigate('/');
  };
  const handleSearch = () => {
    setisOpen(!isOpen);
  }

  const handleCart = () => {
    setisCartOpen(true);
  }

  const handleCloseCart = () => {
    setisCartOpen(false);
  }

  const handleLogin = () => {
    setisLogin(!isLogin);
  }

  const handleUserMenu = () => {
    if (phone) {
      setMobileDrawer(!mobileDrawer);
    };

    setOpenUserMenu(!openUserMenu);
  }

  const handleDrawerClose = () => {
    setMobileDrawer(false);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function isHome(value){
    return (value.pathname === "/");
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar elevation={0} position="absolute" color="transparent"
        sx={{
          width: (userInfo) ? { sm: `calc(100% - ${drawerWidth}px)` } : null,
          ml: (userInfo) ? { sm: `${drawerWidth}px` } : null,
        }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters={true}>
            <IconButton sx={{ ml: -1 }} onClick={handleHome}>
              Home
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            {(isOpen) ? (
              <SearchBox back={handleSearch} />
            ) : (
              <CustomIconButton location={location} onClick={handleSearch} >
                <SearchIcon />
              </CustomIconButton>
            )}
            {(!userInfo || phone) &&
              <CustomIconButton location={location} onClick={(userInfo) ? handleUserMenu : handleLogin}>
                <AccountCircleOutlinedIcon />
              </CustomIconButton>
            }
            <CustomIconButton location={location} onClick={handleCart}>
              <StyledBadge badgeContent={count}
                color="secondary">
                <ShoppingCartOutlinedIcon />
              </StyledBadge>
            </CustomIconButton>
          </Toolbar>
        </Container>
      </AppBar>
      {(userInfo) &&
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, backgroundColor: "primary" }}>
          <Drawer
            container={container}
            variant="permanent"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'none', sm: 'block' },
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}>
            <Layout userInfo={userInfo} />
          </Drawer>
        </Box>
      }
      {phone &&
        <Drawer variant="temporary" anchor={"left"} open={mobileDrawer} onClose={handleDrawerClose}>
          <Layout userInfo={userInfo} />
        </Drawer>
      }
      {isCartOpen && <CartSideBar isOpen={isCartOpen} handleClose={handleCloseCart} />}
      {isLogin && <LoginScreen />}
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {props.children}
        <Footer />
      </Box>
    </Box>
  );
}