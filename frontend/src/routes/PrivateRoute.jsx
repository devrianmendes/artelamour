import React from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../Contexts/GlobalContext';
import Dashboard from '../Components/Pages/Dashboard/Dashboard';

const PrivateRoute = () => {
  const { isAuthenticated } = React.useContext(GlobalContext);

  return isAuthenticated ? <Dashboard /> : <Navigate to="/" />
}

export default PrivateRoute;