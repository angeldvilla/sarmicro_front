import React from "react";
import { Routes, Route } from "react-router";

/* VIEWS */
import Home from "../views/Home/Home.jsx";
import Login from "../views/Login/Login.jsx";
import Register from "../views/Register/Register.jsx";

const RoutesApp = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/registrarse" element={<Register />} />

      {/* RUTAS PROTEGIDAS */}
      <Route>
        <Route path="/home/*" element={<Home />} />
       {/*  <Route path="pago_polizas" element={<Payments />} />
        <Route path="valor_poliza" element={<Policy />} />
        <Route path="vehiculos" element={<Vehicles />} /> */}
      </Route>


    </Routes>
  );
};

export default RoutesApp;
