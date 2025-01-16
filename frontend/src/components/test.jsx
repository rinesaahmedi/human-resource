import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const isUserAuthenticated = isAuthenticated || localStorage.getItem("token");

  // Redirect unauthenticated users
  if (!isUserAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Render children or nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
