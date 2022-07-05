import React from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children , isLogin}) {
  
  
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
