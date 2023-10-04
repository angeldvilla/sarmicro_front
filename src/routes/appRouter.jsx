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
        <Route path="/inicio/*" element={<Home />} />
       {/* <Route path="valor-poliza" element={<Policy />} />
         <Route path="pago-polizas" element={<Payments />} />
        <Route path="vehiculos" element={<Vehicles />} /> */}
      </Route>


    </Routes>
  );
};

export default RoutesApp;
