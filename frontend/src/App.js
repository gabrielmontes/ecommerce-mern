import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { USER_LOGOUT } from './constants/userConstants';
import { useDispatch } from 'react-redux';
import { setMessage } from './actions/notificationActions';
import NavBar from './components/NavBar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import StoreScreen from './screens/StoreScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import NotFoundPage from './screens/NotFoundScreen';
import AboutUs from './screens/AboutUsScreen';
import TermsScreen from './screens/TermsScreen';
import Notification from './components/Notification';
import OrderScreen from './screens/OrderScreen';
import AdminProductListScreen from './screens/AdminProductListScreen';
import AdminUserScreen from './screens/AdminUserScreen';
import AdminProductScreen from './screens/AdminProductScreen';
import AdminUserListScreen from './screens/AdminUserListScreen';
import AdminDashboard from './screens/AdminDashboard';
import AccountScreen from './screens/AccountScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AdminRoutes from './context/auth-admin';
import UserRoutes from './context/auth-user';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    const token = JSON.parse(user)?.token;

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])).exp;

      if (decodedToken * 1000 < new Date().getTime()) {
        dispatch({ type: USER_LOGOUT });
        dispatch(setMessage("error", "Se ha cerrado la sesion por inactividad"));
      }
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <NavBar>
        <Routes>
          <Route element={<UserRoutes />}>
            <Route path='/account' element={<AccountScreen />} exact />
            <Route path='/orders' element={<OrderScreen />} exact />
            <Route path='/order/:id' element={<OrderDetailScreen />} exact />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} exact />
            <Route path='/admin/users' element={<AdminUserListScreen />} exact />
            <Route path='/admin/user' element={<AdminUserScreen />} exact />
            <Route path='/admin/user/:id' element={<AdminUserScreen />} exact />
            <Route path='/admin/products' element={<AdminProductListScreen />} exact />
            <Route path='/admin/product' element={<AdminProductScreen />} exact />
            <Route path='/admin/product/:id' element={<AdminProductScreen />} exact />
            <Route path='/admin/orders' element={<OrderScreen />} exact />
            <Route path='/admin/order/:id' element={<OrderDetailScreen />} exact />
          </Route>
          <Route path='/checkout' element={<CheckOutScreen />} exact />
          <Route path='/products' element={<StoreScreen />} exact />
          <Route path='/aboutus' element={<AboutUs />} exact />
          <Route path='/terms' element={<TermsScreen />} exact />
          <Route path='/search/:keyword' element={<StoreScreen />} exact />
          <Route path='/product/:id' element={<ProductScreen />} exact />
          <Route path='/user/reset/:id/:token' element={<HomeScreen />} exact />
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </NavBar>
      <Notification />
    </React.Fragment >
  )
}

export default App;