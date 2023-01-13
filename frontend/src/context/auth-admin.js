import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoutes = () => {
  let auth = useSelector((state) => state.userLogin);

  return (
    (!auth.userInfo?.isAdmin || auth.userInfo === null)? <Navigate to='/error'/> : <Outlet/>
  );
}

export default UserRoutes;