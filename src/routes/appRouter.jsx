import React from "react";
import { Routes, Route } from "react-router";

/* VIEWS */
import Home from "../views/Home/Home.jsx";
import Login from "../views/Login/Login.jsx";
import Register from "../views/Register/Register.jsx";
import TablePayment from "../components/TablePayment/TablePayment.jsx";

const RoutesApp = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/registrarse" element={<Register />} />

      {/* RUTAS PROTEGIDAS */}
        <Route path="/inicio" element={<Home />} />
        <Route path="valor-poliza" element={<TablePayment />} />
         <Route path="pago-polizas" element={<TablePayment />} />
        <Route path="vehiculos" element={<TablePayment />} />
         {/* RUTAS PROTEGIDAS */}
    </Routes>
  );
};

export default RoutesApp;
