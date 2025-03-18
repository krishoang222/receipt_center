// Source: https://www.robinwieruch.de/react-router-private-routes/
// Source: https://github.com/bradtraversy/mern-auth/blob/master/frontend/src/main.jsx

import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/authContext';

export function PrivateRoute() {
  const { accessToken } = useAuth();
  console.log('render: PrivateRoute()');
  // (?) idk if it's useful to use state instead
  return accessToken ? <Outlet /> : <Navigate to="/signin" replace />;
}
