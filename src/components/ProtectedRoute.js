// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roleRequired }) => {
  const authToken = localStorage.getItem('token');
  
  console.log(authToken)
  const role = localStorage.getItem('role');
  // useSelector((state) => state.user);

  if (!!!authToken) {
    return <Navigate to="/home" />;
  }

  if (roleRequired && !roleRequired?.includes(role)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
