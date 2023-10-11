import React from "react";
import { Routes, Route } from "react-router-dom";
import RoutesProtected from "./routesProtected.jsx";
import Home from "../views/Home/Home.jsx";
import Login from "../views/Login/Login.jsx";
import Register from "../views/Register/Register.jsx";
import TableValues from "../components/TableValues/TableValues.jsx";
import TablePayment from "../components/TablePayment/TablePayment.jsx";
import TableVehicles from "../components/TableVehicles/TableVehicles.jsx";
import TableCash from "../components/TableCash/TableCash.jsx";

const RoutesApp = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/registrarse" element={<Register />} />

      {/* RUTAS PROTEGIDAS */}
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
