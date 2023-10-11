import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoutesProtected = ({ children }) => {
  const isAuthenticated = useSelector((state) => state?.auth?.authUser); // Accede al estado de autenticación desde Redux.

  return isAuthenticated ? children : <Navigate to="/" />; // Redirige a la página de inicio de sesión si no está autenticado.
};

export default RoutesProtected;
