import React from "react";
import { Routes, Route } from "react-router";

/* VIEWS */
import Login from "../views/Login/Login.jsx";
import Register from "../views/Register/Register.jsx";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registrarse" element={<Register />} />     
      
    </Routes>
  );
}

export default RoutesApp;
