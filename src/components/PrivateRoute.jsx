import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector(state => state.auth);

  return userInfo ? <Outlet /> : <Navigate to='/Register' replace />;
};

export default PrivateRoute;
