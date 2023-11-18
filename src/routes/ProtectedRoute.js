import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../utils/AuthContext'

const ProtectedRoutes = () => {
  let {auth} = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoutes;
