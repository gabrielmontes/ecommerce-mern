import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoutes = () => {
  let auth = useSelector((state) => state.userLogin);

  return (
    (auth?.userInfo === null)?  <Navigate to='/error'/> : <Outlet/>
  );
}

export default AdminRoutes;