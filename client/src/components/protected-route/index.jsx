import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { validateJWT } from '../../actions/authentication';
import { getJWT } from '../../utils/token';
import { showErrorMessage } from '../../utils/toast';
import Preloader from '../Preloader';

// If user is not authenticated, prevent them from accessing the route
function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getJWT();
    validateJWT(token)
      .then(() => {
        setAuthenticated(true);
      })
      .catch((e) => {
        showErrorMessage(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}

export default ProtectedRoute;
