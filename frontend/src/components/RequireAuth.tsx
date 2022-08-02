import React from "react";
import { Navigate } from "react-router-dom";

//향후 로그인 children 타입 확인 필요

type RequireAuthProps = {
  children: JSX.Element;
  isLogin: boolean;
};

function RequireAuth({ children, isLogin }: RequireAuthProps) {
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
