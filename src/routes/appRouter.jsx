import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import RoutesProtected from "./routesProtected.jsx";
import Home from "../views/Home/Home.jsx";
import Login from "../views/Login/Login.jsx";
import Register from "../views/Register/Register.jsx";
import Values from "../views/Values/Values.jsx";
import Payments from "../views/Payments/Payments.jsx";
import Cuotas from "../views/Cuotas/Cuotas.jsx";
import CashBox from "../views/CashBox/CashBox.jsx";
import Vehicles from "../views/Vehicles/Vehicles.jsx";
import DetailPolicy from "../views/DetailPolicy/DetailPolicy.jsx";

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
            <Values />
          </RoutesProtected>
        }
      />
      <Route
        path="/pago-polizas"
        element={
          <RoutesProtected>
            <Payments />
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
            <Vehicles />
          </RoutesProtected>
        }
      />
      <Route
        path="/caja"
        element={
          <RoutesProtected>
            <CashBox />
          </RoutesProtected>
        }
      />
      <Route
        path="/detalle-polizas"
        element={
          <RoutesProtected>
            <DetailPolicy />
          </RoutesProtected>
        }
      />

      {/* RUTAS PROTEGIDAS */}
    </Routes>
  );
};

export default RoutesApp;
