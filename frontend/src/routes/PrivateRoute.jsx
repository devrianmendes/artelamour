import React from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../Contexts/GlobalContext';

export function PrivateRoute({ children }) {
  const { isAuthenticated } = React.useContext(GlobalContext);

  return isAuthenticated ? children : <Navigate to="/" />;
}
