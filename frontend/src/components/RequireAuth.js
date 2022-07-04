import React from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  
  console.log(localStorage.acessToken);
  if (localStorage.acessToken==null) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
