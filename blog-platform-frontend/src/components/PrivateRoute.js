import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuth = !!localStorage.getItem("access"); // check if token exists
  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
