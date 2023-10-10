import React from "react";
import { Routes, Route } from "react-router";

/* VIEWS */
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
      <Route path="/inicio" element={<Home />} />
      <Route path="valor-poliza" element={<TableValues />} />
      <Route path="pago-polizas" element={<TablePayment />} />
      <Route path="vehiculos" element={<TableVehicles />} />
      <Route path="caja" element={<TableCash />} />
      {/* RUTAS PROTEGIDAS */}
    </Routes>
  );
};

export default RoutesApp;
