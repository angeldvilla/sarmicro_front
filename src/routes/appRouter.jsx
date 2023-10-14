import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import RoutesProtected from "./routesProtected.jsx";
import Home from "../views/Home/Home.jsx";
import Login from "../views/Login/Login.jsx";
import Register from "../views/Register/Register.jsx";
import TableValues from "../components/TableValues/TableValues.jsx";
import TablePayment from "../components/TablePayment/TablePayment.jsx";
import TableVehicles from "../components/TableVehicles/TableVehicles.jsx";
import TableCash from "../components/TableCash/TableCash.jsx";
import Cuotas from "../views/Cuotas/Cuotas.jsx";

const RoutesApp = () => {
  //verificamos si el usuario ya esta logueado
  const userAuth = useSelector((state) => state?.auth?.authUser.access_token);

  return (
    <Routes>
      {/* Ruta de inicio de sesión, muestra el componente Login */}
      <Route index element={userAuth ? <Navigate to="/inicio" /> : <Login />} />

      {/* Ruta para registrarse, muestra el componente Register */}
      <Route
        path="/registrarse"
        element={userAuth ? <Navigate to="/inicio" /> : <Register />}
      />

      {/* RUTAS PROTEGIDAS */}
      {/* Las siguientes rutas están protegidas y requieren autenticación.
         Para ello, utilizan el componente RoutesProtected que controla si el usuario está autenticado. Si lo está, muestra el componente correspondiente; de lo contrario, redirige al usuario a la página de inicio de sesión. */}
      <Route
        path="/inicio"
        element={
          <RoutesProtected>
            <Home />
          </RoutesProtected>
        }
      />
      <Route
        path="/valor-poliza"
        element={
          <RoutesProtected>
            <TableValues />
          </RoutesProtected>
        }
      />
      <Route
        path="/pago-polizas"
        element={
          <RoutesProtected>
            <TablePayment />
          </RoutesProtected>
        }
      />
      <Route
        path="/cuotas"
        element={
          <RoutesProtected>
            <Cuotas />
          </RoutesProtected>
        }
      />
      <Route
        path="/vehiculos"
        element={
          <RoutesProtected>
            <TableVehicles />
          </RoutesProtected>
        }
      />
      <Route
        path="/caja"
        element={
          <RoutesProtected>
            <TableCash />
          </RoutesProtected>
        }
      />

      {/* RUTAS PROTEGIDAS */}
    </Routes>
  );
};

export default RoutesApp;
