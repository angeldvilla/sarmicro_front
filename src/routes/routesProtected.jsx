import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoutesProtected = ({ children }) => {
  const isAuthenticated = useSelector((state) => state?.auth?.authUser); // Accede al estado de autenticación desde Redux.

  if (isAuthenticated && isAuthenticated.access_token) {
    // verifica si el usuario esta autenticado
    return children;
  } else {
    return <Navigate to="/" />; // Redirige a la página de inicio de sesión si no está autenticado.
  }
};

export default RoutesProtected;
